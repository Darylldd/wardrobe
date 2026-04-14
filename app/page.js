import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-paper-100" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(107,85,64,0.08) 27px, rgba(107,85,64,0.08) 28px)" }}>

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-paper-300/60">
        <span className="font-typewriter text-xl text-paper-900 tracking-tight">FitCheck</span>
        <div className="flex items-center gap-3">
          <Link href="/login" className="label text-paper-600 hover:text-paper-900 transition-colors px-4 py-2">
            Sign in
          </Link>
          <Link href="/register" className="label text-white bg-paper-900 hover:bg-paper-800 transition-colors px-5 py-2.5 rounded-sm">
            Get started
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div className="flex flex-col gap-8 anim-fade-up">
            <div className="inline-flex items-center gap-2 w-fit">
              <span className="w-5 h-px bg-denim" />
              <span className="label text-denim">AI wardrobe stylist</span>
            </div>

            <h1 className="font-typewriter text-5xl md:text-6xl text-paper-900 leading-tight">
              Stop staring<br />at your closet.
            </h1>

            <p className="text-paper-700 text-base md:text-lg leading-relaxed font-light max-w-sm">
              Upload your clothes once. Get outfit suggestions from an AI that actually knows what you own.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/register" className="label text-white bg-paper-900 hover:bg-paper-800 transition-colors px-8 py-4 text-center rounded-sm">
                Start free
              </Link>
              <Link href="/login" className="label text-paper-700 border border-paper-400 hover:border-paper-600 hover:text-paper-900 transition-all px-8 py-4 text-center rounded-sm">
                Sign in
              </Link>
            </div>
          </div>

          {/* Right — pinboard mockup */}
          <div className="relative anim-fade-up anim-delay-2">
            <div className="cork-bg rounded p-6 md:p-8 min-h-72 relative overflow-hidden">

              {/* Pinned polaroid cards */}
              <div className="grid grid-cols-2 gap-5">
                {[
                  { label: "White Oxford", cat: "Shirts",    rotate: "-rotate-2", color: "#f8f8f6" },
                  { label: "Dark Jeans",   cat: "Pants",     rotate: "rotate-1",  color: "#3a4a6b" },
                  { label: "White Sneakers",cat: "Footwear", rotate: "-rotate-1", color: "#f5f5f3" },
                  { label: "Olive Jacket", cat: "Outerwear", rotate: "rotate-2",  color: "#5a6642" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`polaroid shadow-polaroid ${item.rotate} relative`}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-rose-400 shadow-pin z-10" />
                    <div
                      className="w-full aspect-square mb-1"
                      style={{ background: item.color, opacity: 0.6 }}
                    />
                    <p className="font-hand text-xs text-paper-800 text-center leading-tight mt-1">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* AI sticky note */}
              <div
                className="absolute bottom-4 right-4 bg-yellow-50 border border-yellow-200 p-3 shadow-paper rotate-2 w-32"
                style={{ background: "#fefce8" }}
              >
                <p className="font-hand text-xs text-paper-700 leading-snug">
                  "Casual Friday — try the Oxford + dark jeans"
                </p>
                <p className="font-hand text-xs text-denim mt-1">— AI Stylist</p>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-20 md:mt-28">
          <hr className="divider mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Photograph your clothes", desc: "Upload photos of everything in your wardrobe, tagged by category and occasion." },
              { num: "02", title: "Build outfits",           desc: "Mix and layer pieces in the outfit builder. Save the ones you love." },
              { num: "03", title: "Ask the AI",              desc: "Tell it where you're going. It picks a complete outfit from your actual clothes." },
            ].map((step) => (
              <div key={step.num} className="flex flex-col gap-3">
                <span className="font-typewriter text-4xl text-paper-300">{step.num}</span>
                <h3 className="font-typewriter text-base text-paper-900">{step.title}</h3>
                <p className="text-paper-600 text-sm font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}