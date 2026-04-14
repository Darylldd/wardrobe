"use client";

import Image from "next/image";
import { X, Plus } from "lucide-react";
import clsx from "clsx";
import { CLOTHING_CATEGORIES } from "@/constants/categories";

const SLOTS = [
  { key: "UPPER",       label: "Upper body",   hint: "Shirts, jackets, hoodies"    },
  { key: "LOWER",       label: "Lower body",   hint: "Pants, jeans, shorts"        },
  { key: "FOOTWEAR",    label: "Footwear",     hint: "Sneakers, boots, sandals"    },
  { key: "ACCESSORIES", label: "Accessories",  hint: "Optional — hat, bag, watch"  },
];

export default function OutfitCanvas({ slots, onSlotClick, onSlotClear }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="label text-olive text-[10px] mb-3">Outfit preview</p>

      {SLOTS.map(({ key, label, hint }) => {
        const item = slots[key] || null;
        return (
          <div key={key} className="flex gap-3 items-stretch min-h-[80px]">
            {/* Label column */}
            <div className="w-24 md:w-28 flex-shrink-0 flex flex-col justify-center gap-0.5 py-1">
              <p className="label text-paper-700 text-[10px]">{label}</p>
              <p className="text-paper-400 text-[10px] font-light leading-tight hidden sm:block">{hint}</p>
            </div>

            {/* Slot */}
            {item ? (
              <div className="flex-1 flex items-center gap-3 bg-white border border-paper-300
                              rounded-sm p-3 group shadow-paper relative">
                {/* Polaroid thumbnail */}
                <div className="polaroid p-1 pb-4 shadow-paper flex-shrink-0 w-14 rotate-[-1deg]">
                  <div className="relative w-12 h-14 bg-paper-200 overflow-hidden">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="48px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl text-paper-300">
                        {CLOTHING_CATEGORIES[key]?.icon}
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <p className="text-paper-900 text-sm font-light truncate">{item.name}</p>
                  <p className="label text-paper-400 text-[10px]">
                    {item.subCategory || item.category}
                    {item.color ? ` — ${item.color}` : ""}
                  </p>
                  {item.occasion && (
                    <span className="font-hand text-xs text-denim">{item.occasion}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => onSlotClick(key)}
                    className="label text-paper-400 hover:text-denim transition-colors
                               text-[10px] px-2 py-1 border border-transparent hover:border-paper-200"
                  >
                    Swap
                  </button>
                  <button
                    onClick={() => onSlotClear(key)}
                    className="w-6 h-6 flex items-center justify-center text-paper-400
                               hover:text-rose transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => onSlotClick(key)}
                className="flex-1 border border-dashed border-paper-300 bg-white/50
                           hover:bg-white hover:border-paper-400 transition-all duration-150
                           flex items-center justify-center gap-2 rounded-sm group"
              >
                <Plus size={12} className="text-paper-400 group-hover:text-denim transition-colors" />
                <span className="label text-paper-400 group-hover:text-paper-700 text-[10px] transition-colors">
                  Add {label.toLowerCase()}
                </span>
              </button>
            )}
          </div>
        );
      })}

      {/* Progress tape */}
      <div className="mt-4 flex flex-col gap-1.5">
        <div className="flex justify-between">
          <span className="label text-paper-400 text-[10px]">Completeness</span>
          <span className="font-hand text-sm text-paper-600">
            {Object.values(slots).filter(Boolean).length} / {SLOTS.length}
          </span>
        </div>
        <div className="h-1.5 bg-paper-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-denim rounded-full transition-all duration-500"
            style={{ width: `${(Object.values(slots).filter(Boolean).length / SLOTS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}