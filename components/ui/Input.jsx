import clsx from "clsx";

export default function Input({ label, error, hint, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="label text-paper-600">{label}</label>
      )}
      <input
        className={clsx(
          "w-full bg-white border border-paper-300 text-paper-900",
          "rounded-sm px-4 py-3 text-sm font-light",
          "outline-none transition-all duration-150",
          "placeholder-paper-400",
          "focus:border-denim focus:ring-2 focus:ring-denim/10",
          error && "border-rose focus:border-rose focus:ring-rose/10",
          className
        )}
        {...props}
      />
      {error && <p className="text-rose text-xs font-light">{error}</p>}
      {hint && !error && <p className="text-paper-500 text-xs font-light">{hint}</p>}
    </div>
  );
}