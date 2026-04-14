import clsx from "clsx";

const variants = {
  primary:   "bg-paper-900 text-white hover:bg-paper-800 border border-paper-900",
  secondary: "bg-white text-paper-800 border border-paper-400 hover:border-paper-600",
  denim:     "bg-denim text-white border border-denim hover:bg-denim-dark",
  danger:    "bg-white text-rose border border-rose-300 hover:bg-rose-50",
  ghost:     "bg-transparent text-paper-600 border border-transparent hover:text-paper-900 hover:border-paper-300",
  olive:     "bg-olive text-white border border-olive hover:bg-olive-dark",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-xs",
  lg: "px-8 py-3.5 text-xs",
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
        "label rounded-sm transition-all duration-150",
        "inline-flex items-center justify-center gap-2",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading
        </>
      ) : children}
    </button>
  );
}