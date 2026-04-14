"use client";

import { useState, useRef } from "react";
import { useWardrobe } from "@/context/WardrobeContext";
import { fetchOutfitSuggestions } from "@/lib/ai/client";
import SuggestionCard from "@/components/outfit/SuggestionCard";
import Button from "@/components/ui/Button";
import { OCCASIONS } from "@/constants/categories";
import { Sparkles, Send, RotateCcw, ArrowRight } from "lucide-react";
import clsx from "clsx";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const PROMPT_CHIPS = [
  "What should I wear tomorrow?",
  "Give me a smart casual outfit",
  "I have a job interview",
  "Date night outfit ideas",
  "Something comfortable for the weekend",
  "I'm going to the beach",
  "A look for a wedding guest",
  "Gym to brunch outfit",
];

const COUNT_OPTIONS = [1, 2, 3];

export default function AIStylistPage() {
  const { items, loading: wardrobeLoading } = useWardrobe();
  const router = useRouter();

  const [prompt, setPrompt]           = useState("");
  const [occasion, setOccasion]       = useState("");
  const [count, setCount]             = useState(3);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);
  const [hasGenerated, setHasGenerated] = useState(false);
  const textareaRef = useRef(null);

  const handleChip = (chip) => {
    setPrompt(chip);
    textareaRef.current?.focus();
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return toast.error("Tell me what you need.");
    if (items.length === 0) return toast.error("Add some clothes to your wardrobe first.");

    setLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const result = await fetchOutfitSuggestions({ prompt, occasion, count });
      setSuggestions(result);
      setHasGenerated(true);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadIntoBuilder = (suggestion) => {
    // Store in sessionStorage so builder page can pick it up
    sessionStorage.setItem("loadedSuggestion", JSON.stringify(suggestion));
    toast.success("Loading into Outfit Builder…");
    router.push("/outfit-builder");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleReset = () => {
    setSuggestions([]);
    setHasGenerated(false);
    setError(null);
    setPrompt("");
    setOccasion("");
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-up max-w-4xl">

      {/* Page header */}
      <div className="flex items-end justify-between ruled-b pb-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="gold-line" />
            <span className="label-xs text-gold">AI Stylist</span>
          </div>
          <h1 className="display text-5xl text-cream">Ask the Stylist</h1>
          <p className="text-ink-400 text-sm font-light">
            Describe what you need — the AI builds outfits from your actual wardrobe
          </p>
        </div>
        {hasGenerated && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 label-xs text-ink-500 hover:text-cream
                       transition-colors mb-1"
          >
            <RotateCcw size={11} />
            New Request
          </button>
        )}
      </div>

      {/* Empty wardrobe warning */}
      {!wardrobeLoading && items.length === 0 && (
        <div className="border border-gold/20 bg-gold/5 px-5 py-4 flex items-center justify-between">
          <p className="text-ink-300 text-sm font-light">
            Your wardrobe is empty — the AI needs your clothes to style you.
          </p>
          <Link
            href="/wardrobe"
            className="label-xs text-gold hover:text-gold-light transition-colors flex items-center gap-1.5"
          >
            Add clothes <ArrowRight size={11} />
          </Link>
        </div>
      )}

      {/* Input panel */}
      {!hasGenerated && (
        <div className="flex flex-col gap-6 border border-ink-800 bg-ink-900 p-6">

          {/* Prompt chips */}
          <div className="flex flex-col gap-3">
            <span className="label-xs text-ink-500">Quick prompts</span>
            <div className="flex flex-wrap gap-2">
              {PROMPT_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChip(chip)}
                  className={clsx(
                    "text-xs font-light px-3 py-2 border transition-all duration-150",
                    prompt === chip
                      ? "border-gold text-gold bg-gold/10"
                      : "border-ink-700 text-ink-400 hover:border-ink-500 hover:text-cream"
                  )}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 ruled" />
            <span className="label-xs text-ink-700">or write your own</span>
            <div className="flex-1 ruled" />
          </div>

          {/* Textarea */}
          <div className="flex flex-col gap-2">
            <span className="label-xs text-ink-400">What do you need?</span>
            <div className="relative border-b border-ink-600 focus-within:border-gold transition-colors">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. I have a casual dinner tonight, something relaxed but put-together..."
                rows={3}
                className="w-full bg-transparent text-cream text-sm font-light py-3
                           outline-none resize-none placeholder-ink-600 leading-relaxed"
              />
              <span className="absolute bottom-3 right-0 label-xs text-ink-700">
                ↵ to generate
              </span>
            </div>
          </div>

          {/* Options row */}
          <div className="flex items-start gap-8 flex-wrap">

            {/* Occasion filter */}
            <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
              <span className="label-xs text-ink-400">Filter by occasion (optional)</span>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.slice(0, 6).map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setOccasion(occasion === occ ? "" : occ)}
                    className={clsx(
                      "label-xs px-3 py-1.5 border transition-all duration-150",
                      occasion === occ
                        ? "border-gold text-gold bg-gold/10"
                        : "border-ink-800 text-ink-500 hover:border-ink-600 hover:text-cream"
                    )}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Count selector */}
            <div className="flex flex-col gap-2">
              <span className="label-xs text-ink-400">Suggestions</span>
              <div className="flex border border-ink-800">
                {COUNT_OPTIONS.map((n) => (
                  <button
                    key={n}
                    onClick={() => setCount(n)}
                    className={clsx(
                      "w-10 h-9 label-xs border-r border-ink-800 last:border-r-0 transition-all duration-150",
                      count === n
                        ? "bg-cream text-ink-950"
                        : "text-ink-500 hover:text-cream"
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="ruled pt-4 flex items-center justify-between">
            <span className="label-xs text-ink-600">
              {items.length} wardrobe items available
            </span>
            <Button
              size="md"
              loading={loading}
              disabled={!prompt.trim() || items.length === 0 || wardrobeLoading}
              onClick={handleSubmit}
              className="flex items-center gap-2"
            >
              <Sparkles size={12} />
              Generate Outfits
            </Button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center gap-6 py-20">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border border-ink-800 rounded-full animate-ping opacity-20" />
            <div className="absolute inset-2 border border-gold/30 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={18} className="text-gold" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-cream text-sm font-light">Styling your wardrobe…</p>
            <p className="label-xs text-ink-500">
              Analysing {items.length} items to find the perfect combinations
            </p>
          </div>
          {/* Animated dots */}
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="border border-red-900/40 bg-red-950/20 px-5 py-4 flex items-center justify-between">
          <p className="text-red-400 text-sm font-light">{error}</p>
          <button
            onClick={handleSubmit}
            className="label-xs text-red-400 hover:text-red-300 transition-colors"
          >
            Retry →
          </button>
        </div>
      )}

      {/* Results */}
      {!loading && suggestions.length > 0 && (
        <div className="flex flex-col gap-6">

          {/* Results header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="gold-line" />
              <span className="label-xs text-ink-400">
                {suggestions.length} outfit{suggestions.length !== 1 ? "s" : ""} for{" "}
                <span className="text-cream">"{prompt}"</span>
              </span>
            </div>
            <button
              onClick={handleReset}
              className="label-xs text-ink-600 hover:text-gold transition-colors flex items-center gap-1.5"
            >
              <RotateCcw size={10} />
              Ask again
            </button>
          </div>

          {/* Suggestion cards */}
          <div className="flex flex-col gap-4">
            {suggestions.map((suggestion, i) => (
              <SuggestionCard
                key={i}
                suggestion={suggestion}
                index={i}
                onLoadIntoBuilder={handleLoadIntoBuilder}
              />
            ))}
          </div>

          {/* Footer CTA */}
          <div className="border border-ink-800 px-6 py-5 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-cream text-sm font-light">Like one of these looks?</p>
              <p className="label-xs text-ink-500">Load it into the Outfit Builder to save it.</p>
            </div>
            <button
              onClick={() => router.push("/outfit-builder")}
              className="label-xs text-gold hover:text-gold-light transition-colors flex items-center gap-2"
            >
              Go to Builder <ArrowRight size={11} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}