"use client";

import { useState } from "react";
import { useWardrobe } from "@/context/WardrobeContext";
import ClothingGrid from "@/components/wardrobe/ClothingGrid";
import UploadModal from "@/components/wardrobe/UploadModal";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default function WardrobePage() {
  const { items, loading } = useWardrobe();
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 anim-fade-up pb-20 md:pb-0">

      {/* Page header */}
      <div className="flex items-start justify-between border-b border-paper-300 pb-5">
        <div>
          <p className="label text-olive text-[10px] mb-2">Your collection</p>
          <h1 className="font-typewriter text-4xl md:text-5xl text-paper-900">The Closet</h1>
          <p className="text-paper-500 text-sm font-light mt-2">
            {items.length} {items.length === 1 ? "piece" : "pieces"} hanging up
          </p>
        </div>
        <Button
          onClick={() => setUploadOpen(true)}
          className="flex items-center gap-2 mt-1 shrink-0"
          size="md"
        >
          <Plus size={13} />
          Add piece
        </Button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="cork-bg rounded p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="polaroid shadow-polaroid">
                <div className="aspect-[3/4] bg-paper-200 animate-pulse" />
                <div className="h-3 bg-paper-200 animate-pulse mt-3 w-3/4" />
                <div className="h-2 bg-paper-200 animate-pulse mt-1.5 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ClothingGrid items={items} />
      )}

      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </div>
  );
}