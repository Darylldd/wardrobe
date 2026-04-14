"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { OCCASIONS } from "@/constants/categories";
import { Check } from "lucide-react";
import clsx from "clsx";

export default function SaveOutfitModal({ open, onClose, onSave, slots }) {
  const [name, setName]       = useState("");
  const [occasion, setOccasion] = useState("");
  const [notes, setNotes]     = useState("");
  const [saving, setSaving]   = useState(false);

  const filledSlots = Object.values(slots).filter(Boolean).length;

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      await onSave({ name: name.trim(), occasion, notes: notes.trim(), slots });
      setName("");
      setOccasion("");
      setNotes("");
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Save Outfit"
      subtitle={`${filledSlots} piece${filledSlots !== 1 ? "s" : ""} selected`}
      size="sm"
    >
      <div className="flex flex-col gap-6">
        <Input
          label="Outfit Name"
          placeholder='e.g. "Casual Monday" or "Date Night Look"'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex flex-col gap-3">
          <span className="label-xs text-ink-400">Best Occasion</span>
          <div className="grid grid-cols-2 gap-1.5">
            {OCCASIONS.map((occ) => (
              <button
                key={occ}
                onClick={() => setOccasion(occasion === occ ? "" : occ)}
                className={clsx(
                  "flex items-center justify-between px-3 py-2.5 border text-left transition-all duration-150",
                  occasion === occ
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-ink-800 text-ink-400 hover:border-ink-600 hover:text-cream"
                )}
              >
                <span className="text-xs font-light">{occ}</span>
                {occasion === occ && <Check size={10} />}
              </button>
            ))}
          </div>
        </div>

        <Input
          label="Notes (optional)"
          placeholder="Any styling notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex gap-3 ruled pt-2">
          <Button variant="secondary" size="md" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="md"
            className="flex-1"
            loading={saving}
            disabled={!name.trim() || filledSlots === 0}
            onClick={handleSave}
          >
            Save Outfit
          </Button>
        </div>
      </div>
    </Modal>
  );
}