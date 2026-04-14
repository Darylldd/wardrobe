import clsx from "clsx";

export default function Input({ label, error, hint, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="label-xs text-ink-400">{label}</label>
      )}
      <input
        className={clsx(
          "w-full bg-transparent border-b border-ink-600 text-cream text-sm font-light",
          "py-3 px-0 outline-none transition-all duration-200 placeholder-ink-500",
          "focus:border-gold focus:placeholder-ink-400",
          "autofill:bg-transparent",
          error && "border-red-700 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-red-400 text-xs font-light">{error}</p>}
      {hint && !error && <p className="text-ink-500 text-xs font-light">{hint}</p>}
    </div>
  );
}