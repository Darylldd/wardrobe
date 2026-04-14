import { NextResponse } from "next/server";
import { getOutfitSuggestions } from "@/lib/ai/gemini";
import { adminDb, adminAuth } from "@/lib/firebase/admin";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token   = authHeader.split("Bearer ")[1];
    const decoded = await adminAuth.verifyIdToken(token);
    const userId  = decoded.uid;

    const { prompt, occasion, count = 3 } = await request.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const snapshot = await adminDb
      .collection("wardrobe")
      .where("userId", "==", userId)
      .get();

    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (items.length === 0) {
      return NextResponse.json(
        { error: "Your wardrobe is empty. Add some clothes first." },
        { status: 400 }
      );
    }

    const suggestions = await getOutfitSuggestions({ items, prompt, occasion, count });
    return NextResponse.json({ suggestions });

  } catch (err) {
    console.error("AI suggest error:", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong." },
      { status: 500 }
    );
  }
}