"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Wand2, ArrowRight } from "lucide-react";
import { CLOTHING_CATEGORIES } from "@/constants/categories";
import clsx from "clsx";

const SLOT_ORDER = ["UPPER", "LOWER", "FOOTWEAR", "ACCESSORIES"];

export default function SuggestionCard({ suggestion, index, onLoadIntoBuilder }) {
  const [expanded, setExpanded] = useState(false);

  const filledSlots = SLOT_ORDER.filter(
    (key) => suggestion.slots?.[key]
  );

  return (
    <div className="border border-ink-800 bg-ink-900 flex flex-col transition-all duration-200 hover:border-ink-600">

      {/* Card header */}
      <div className="ruled-b px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="display text-2xl text-ink-700 italic">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-0.5">
            <p className="text-cream text-sm font-light">{suggestion.name}</p>
            {suggestion.occasion && (
              <span className="label-xs text-gold">{suggestion.occasion}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onLoadIntoBuilder(suggestion)}
            className="label-xs text-ink-600 hover:text-gold transition-colors
                       flex items-center gap-1.5 border border-transparent hover:border-ink-700 px-3 py-1.5"
          >
            <ArrowRight size={11} />
            Load
          </button>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-7 h-7 flex items-center justify-center text-ink-600
                       hover:text-cream border border-transparent hover:border-ink-700 transition-all"
          >
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>
      </div>

      {/* Outfit mosaic */}
      <div className="p-4 flex gap-3">
        {SLOT_ORDER.map((slotKey) => {
          const item = suggestion.slots?.[slotKey];
          return (
            <div key={slotKey} className="flex flex-col items-center gap-1.5 flex-1">
              <div className="relative w-full aspect-[3/4] bg-ink-800 border border-ink-700 overflow-hidden">
                {item?.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-xl opacity-20">
                      {CLOTHING_CATEGORIES[slotKey]?.icon || "·"}
                    </span>
                  </div>
                )}
              </div>
              <span className="label-xs text-ink-600 text-center leading-tight">
                {item?.name
                  ? item.name.length > 12
                    ? item.name.slice(0, 10) + "…"
                    : item.name
                  : "—"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Vibe line */}
      {suggestion.vibe && (
        <div className="px-4 pb-4">
          <p className="display text-base text-ink-400 italic">"{suggestion.vibe}"</p>
        </div>
      )}

      {/* Expanded details */}
      {expanded && (
        <div className="ruled border-t border-ink-800 px-5 py-5 flex flex-col gap-5">

          {/* Color story */}
          {suggestion.colorStory && (
            <div className="flex flex-col gap-1.5">
              <span className="label-xs text-ink-500">Color Story</span>
              <p className="text-ink-300 text-sm font-light leading-relaxed">
                {suggestion.colorStory}
              </p>
            </div>
          )}

          {/* Styling tip */}
          {suggestion.stylingTip && (
            <div className="flex flex-col gap-1.5">
              <span className="label-xs text-gold flex items-center gap-1.5">
                <Wand2 size={10} /> Styling Tip
              </span>
              <p className="text-ink-300 text-sm font-light leading-relaxed">
                {suggestion.stylingTip}
              </p>
            </div>
          )}

          {/* Per-piece reasons */}
          <div className="flex flex-col gap-2">
            <span className="label-xs text-ink-500">Why It Works</span>
            {SLOT_ORDER.map((slotKey) => {
              const item = suggestion.slots?.[slotKey];
              if (!item) return null;
              return (
                <div key={slotKey} className="flex items-start gap-3 py-2 ruled-b last:border-0">
                  <div className="relative w-8 h-10 flex-shrink-0 bg-ink-800 overflow-hidden">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="32px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm">
                        {CLOTHING_CATEGORIES[slotKey]?.icon}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-cream text-xs font-light">{item.name}</p>
                    {item.aiReason && (
                      <p className="text-ink-500 text-xs font-light leading-relaxed">
                        {item.aiReason}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}