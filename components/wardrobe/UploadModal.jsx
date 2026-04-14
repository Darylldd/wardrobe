"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload, X, Check } from "lucide-react";
import { useWardrobe } from "@/context/WardrobeContext";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import toast from "react-hot-toast";
import clsx from "clsx";
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

const STEPS = ["Photo", "Details", "Tags"];

export default function UploadModal({ open, onClose }) {
  const { addItem } = useWardrobe();

  const [step, setStep] = useState(0);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "", category: "", subCategory: "",
    color: "", occasion: "", tags: [],
  });

  const onDrop = useCallback((accepted) => {
    const f = accepted[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setStep(1);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const toggleTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async () => {
    if (!file) return toast.error("Please select an image.");
    if (!form.name.trim()) return toast.error("Please add a name.");
    if (!form.category) return toast.error("Please select a category.");

    setUploading(true);
    try {
      await addItem(file, {
        name: form.name.trim(),
        category: form.category,
        subCategory: form.subCategory,
        color: form.color,
        colorHex: COLOR_HEXES[form.color] || "#888",
        occasion: form.occasion,
        tags: form.tags,
      });
      toast.success("Item added to wardrobe.");
      handleClose();
    } catch (err) {
      toast.error("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setStep(0);
    setFile(null);
    setPreview(null);
    setForm({ name: "", category: "", subCategory: "", color: "", occasion: "", tags: [] });
    onClose();
  };

  const categoryEntries = Object.entries(CLOTHING_CATEGORIES);
  const selectedCatData = form.category ? CLOTHING_CATEGORIES[form.category] : null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add to Wardrobe"
      subtitle="Upload a clothing item to your collection"
      size="lg"
    >
      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-8 border border-ink-800 w-fit">
        {STEPS.map((label, i) => (
          <button
            key={label}
            onClick={() => i < step + 1 && setStep(i)}
            className={clsx(
              "px-5 py-2 label-xs border-r border-ink-800 last:border-r-0 transition-all duration-150",
              i === step
                ? "bg-cream text-ink-950"
                : i < step
                ? "text-gold hover:bg-ink-800"
                : "text-ink-600 cursor-not-allowed"
            )}
          >
            {i < step ? <Check size={10} className="inline mr-1" /> : null}
            {label}
          </button>
        ))}
      </div>

      {/* ── Step 0: Photo ── */}
      {step === 0 && (
        <div
          {...getRootProps()}
          className={clsx(
            "border-2 border-dashed transition-all duration-200 cursor-pointer",
            "flex flex-col items-center justify-center gap-5 p-16",
            isDragActive
              ? "border-gold bg-gold/5 text-gold"
              : "border-ink-700 hover:border-ink-500 text-ink-500"
          )}
        >
          <input {...getInputProps()} />
          <Upload size={28} className="opacity-50" />
          <div className="text-center">
            <p className="text-sm font-light text-cream">
              {isDragActive ? "Drop it here" : "Drag & drop your photo"}
            </p>
            <p className="label-xs text-ink-600 mt-2">or click to browse — max 10MB</p>
          </div>
        </div>
      )}

      {/* ── Step 1: Details ── */}
      {step === 1 && (
        <div className="grid grid-cols-2 gap-8">
          {/* Preview */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] bg-ink-800 border border-ink-700 overflow-hidden">
              {preview && (
                <Image src={preview} alt="Preview" fill className="object-cover" />
              )}
            </div>
            <button
              onClick={() => { setFile(null); setPreview(null); setStep(0); }}
              className="label-xs text-ink-500 hover:text-cream transition-colors flex items-center gap-2"
            >
              <X size={11} /> Change photo
            </button>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-6">
            <Input
              label="Item Name"
              placeholder="e.g. White Oxford Shirt"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            {/* Category */}
            <div className="flex flex-col gap-3">
              <span className="label-xs text-ink-400">Category</span>
              <div className="grid grid-cols-2 gap-2">
                {categoryEntries.map(([key, val]) => (
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
                      form.color === color
                        ? "border-gold scale-110"
                        : "border-ink-700 hover:border-ink-400"
                    )}
                    style={{ background: COLOR_HEXES[color] || "#888" }}
                  />
                ))}
              </div>
              {form.color && (
                <span className="label-xs text-ink-500">{form.color} selected</span>
              )}
            </div>

            <div className="flex gap-3 mt-2">
              <Button
                variant="secondary"
                size="md"
                className="flex-1"
                onClick={() => setStep(0)}
              >
                Back
              </Button>
              <Button
                size="md"
                className="flex-1"
                onClick={() => {
                  if (!form.name.trim()) return toast.error("Please add a name.");
                  if (!form.category)   return toast.error("Please select a category.");
                  setStep(2);
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 2: Tags ── */}
      {step === 2 && (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Preview summary */}
            <div className="flex flex-col gap-3">
              <div className="relative aspect-[3/4] bg-ink-800 border border-ink-700 overflow-hidden">
                {preview && (
                  <Image src={preview} alt="Preview" fill className="object-cover" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-cream text-sm font-light">{form.name}</p>
                <p className="label-xs text-ink-500">
                  {CLOTHING_CATEGORIES[form.category]?.icon} {form.subCategory || form.category}
                  {form.color ? ` · ${form.color}` : ""}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-6">
              {/* Occasion */}
              <div className="flex flex-col gap-3">
                <span className="label-xs text-ink-400">Best Occasion</span>
                <div className="flex flex-col gap-1.5">
                  {OCCASIONS.map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setForm({ ...form, occasion: form.occasion === occ ? "" : occ })}
                      className={clsx(
                        "flex items-center justify-between px-4 py-2.5 border text-left transition-all duration-150",
                        form.occasion === occ
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-ink-800 text-ink-400 hover:border-ink-600 hover:text-cream"
                      )}
                    >
                      <span className="text-xs font-light">{occ}</span>
                      {form.occasion === occ && <Check size={11} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Style tags */}
          <div className="flex flex-col gap-3 ruled pt-6">
            <span className="label-xs text-ink-400">Style Tags (optional)</span>
            <div className="flex flex-wrap gap-2">
              {STYLE_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={clsx(
                    "label-xs px-4 py-2 border transition-all duration-150",
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

          <div className="flex gap-3 ruled pt-6">
            <Button variant="secondary" size="md" className="flex-1" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button size="md" className="flex-1" loading={uploading} onClick={handleSubmit}>
              Add to Wardrobe
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}