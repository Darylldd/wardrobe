"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { useWardrobe } from "@/context/WardrobeContext";
import { CLOTHING_CATEGORIES } from "@/constants/categories";
import clsx from "clsx";

const CATEGORY_KEYS = ["ALL", ...Object.keys(CLOTHING_CATEGORIES)];

export default function LayerPanel({ activeSlot, onSelect, onClose }) {
  const { items } = useWardrobe();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState(activeSlot || "ALL");

  const filtered = items.filter((item) => {
    const matchesCat  = filterCat === "ALL" || item.category === filterCat;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                        (item.subCategory || "").toLowerCase().includes(search.toLowerCase()) ||
                        (item.color || "").toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchSearch;
  });

  return (
    <div className="flex flex-col h-full border-l border-ink-800 bg-ink-900">
      {/* Header */}
      <div className="ruled-b px-5 py-4 flex items-center justify-between flex-shrink-0">
        <div>
          <h3 className="display text-xl text-cream">Select Item</h3>
          {activeSlot && (
            <p className="label-xs text-gold mt-0.5">
              {CLOTHING_CATEGORIES[activeSlot]?.icon} {CLOTHING_CATEGORIES[activeSlot]?.label || activeSlot}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-ink-600 hover:text-cream transition-colors p-1"
        >
          <X size={15} />
        </button>
      </div>

      {/* Search */}
      <div className="px-5 py-3 ruled-b flex-shrink-0">
        <div className="flex items-center gap-3 border-b border-ink-700 focus-within:border-gold transition-colors">
          <Search size={13} className="text-ink-500 flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search wardrobe..."
            className="w-full bg-transparent text-cream text-sm font-light py-2.5
                       outline-none placeholder-ink-600"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-ink-600 hover:text-cream">
              <X size={11} />
            </button>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-0 border-b border-ink-800 overflow-x-auto flex-shrink-0">
        {CATEGORY_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => setFilterCat(key)}
            className={clsx(
              "px-4 py-2.5 label-xs whitespace-nowrap border-r border-ink-800 last:border-r-0 transition-all duration-150",
              filterCat === key
                ? "text-gold bg-gold/5"
                : "text-ink-600 hover:text-ink-300"
            )}
          >
            {key === "ALL" ? "All" : CLOTHING_CATEGORIES[key]?.icon + " " + CLOTHING_CATEGORIES[key]?.label}
          </button>
        ))}
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-3">
            <span className="text-3xl opacity-20">👗</span>
            <p className="label-xs text-ink-600">
              {items.length === 0 ? "No items in wardrobe" : "No results found"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-ink-800">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-ink-800
                           transition-colors duration-150 text-left group"
              >
                {/* Thumbnail */}
                <div className="relative w-12 h-14 flex-shrink-0 bg-ink-700 overflow-hidden">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="48px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xl">
                        {CLOTHING_CATEGORIES[item.category]?.icon || "👕"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <p className="text-cream text-sm font-light truncate">{item.name}</p>
                  <p className="label-xs text-ink-500">
                    {item.subCategory || item.category}
                    {item.color ? ` · ${item.color}` : ""}
                  </p>
                  {item.occasion && (
                    <span className="label-xs text-gold">{item.occasion}</span>
                  )}
                </div>

                {/* Color dot */}
                {item.colorHex && (
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-ink-600 flex-shrink-0"
                    style={{ background: item.colorHex }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}