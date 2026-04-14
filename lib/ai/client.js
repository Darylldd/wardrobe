import { auth } from "@/lib/firebase/config";

export const fetchOutfitSuggestions = async ({ prompt, occasion, count = 3 }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const token = await user.getIdToken();

  const res = await fetch("/api/ai/suggest", {
    method:  "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ prompt, occasion, count }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data.suggestions;
};