import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 animate-fade-up">

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-px bg-ink-800 border border-ink-800">
        {[
          { label: "Wardrobe Items", value: "0",  note: "pieces uploaded" },
          { label: "Saved Outfits",  value: "0",  note: "looks saved"     },
          { label: "AI Suggestions", value: "0",  note: "this week"       },
        ].map((stat) => (
          <div key={stat.label} className="bg-ink-950 p-7 flex flex-col gap-2">
            <span className="label-xs text-ink-500">{stat.label}</span>
            <span className="display text-5xl text-cream">{stat.value}</span>
            <span className="text-ink-600 text-xs font-light">{stat.note}</span>
          </div>
        ))}
      </div>

      {/* Empty state */}
      <div className="border border-ink-800 border-dashed p-16 flex flex-col items-center gap-6 text-center">
        <span className="display text-7xl text-ink-700 italic">empty.</span>
        <div className="flex flex-col gap-2">
          <p className="text-cream text-sm font-light">Your wardrobe hasn't been set up yet.</p>
          <p className="text-ink-500 text-xs font-light">
            Upload your first clothing item to start getting AI outfit suggestions.
          </p>
        </div>
        <Link
          href="/wardrobe/upload"
          className="label-xs text-ink-950 bg-cream px-8 py-4 hover:bg-gold transition-all duration-200 inline-block mt-2"
        >
          Upload First Item
        </Link>
      </div>

      {/* Sections placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {["Recent Fits", "Suggested for Today"].map((section) => (
          <div key={section} className="border border-ink-800">
            <div className="ruled-b px-5 py-4 flex items-center justify-between">
              <span className="label-xs text-ink-400">{section}</span>
              <span className="label-xs text-ink-700">0 items</span>
            </div>
            <div className="p-8 flex items-center justify-center">
              <span className="text-ink-700 text-xs font-light">Nothing here yet</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}