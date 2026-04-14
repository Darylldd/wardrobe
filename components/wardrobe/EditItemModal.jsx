"use client";

import { useState } from "react";
import { useWardrobe } from "@/context/WardrobeContext";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";
import clsx from "clsx";
import { Check } from "lucide-react";
import {
  CLOTHING_CATEGORIES,
  OCCASIONS,
  STYLE_TAGS,
  COLORS,
} from "@/constants/categories";

const COLOR_HEXES = {
  Black: "#111", White: "#f5f5f5", Gray: "#888", Navy: "#1a2744",
  Blue: "#2563eb", Red: "#dc2626", Green: "#16a34a", Yellow: "#ca8a04",
  Orange: "#ea580c", Purple: "#9333ea", Pink: "#ec4899", Brown: "#92400e",
  Beige: "#d4b896", Cream: "#faf7f2",
};

export default function EditItemModal({ item, onClose }) {
  const { updateItem } = useWardrobe();
  const [form, setForm] = useState({
    name:        item.name        || "",
    category:    item.category    || "",
    subCategory: item.subCategory || "",
    color:       item.color       || "",
    occasion:    item.occasion    || "",
    tags:        item.tags        || [],
  });
  const [saving, setSaving] = useState(false);

  const toggleTag = (tag) =>
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));

  const handleSave = async () => {
    if (!form.name.trim()) return toast.error("Name is required.");
    setSaving(true);
    try {
      await updateItem(item.id, {
        ...form,
        colorHex: COLOR_HEXES[form.color] || "#888",
      });
      toast.success("Item updated.");
      onClose();
    } catch {
      toast.error("Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const selectedCatData = form.category ? CLOTHING_CATEGORIES[form.category] : null;

  return (
    <Modal open onClose={onClose} title="Edit Item" subtitle={item.name} size="lg">
      <div className="flex flex-col gap-7">
        <Input
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Category */}
        <div className="flex flex-col gap-3">
          <span className="label-xs text-ink-400">Category</span>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(CLOTHING_CATEGORIES).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setForm({ ...form, category: key, subCategory: "" })}
                className={clsx(
                  "flex items-center gap-2 px-3 py-2.5 border text-left transition-all duration-150",
                  form.category === key
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-ink-700 text-ink-400 hover:border-ink-500 hover:text-cream"
                )}
              >
                <span>{val.icon}</span>
                <span className="label-xs">{val.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sub-category */}
        {selectedCatData && (
          <div className="flex flex-col gap-3">
            <span className="label-xs text-ink-400">Type</span>
            <div className="flex flex-wrap gap-2">
              {selectedCatData.items.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setForm({ ...form, subCategory: sub })}
                  className={clsx(
                    "label-xs px-3 py-1.5 border transition-all duration-150",
                    form.subCategory === sub
                      ? "border-gold text-gold bg-gold/10"
                      : "border-ink-700 text-ink-500 hover:border-ink-500 hover:text-cream"
                  )}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color */}
        <div className="flex flex-col gap-3">
          <span className="label-xs text-ink-400">Color</span>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((color) => (
              <button
                key={color}
                title={color}
                onClick={() => setForm({ ...form, color })}
                className={clsx(
                  "w-7 h-7 rounded-full border-2 transition-all duration-150",
                  form.color === color ? "border-gold scale-110" : "border-ink-700"
                )}
                style={{ background: COLOR_HEXES[color] || "#888" }}
              />
            ))}
          </div>
        </div>

        {/* Occasion */}
        <div className="flex flex-col gap-3">
          <span className="label-xs text-ink-400">Best Occasion</span>
          <div className="flex flex-wrap gap-2">
            {OCCASIONS.map((occ) => (
              <button
                key={occ}
                onClick={() => setForm({ ...form, occasion: form.occasion === occ ? "" : occ })}
                className={clsx(
                  "label-xs px-3 py-1.5 border transition-all duration-150",
                  form.occasion === occ
                    ? "border-gold text-gold bg-gold/10"
                    : "border-ink-700 text-ink-500 hover:border-ink-500 hover:text-cream"
                )}
              >
                {occ}
              </button>
            ))}
          </div>
        </div>

        {/* Style tags */}
        <div className="flex flex-col gap-3 ruled pt-4">
          <span className="label-xs text-ink-400">Style Tags</span>
          <div className="flex flex-wrap gap-2">
            {STYLE_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={clsx(
                  "label-xs px-3 py-1.5 border transition-all duration-150",
                  form.tags.includes(tag)
                    ? "border-gold text-gold bg-gold/10"
                    : "border-ink-700 text-ink-500 hover:border-ink-500 hover:text-cream"
                )}
              >
                {form.tags.includes(tag) && <Check size={9} className="inline mr-1" />}
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 ruled pt-4">
          <Button variant="secondary" size="md" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button size="md" className="flex-1" loading={saving} onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
}