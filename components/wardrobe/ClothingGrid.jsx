"use client";

import { useState } from "react";
import ClothingCard from "./ClothingCard";
import EditItemModal from "./EditItemModal";
import { CLOTHING_CATEGORIES } from "@/constants/categories";
import clsx from "clsx";

const ALL = "ALL";

export default function ClothingGrid({ items }) {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [editItem, setEditItem] = useState(null);

  const categories = [
    { key: ALL, label: "Everything" },
    ...Object.entries(CLOTHING_CATEGORIES).map(([key, val]) => ({
      key,
      label: val.label,
    })),
  ];

  const filtered =
    activeCategory === ALL
      ? items
      : items.filter((i) => i.category === activeCategory);

  if (items.length === 0) {
    return (
      <div className="border border-dashed border-paper-300 rounded-sm p-16 flex flex-col items-center gap-5 text-center bg-white/40">
        <p className="font-typewriter text-4xl text-paper-300">Empty.</p>
        <p className="text-paper-500 text-sm font-light">
          Nothing in your wardrobe yet — add your first piece above.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={clsx(
              "label px-4 py-2 rounded-sm text-xs transition-all duration-150 border",
              activeCategory === key
                ? "bg-paper-900 text-white border-paper-900"
                : "bg-white text-paper-600 border-paper-300 hover:border-paper-500 hover:text-paper-900"
            )}
          >
            {key !== ALL && CLOTHING_CATEGORIES[key]?.icon + " "}{label}
          </button>
        ))}
      </div>

      {/* Item count */}
      <div className="flex items-center gap-2">
        <span className="w-4 h-px bg-paper-400" />
        <span className="font-hand text-base text-paper-500">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </span>
      </div>

      {/* Cork board grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-paper-500 text-sm font-light">No items in this category.</p>
        </div>
      ) : (
        <div className="cork-bg rounded p-6 md:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
            {filtered.map((item) => (
              <ClothingCard key={item.id} item={item} onEdit={setEditItem} />
            ))}
          </div>
        </div>
      )}

      {editItem && (
        <EditItemModal item={editItem} onClose={() => setEditItem(null)} />
      )}
    </div>
  );
}