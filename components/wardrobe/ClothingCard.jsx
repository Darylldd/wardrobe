"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Pencil } from "lucide-react";
import { useWardrobe } from "@/context/WardrobeContext";
import toast from "react-hot-toast";
import clsx from "clsx";
import { CLOTHING_CATEGORIES } from "@/constants/categories";

// Give each card a deterministic slight rotation based on its id
const getRotation = (id = "") => {
  const n = id.charCodeAt(0) % 5;
  return ["-rotate-2", "-rotate-1", "rotate-0", "rotate-1", "rotate-2"][n];
};

export default function ClothingCard({ item, onEdit }) {
  const { removeItem } = useWardrobe();
  const [deleting, setDeleting] = useState(false);
  const [hovered, setHovered]   = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Remove "${item.name}"?`)) return;
    setDeleting(true);
    try {
      await removeItem(item.id, item.publicId);
      toast.success("Item removed.");
    } catch {
      toast.error("Failed to remove.");
      setDeleting(false);
    }
  };

  const rot = getRotation(item.id);

  return (
    <div
      className={clsx(
        "relative group cursor-default transition-all duration-200",
        hovered && "z-10",
        deleting && "opacity-40 pointer-events-none"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Pin */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-rose shadow-pin z-10" />

      {/* Polaroid */}
      <div className={clsx(
        "polaroid shadow-polaroid transition-all duration-200",
        rot,
        hovered && "shadow-polaroid-hover scale-105 rotate-0"
      )}>
        {/* Photo area */}
        <div className="relative w-full aspect-[3/4] bg-paper-200 overflow-hidden mb-1">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, 200px"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <span className="text-4xl text-paper-300">
                {CLOTHING_CATEGORIES[item.category]?.icon || "?"}
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className={clsx(
            "absolute inset-0 bg-paper-900/50 flex items-center justify-center gap-3 transition-opacity duration-150",
            hovered ? "opacity-100" : "opacity-0"
          )}>
            <button
              onClick={() => onEdit?.(item)}
              className="w-9 h-9 bg-white rounded-sm flex items-center justify-center
                         text-paper-700 hover:text-denim transition-colors shadow-paper"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={handleDelete}
              className="w-9 h-9 bg-white rounded-sm flex items-center justify-center
                         text-paper-700 hover:text-rose transition-colors shadow-paper"
            >
              <Trash2 size={13} />
            </button>
          </div>

          {/* Color dot */}
          {item.colorHex && (
            <div
              className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full border-2 border-white shadow-pin"
              style={{ background: item.colorHex }}
            />
          )}
        </div>

        {/* Polaroid label area */}
        <div className="pt-1 px-0.5">
          <p className="font-hand text-sm text-paper-800 leading-tight truncate">{item.name}</p>
          <p className="label text-paper-400 text-[10px] mt-0.5 truncate">
            {item.subCategory || item.category}
            {item.occasion ? ` — ${item.occasion}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}