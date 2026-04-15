"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const pageMeta = {
  "/dashboard":      { title: "Dashboard",    note: "Overview"         },
  "/wardrobe":       { title: "My Wardrobe",  note: "All items"        },
  "/outfit-builder": { title: "Outfit Builder",note: "Build a look"    },
  "/ai-stylist":     { title: "AI Stylist",   note: "Get suggestions"  },
};

export default function Header() {
  const pathname = usePathname();
  const { profile } = useAuth();
  const page = pageMeta[pathname] || { title: "FihhChehh", note: "" };

  return (
    <header className="sticky top-0 z-30 bg-paper-100/90 backdrop-blur-sm border-b border-paper-300/60 px-5 md:px-7 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h2 className="font-typewriter text-lg text-paper-900 leading-none">{page.title}</h2>
        <span className="hidden sm:block w-px h-4 bg-paper-300" />
        <span className="hidden sm:block label text-paper-400 text-[10px]">{page.note}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-hand text-base text-paper-500">
          {profile?.displayName?.split(" ")[0] || "there"}
        </span>
      </div>
    </header>
  );
}