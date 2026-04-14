import clsx from "clsx";

const variants = {
  primary:   "bg-cream text-ink-950 hover:bg-gold label-xs",
  secondary: "border border-ink-600 text-cream hover:border-gold hover:text-gold label-xs",
  danger:    "border border-red-900 text-red-400 hover:bg-red-900/20 label-xs",
  ghost:     "text-ink-400 hover:text-cream label-xs",
  gold:      "bg-gold text-ink-950 hover:bg-gold-light label-xs",
};

const sizes = {
  sm: "px-4 py-2 text-[0.6rem]",
  md: "px-6 py-3 text-[0.65rem]",
  lg: "px-8 py-4 text-[0.65rem]",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  disabled = false,
  ...props
}) {
  return (
    <button
      className={clsx(
        "transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed",
        "flex items-center justify-center gap-2 tracking-widest uppercase font-medium",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading</span>
        </>
      ) : children}
    </button>
  );
}