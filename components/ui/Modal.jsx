"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

export default function Modal({ open, onClose, title, subtitle, children, size = "md" }) {
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;

  const sizes = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-2xl", xl: "max-w-4xl" };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-paper-900/50" />

      <div className={clsx(
        "relative w-full bg-paper-50 border border-paper-300 flex flex-col max-h-[92vh] anim-fade-up",
        "rounded-t-lg sm:rounded-sm",
        sizes[size]
      )}>
        {/* Tape strip */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-5 bg-paper-300/60 border-x border-paper-300/40 z-10" />

        {/* Header */}
        <div className="border-b border-paper-200 px-6 py-5 flex items-start justify-between flex-shrink-0 mt-1">
          <div>
            {title && <h3 className="font-typewriter text-xl text-paper-900">{title}</h3>}
            {subtitle && <p className="text-paper-500 text-xs font-light mt-1">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-paper-400 hover:text-paper-700 transition-colors p-1 ml-4"
          >
            <X size={15} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  );
}