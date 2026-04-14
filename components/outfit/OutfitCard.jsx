"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Calendar } from "lucide-react";
import clsx from "clsx";
import toast from "react-hot-toast";

export default function OutfitCard({ outfit, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!confirm(`Delete "${outfit.name}"?`)) return;
    setDeleting(true);
    try {
      await onDelete(outfit.id);
      toast.success("Outfit deleted.");
    } catch {
      toast.error("Failed to delete.");
      setDeleting(false);
    }
  };

  // Gather slot images for the mosaic
  const slotImages = Object.entries(outfit.slots || {})
    .filter(([, item]) => item && item.imageUrl)
    .slice(0, 4);

  const date = outfit.createdAt?.seconds
    ? new Date(outfit.createdAt.seconds * 1000).toLocaleDateString("en-US", {
        month: "short", day: "numeric",
      })
    : "";

  return (
    <div
      className={clsx(
        "border border-ink-800 bg-ink-900 flex flex-col transition-all duration-200 group",
        hovered && "border-ink-600",
        deleting && "opacity-40 pointer-events-none"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Mosaic preview */}
      <div className="relative aspect-square bg-ink-800 overflow-hidden">
        {slotImages.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl opacity-20">✦</span>
          </div>
        ) : slotImages.length === 1 ? (
          <Image
            src={slotImages[0][1].imageUrl}
            alt={slotImages[0][1].name}
            fill
            className="object-cover"
            sizes="300px"
          />
        ) : (
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-px bg-ink-700">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="relative bg-ink-800 overflow-hidden">
                {slotImages[i] ? (
                  <Image
                    src={slotImages[i][1].imageUrl}
                    alt={slotImages[i][1].name}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                ) : (
                  <div className="w-full h-full bg-ink-800" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Delete button */}
        <button
          onClick={handleDelete}
          className={clsx(
            "absolute top-3 right-3 w-8 h-8 bg-ink-950/80 border border-ink-700",
            "flex items-center justify-center text-ink-400 hover:text-red-400 hover:border-red-800",
            "transition-all duration-150",
            hovered ? "opacity-100" : "opacity-0"
          )}
        >
          <Trash2 size={12} />
        </button>

        {/* Occasion badge */}
        {outfit.occasion && (
          <div className="absolute bottom-3 left-3 bg-ink-950/80 px-2.5 py-1 border border-ink-700">
            <span className="label-xs text-gold">{outfit.occasion}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2">
        <p className="text-cream text-sm font-light truncate">{outfit.name}</p>
        <div className="flex items-center justify-between">
          <span className="label-xs text-ink-500">
            {Object.values(outfit.slots || {}).filter(Boolean).length} pieces
          </span>
          {date && (
            <div className="flex items-center gap-1 text-ink-600">
              <Calendar size={10} />
              <span className="label-xs">{date}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}