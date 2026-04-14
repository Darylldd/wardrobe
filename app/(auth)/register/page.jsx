import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata = { title: "Register — FitCheck" };

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-paper-100" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(107,85,64,0.07) 27px, rgba(107,85,64,0.07) 28px)" }}>
      <div className="flex flex-col min-h-screen">
        <header className="px-6 md:px-10 py-5 border-b border-paper-300/50 flex items-center justify-between">
          <Link href="/" className="font-typewriter text-lg text-paper-900">FitCheck</Link>
          <Link href="/login" className="label text-paper-600 hover:text-paper-900 transition-colors text-xs">
            Sign in
          </Link>
        </header>
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}