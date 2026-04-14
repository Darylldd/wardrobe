"use client";

import { useState, useEffect } from "react";
import { useWardrobe } from "@/context/WardrobeContext";
import { useOutfit } from "@/hooks/useOutfit";
import OutfitCanvas from "@/components/outfit/OutfitCanvas";
import LayerPanel from "@/components/outfit/LayerPanel";
import OutfitCard from "@/components/outfit/OutfitCard";
import SaveOutfitModal from "@/components/outfit/SaveOutfitModal";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { Save, RotateCcw, BookOpen } from "lucide-react";
import clsx from "clsx";

const EMPTY_SLOTS = { UPPER: null, LOWER: null, FOOTWEAR: null, ACCESSORIES: null };

export default function OutfitBuilderPage() {
  const { items }  = useWardrobe();
  const { savedOutfits, loadingOutfits, fetchOutfits, saveOutfit, deleteOutfit } = useOutfit();

  const [slots, setSlots]           = useState(EMPTY_SLOTS);
  const [activeSlot, setActiveSlot] = useState(null);
  const [panelOpen, setPanelOpen]   = useState(false);
  const [saveOpen, setSaveOpen]     = useState(false);
  const [view, setView]             = useState("builder"); // "builder" | "saved"

  useEffect(() => { fetchOutfits(); }, [fetchOutfits]);
useEffect(() => {
  const stored = sessionStorage.getItem("loadedSuggestion");
  if (!stored) return;
  try {
    const suggestion = JSON.parse(stored);
    setSlots({
      UPPER:        suggestion.slots?.UPPER        || null,
      LOWER:        suggestion.slots?.LOWER        || null,
      FOOTWEAR:     suggestion.slots?.FOOTWEAR     || null,
      ACCESSORIES:  suggestion.slots?.ACCESSORIES  || null,
    });
    toast.success(`"${suggestion.name}" loaded — edit or save it.`);
    sessionStorage.removeItem("loadedSuggestion");
  } catch {
    sessionStorage.removeItem("loadedSuggestion");
  }
}, []);

  const handleSlotClick = (slotKey) => {
    setActiveSlot(slotKey);
    setPanelOpen(true);
  };

  const handleSlotClear = (slotKey) => {
    setSlots((prev) => ({ ...prev, [slotKey]: null }));
  };

  const handleSelectItem = (item) => {
    setSlots((prev) => ({ ...prev, [activeSlot]: item }));
    setPanelOpen(false);
    setActiveSlot(null);
  };

  const handlePanelClose = () => {
    setPanelOpen(false);
    setActiveSlot(null);
  };

  const handleReset = () => {
    if (!Object.values(slots).some(Boolean)) return;
    setSlots(EMPTY_SLOTS);
    toast.success("Outfit cleared.");
  };

 const handleSave = async (outfitData) => {
  try {
    await saveOutfit(outfitData);
    toast.success("Outfit saved.");
    setSlots(EMPTY_SLOTS);       
    setView("saved");         
  } catch {
    toast.error("Could not save outfit.");
  }
};

  const handleDelete = async (id) => {
    await deleteOutfit(id);
  };

  const filledCount  = Object.values(slots).filter(Boolean).length;
  const canSave      = filledCount >= 1;

  return (
    <div className="flex flex-col gap-0 animate-fade-up h-full">

      {/* Page header */}
      <div className="flex items-end justify-between ruled-b pb-6 mb-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="gold-line" />
            <span className="label-xs text-gold">Outfit Builder</span>
          </div>
          <h1 className="display text-5xl text-cream">Build a Look</h1>
          <p className="text-ink-400 text-sm font-light">
            Combine pieces from your wardrobe into a complete outfit
          </p>
        </div>

        {/* View toggle */}
        <div className="flex border border-ink-800 mb-1">
          {[
            { key: "builder", label: "Builder"     },
            { key: "saved",   label: `Saved (${savedOutfits.length})` },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={clsx(
                "px-5 py-2.5 label-xs border-r border-ink-800 last:border-r-0 transition-all duration-150",
                view === key
                  ? "bg-cream text-ink-950"
                  : "text-ink-500 hover:text-cream"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Builder view ── */}
      {view === "builder" && (
        <div className="flex gap-6 items-start">

          {/* Canvas column */}
          <div className={clsx(
            "transition-all duration-300",
            panelOpen ? "flex-[0_0_55%]" : "flex-1"
          )}>
            {/* Action bar */}
            <div className="flex items-center justify-between mb-6">
              <span className="label-xs text-ink-500">
                {filledCount === 0
                  ? "Click a slot to add pieces"
                  : `${filledCount} piece${filledCount !== 1 ? "s" : ""} added`}
              </span>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  disabled={filledCount === 0}
                  className="flex items-center gap-1.5"
                >
                  <RotateCcw size={11} />
                  Clear
                </Button>
                <Button
                  size="sm"
                  disabled={!canSave}
                  onClick={() => setSaveOpen(true)}
                  className="flex items-center gap-1.5"
                >
                  <Save size={11} />
                  Save Outfit
                </Button>
              </div>
            </div>

            {/* Canvas */}
            {items.length === 0 ? (
              <div className="border border-dashed border-ink-800 p-16 flex flex-col items-center gap-4 text-center">
                <span className="display text-5xl text-ink-700 italic">empty.</span>
                <p className="text-ink-500 text-sm font-light">
                  Your wardrobe is empty. Add some clothes first.
                </p>
                <Link
                  href="/wardrobe"
                  className="label-xs text-ink-950 bg-cream px-6 py-3 hover:bg-gold transition-all duration-200 inline-block mt-2"
                >
                  Go to Wardrobe
                </Link>
              </div>
            ) : (
              <OutfitCanvas
                slots={slots}
                onSlotClick={handleSlotClick}
                onSlotClear={handleSlotClear}
              />
            )}

            {/* Outfit summary */}
            {filledCount > 0 && (
              <div className="mt-6 border border-ink-800 bg-ink-900">
                <div className="ruled-b px-5 py-3">
                  <span className="label-xs text-ink-400">Current Outfit</span>
                </div>
                <div className="px-5 py-4 flex flex-wrap gap-3">
                  {Object.entries(slots)
                    .filter(([, item]) => item)
                    .map(([slotKey, item]) => (
                      <div key={slotKey} className="flex items-center gap-2 border border-ink-700 px-3 py-2">
                        {item.colorHex && (
                          <div
                            className="w-3 h-3 rounded-full border border-ink-600 flex-shrink-0"
                            style={{ background: item.colorHex }}
                          />
                        )}
                        <span className="text-ink-300 text-xs font-light">{item.name}</span>
                        <button
                          onClick={() => handleSlotClear(slotKey)}
                          className="text-ink-600 hover:text-red-400 transition-colors ml-1"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Layer panel — slides in */}
          <div className={clsx(
            "transition-all duration-300 overflow-hidden flex-shrink-0",
            panelOpen ? "w-80 opacity-100" : "w-0 opacity-0 pointer-events-none"
          )}>
            {panelOpen && (
              <div className="h-[calc(100vh-220px)] sticky top-24 overflow-hidden border border-ink-800">
                <LayerPanel
                  activeSlot={activeSlot}
                  onSelect={handleSelectItem}
                  onClose={handlePanelClose}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Saved outfits view ── */}
      {view === "saved" && (
        <div className="flex flex-col gap-6">
          {loadingOutfits ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="aspect-square bg-ink-800 animate-pulse" />
                  <div className="h-3 bg-ink-800 animate-pulse w-2/3" />
                  <div className="h-2 bg-ink-800 animate-pulse w-1/3" />
                </div>
              ))}
            </div>
          ) : savedOutfits.length === 0 ? (
            <div className="border border-dashed border-ink-800 p-20 flex flex-col items-center gap-5 text-center">
              <BookOpen size={28} className="text-ink-700" />
              <div className="flex flex-col gap-2">
                <p className="text-cream text-sm font-light">No saved outfits yet</p>
                <p className="text-ink-500 text-xs font-light">
                  Build an outfit and save it to see it here.
                </p>
              </div>
              <Button size="md" onClick={() => setView("builder")}>
                Start Building
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <span className="gold-line" />
                <span className="label-xs text-ink-500">
                  {savedOutfits.length} saved {savedOutfits.length === 1 ? "outfit" : "outfits"}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {savedOutfits.map((outfit) => (
                  <OutfitCard
                    key={outfit.id}
                    outfit={outfit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Save modal */}
      <SaveOutfitModal
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
        onSave={handleSave}
        slots={slots}
      />
    </div>
  );
}