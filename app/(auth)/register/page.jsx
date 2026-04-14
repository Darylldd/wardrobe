import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata = { title: "Register — Fitcheck" };

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-ink-950 grid grid-cols-1 lg:grid-cols-2">

      {/* Left — Form */}
      <div className="flex flex-col px-10 py-10 lg:px-16">
        <Link href="/" className="display text-xl text-cream mb-auto w-fit">Fitcheck</Link>
        <div className="flex-1 flex items-center justify-center py-16">
          <RegisterForm />
        </div>
        <p className="label-xs text-ink-600">© 2025 Fitcheck</p>
      </div>

      {/* Right — Decorative */}
      <div className="hidden lg:flex flex-col bg-ink-900 border-l border-ink-800 relative overflow-hidden p-16 justify-between">
        <div className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(200,169,126,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,126,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        <div className="relative z-10 flex flex-col gap-3 mt-auto">
          {["Upload your clothes", "AI matches your outfits", "Look great every day"].map((step, i) => (
            <div key={step} className="flex items-center gap-4 ruled py-4">
              <span className="display text-3xl text-ink-600">0{i + 1}</span>
              <span className="text-ink-300 text-sm font-light">{step}</span>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}