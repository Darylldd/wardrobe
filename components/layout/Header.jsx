"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const pageMeta = {
  "/dashboard":      { title: "Dashboard",    sub: "Overview" },
  "/wardrobe":       { title: "Wardrobe",     sub: "All Items" },
  "/outfit-builder": { title: "Builder",      sub: "Create Outfits" },
  "/ai-stylist":     { title: "AI Stylist",   sub: "Get Suggestions" },
};

export default function Header() {
  const pathname = usePathname();
  const { profile } = useAuth();
  const page = pageMeta[pathname] || { title: "Fitcheck", sub: "" };

  return (
    <header className="sticky top-0 z-30 bg-ink-950/90 backdrop-blur-sm ruled-b px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <h2 className="display text-2xl text-cream leading-none">{page.title}</h2>
        </div>
        <span className="w-px h-5 bg-ink-700" />
        <span className="label-xs text-ink-500">{page.sub}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-ink-500 text-xs font-light">
          {profile?.displayName?.split(" ")[0] || "there"}
        </span>
      </div>
    </header>
  );
}