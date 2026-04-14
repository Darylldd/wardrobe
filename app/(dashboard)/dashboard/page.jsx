"use client";

import Link from "next/link";
import { useWardrobe } from "@/context/WardrobeContext";
import { useAuth } from "@/context/AuthContext";
import { useOutfit } from "@/hooks/useOutfit";
import { useEffect } from "react";
import { Plus, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { items, loading }   = useWardrobe();
  const { profile }          = useAuth();
  const { savedOutfits, fetchOutfits, loadingOutfits } = useOutfit();

  useEffect(() => { fetchOutfits(); }, [fetchOutfits]);

  const firstName = profile?.displayName?.split(" ")[0] || "there";

  return (
    <div className="flex flex-col gap-8 anim-fade-up pb-20 md:pb-0">

      {/* Greeting */}
      <div className="border-b border-paper-300 pb-6">
        <p className="font-hand text-xl text-paper-500 mb-1">Hey, {firstName}</p>
        <h1 className="font-typewriter text-4xl md:text-5xl text-paper-900 leading-tight">
          What are you<br />wearing today?
        </h1>
      </div>

      {/* Stats — index cards */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {[
          { label: "Pieces",       value: loading        ? "—" : items.length,        note: "in wardrobe"   },
          { label: "Saved looks",  value: loadingOutfits ? "—" : savedOutfits.length, note: "outfits built" },
          { label: "AI Stylist",   value: "On",                                        note: "ready to help" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-paper-300 rounded-sm p-4 md:p-5 shadow-paper
                       relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-denim/20" />
            <p className="font-typewriter text-2xl md:text-3xl text-paper-900">{stat.value}</p>
            <p className="label text-paper-500 text-[10px] mt-1">{stat.label}</p>
            <p className="text-paper-400 text-xs font-light mt-0.5 hidden sm:block">{stat.note}</p>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {!loading && items.length === 0 && (
        <div className="border border-dashed border-paper-300 rounded-sm p-10 md:p-16 flex flex-col items-center gap-5 text-center bg-white/50">
          <p className="font-typewriter text-5xl text-paper-300">Empty.</p>
          <div>
            <p className="text-paper-700 text-sm font-light">Your wardrobe hasn't been set up yet.</p>
            <p className="text-paper-400 text-xs font-light mt-1">
              Upload your first piece to get outfit suggestions.
            </p>
          </div>
          <Link
            href="/wardrobe"
            className="label text-white bg-paper-900 hover:bg-paper-800 transition-colors
                       px-6 py-3 rounded-sm text-xs mt-2 inline-flex items-center gap-2"
          >
            <Plus size={11} /> Add first piece
          </Link>
        </div>
      )}

      {/* Content grid */}
      {!loading && items.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Recent pieces */}
          <div className="bg-white border border-paper-300 rounded-sm shadow-paper overflow-hidden">
            <div className="border-b border-paper-200 px-5 py-3.5 flex items-center justify-between">
              <p className="font-typewriter text-base text-paper-900">Recent pieces</p>
              <Link href="/wardrobe" className="label text-paper-400 hover:text-denim text-[10px] transition-colors flex items-center gap-1">
                See all <ArrowRight size={9} />
              </Link>
            </div>
            <div className="p-5 cork-bg">
              <div className="grid grid-cols-4 gap-3">
                {items.slice(0, 4).map((item, i) => (
                  <div
                    key={item.id}
                    className={`polaroid shadow-polaroid ${i % 2 === 0 ? "-rotate-1" : "rotate-1"}`}
                  >
                    <div className="aspect-[3/4] bg-paper-200 overflow-hidden">
                      {item.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <p className="font-hand text-[10px] text-paper-700 mt-1 truncate">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white border border-paper-300 rounded-sm shadow-paper overflow-hidden">
            <div className="border-b border-paper-200 px-5 py-3.5">
              <p className="font-typewriter text-base text-paper-900">Quick actions</p>
            </div>
            <div className="divide-y divide-paper-100">
              {[
                { href: "/wardrobe",       label: "Manage wardrobe",  sub: `${items.length} pieces`              },
                { href: "/outfit-builder", label: "Build an outfit",  sub: `${savedOutfits.length} saved`        },
                { href: "/ai-stylist",     label: "Ask AI stylist",   sub: "Describe where you're going"         },
              ].map(({ href, label, sub }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between px-5 py-4 hover:bg-paper-50 transition-colors group"
                >
                  <div>
                    <p className="text-paper-800 text-sm">{label}</p>
                    <p className="label text-paper-400 text-[10px] mt-0.5">{sub}</p>
                  </div>
                  <ArrowRight size={14} className="text-paper-300 group-hover:text-denim transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Saved outfits preview */}
          {savedOutfits.length > 0 && (
            <div className="bg-white border border-paper-300 rounded-sm shadow-paper overflow-hidden lg:col-span-2">
              <div className="border-b border-paper-200 px-5 py-3.5 flex items-center justify-between">
                <p className="font-typewriter text-base text-paper-900">Saved looks</p>
                <Link href="/outfit-builder" className="label text-paper-400 hover:text-denim text-[10px] transition-colors flex items-center gap-1">
                  See all <ArrowRight size={9} />
                </Link>
              </div>
              <div className="p-5 grid grid-cols-3 sm:grid-cols-6 gap-4">
                {savedOutfits.slice(0, 6).map((outfit, i) => {
                  const img = Object.values(outfit.slots || {}).find((it) => it?.imageUrl);
                  return (
                    <div key={outfit.id} className={`polaroid shadow-paper ${i % 2 === 0 ? "-rotate-1" : "rotate-1"}`}>
                      <div className="aspect-square bg-paper-200 overflow-hidden">
                        {img ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={img.imageUrl} alt={outfit.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-paper-100 flex items-center justify-center">
                            <span className="text-paper-300 text-xl">—</span>
                          </div>
                        )}
                      </div>
                      <p className="font-hand text-[10px] text-paper-700 mt-1 truncate">{outfit.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}