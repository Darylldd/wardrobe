import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-ink-950 flex flex-col">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 ruled-b">
        <span className="display text-2xl text-cream tracking-tight">Fitcheck</span>
        <div className="flex items-center gap-8">
          <Link href="/login" className="label-xs text-ink-300 hover:text-cream transition-colors duration-200">
            Sign In
          </Link>
          <Link href="/register" className="label-xs text-ink-950 bg-cream px-5 py-2.5 hover:bg-gold hover:text-ink-950 transition-all duration-200">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">

        {/* Left — Text */}
        <div className="flex flex-col justify-between p-10 lg:p-16 ruled-b lg:ruled-b-0 lg:border-r lg:border-ink-700">
          <div className="flex flex-col gap-10 mt-8">
            <div className="flex items-center gap-3 animate-fade-up">
              <span className="gold-line" />
              <span className="label-xs text-gold">AI-Powered Styling</span>
            </div>

            <h1 className="display text-[clamp(4rem,10vw,8rem)] text-cream leading-none animate-fade-up anim-delay-1">
              Dress<br />
              <em className="shimmer-text not-italic">better.</em><br />
              Every day.
            </h1>

            <p className="text-ink-200 text-base font-light leading-relaxed max-w-sm animate-fade-up anim-delay-2">
              Upload your wardrobe once. Let AI compose outfits for any occasion — 
              casual Friday, job interviews, date nights, all of it.
            </p>
          </div>

          <div className="flex flex-col gap-6 animate-fade-up anim-delay-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-4 group w-fit"
            >
              <span className="label-xs text-ink-950 bg-cream px-8 py-4 group-hover:bg-gold transition-all duration-300">
                Start for Free
              </span>
              <span className="text-ink-400 group-hover:text-gold transition-colors duration-300 text-xl">→</span>
            </Link>

            <div className="flex items-center gap-6 ruled pt-6">
              {[
                { num: "1K+", label: "Outfits styled" },
                { num: "Free", label: "Always" },
                { num: "AI", label: "Powered" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="display text-2xl text-cream">{s.num}</span>
                  <span className="label-xs text-ink-400">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Visual */}
        <div className="relative bg-ink-900 overflow-hidden hidden lg:flex items-center justify-center animate-fade-in anim-delay-2">
          {/* Decorative grid */}
          <div className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(200,169,126,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,126,0.04) 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }}
          />

          {/* Center piece */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="w-64 h-80 border border-ink-600 flex items-center justify-center relative">
              <span className="text-8xl">👔</span>
              <span className="label-xs text-ink-500 absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">Upper Body</span>
            </div>

            {/* Floating tags */}
            <div className="absolute top-16 right-16 surface px-3 py-2">
              <span className="label-xs text-gold">Casual Friday</span>
            </div>
            <div className="absolute bottom-20 left-12 surface px-3 py-2">
              <span className="label-xs text-ink-200">AI Matched ✓</span>
            </div>
            <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col gap-2">
              <div className="w-8 h-8 rounded-full border border-ink-600 bg-ink-800" style={{ background: "#1a1a1a" }} />
              <div className="w-8 h-8 rounded-full border border-ink-600" style={{ background: "#3d2b1f" }} />
              <div className="w-8 h-8 rounded-full border border-ink-600" style={{ background: "#2d3a2e" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom strip */}
      <footer className="ruled px-10 py-5 flex items-center justify-between">
        <span className="label-xs text-ink-500">© 2025 Fitcheck</span>
        <span className="label-xs text-ink-500">Built for the indecisive</span>
      </footer>
    </main>
  );
}