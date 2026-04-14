import clsx from "clsx";

const variants = {
  default: "bg-paper-200 text-paper-700 border border-paper-300",
  denim:   "bg-denim/10 text-denim-dark border border-denim/20",
  olive:   "bg-olive/10 text-olive-dark border border-olive/20",
  rose:    "bg-rose/10 text-rose-dark border border-rose/20",
  hand:    "bg-yellow-50 text-paper-800 border border-yellow-200 font-hand text-sm rotate-[-1deg]",
};

export default function Badge({ children, variant = "default", className = "", onClick }) {
  return (
    <span
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-sm transition-all duration-150",
        variants[variant],
        onClick && "cursor-pointer hover:opacity-80",
        className
      )}
    >
      {children}
    </span>
  );
}