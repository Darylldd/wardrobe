const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL     = "https://api.groq.com/openai/v1/chat/completions";
const MODEL        = "llama-3.3-70b-versatile";

/**
 * Build a readable text summary of the wardrobe for the AI
 */
const buildWardrobeText = (items) => {
  if (items.length === 0) return "No items in wardrobe.";

  return items
    .slice(0, 40)
    .map((item, i) => {
      const details = [
        `ID: ${item.id}`,
        `Name: ${item.name}`,
        `Category: ${item.category}`,
        item.subCategory ? `Type: ${item.subCategory}`          : null,
        item.color       ? `Color: ${item.color}`               : null,
        item.occasion    ? `Best for: ${item.occasion}`         : null,
        item.tags?.length ? `Style tags: ${item.tags.join(", ")}` : null,
      ]
        .filter(Boolean)
        .join(", ");

      return `${i + 1}. ${details}`;
    })
    .join("\n");
};

/**
 * Main AI stylist function
 * Returns structured outfit suggestions as JSON
 */
export const getOutfitSuggestions = async ({ items, prompt, occasion, count = 3 }) => {
  if (!GROQ_API_KEY) throw new Error("Groq API key not configured.");
  if (items.length === 0) throw new Error("No wardrobe items found.");

  const wardrobeText = buildWardrobeText(items);

  const systemPrompt = `You are FihhChehh, a world-class personal fashion stylist AI.
You have been given the user's wardrobe as a structured list with item IDs, names, categories, colors, and style tags.
Your job is to create exactly ${count} complete outfit suggestion(s) ONLY using items from their wardrobe.

CRITICAL RULES:
- Only suggest items that actually exist in the wardrobe list below (use exact Item IDs)
- Each outfit must include at minimum one upper body and one lower body item
- Footwear and accessories are optional but encouraged if available
- Consider color harmony, occasion appropriateness, and style coherence
- Give each outfit a short, evocative editorial name

WARDROBE:
${wardrobeText}

Respond ONLY with valid JSON — no markdown fences, no explanation outside the JSON.
Use this exact shape:

{
  "suggestions": [
    {
      "name": "Outfit name",
      "occasion": "Best occasion",
      "vibe": "One-line editorial description",
      "stylingTip": "One specific styling tip",
      "colorStory": "Why the colors work together",
      "slots": {
        "UPPER":        { "itemId": "exact_id_from_list", "reason": "why this piece" },
        "LOWER":        { "itemId": "exact_id_from_list", "reason": "why this piece" },
        "FOOTWEAR":     { "itemId": "exact_id_from_list", "reason": "why this piece" },
        "ACCESSORIES":  { "itemId": "exact_id_from_list", "reason": "why this piece" }
      }
    }
  ]
}

If no suitable item exists for a slot, set it to null.
Always return exactly ${count} suggestion(s).`;

  const userMessage = [
    `User request: "${prompt}"`,
    occasion ? `Target occasion: ${occasion}` : "",
    `Please suggest ${count} complete outfit(s) from my wardrobe.`,
  ]
    .filter(Boolean)
    .join("\n");

  const body = {
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user",   content: userMessage  },
    ],
    temperature:      0.7,
    max_tokens:       2048,
    response_format:  { type: "json_object" },
  };

  const res = await fetch(GROQ_URL, {
    method:  "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      err?.error?.message || `Groq API error: ${res.status}`
    );
  }

  const data = await res.json();
  const raw  = data?.choices?.[0]?.message?.content || "";

  // Strip any accidental markdown fences just in case
  const clean = raw.replace(/```json|```/gi, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(clean);
  } catch {
    throw new Error("AI returned an unexpected response. Please try again.");
  }

  if (!parsed.suggestions?.length) {
    throw new Error("AI returned no suggestions. Try rephrasing your prompt.");
  }

  // Hydrate each slot with full item data from wardrobe
  const itemMap = Object.fromEntries(items.map((i) => [i.id, i]));

  const hydrated = parsed.suggestions.map((suggestion) => ({
    ...suggestion,
    slots: Object.fromEntries(
      Object.entries(suggestion.slots || {}).map(([slotKey, slotVal]) => {
        if (!slotVal) return [slotKey, null];
        const fullItem = itemMap[slotVal.itemId];
        return [
          slotKey,
          fullItem ? { ...fullItem, aiReason: slotVal.reason } : null,
        ];
      })
    ),
  }));

  return hydrated;
};