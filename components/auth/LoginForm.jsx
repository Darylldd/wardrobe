"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { loginUser, loginWithGoogle } from "@/lib/firebase/auth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email)    e.email    = "Required";
    if (!form.password) e.password = "Required";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    setLoading(true);
    try {
      await loginUser(form.email, form.password);
      toast.success("Welcome back.");
      router.push("/dashboard");
    } catch (err) {
      toast.error(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Welcome back.");
      router.push("/dashboard");
    } catch {
      toast.error("Google sign-in failed.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto anim-fade-up">
      <div className="mb-8">
        <p className="label text-denim mb-3">Member access</p>
        <h2 className="font-typewriter text-4xl text-paper-900 leading-tight">
          Back in<br />the closet.
        </h2>
        <p className="text-paper-600 text-sm font-light mt-3">
          Sign in to your wardrobe
        </p>
      </div>

      <div className="bg-white border border-paper-300 rounded-sm p-6 shadow-paper">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Email address"
            type="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Min 6 characters"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
          />
          <Button type="submit" size="lg" loading={loading} className="w-full mt-1">
            Sign in
          </Button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <hr className="divider flex-1" />
          <span className="label text-paper-400 text-[10px]">or</span>
          <hr className="divider flex-1" />
        </div>

        <button
          onClick={handleGoogle}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 border border-paper-300
                     hover:border-paper-500 text-paper-700 text-sm font-light
                     py-3 rounded-sm transition-all duration-150"
        >
          {googleLoading ? (
            <span className="w-4 h-4 border-2 border-paper-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          Continue with Google
        </button>
      </div>

      <p className="text-center text-paper-500 text-sm font-light mt-6">
        No account?{" "}
        <Link href="/register" className="text-denim hover:text-denim-dark transition-colors underline underline-offset-2">
          Create one
        </Link>
      </p>
    </div>
  );
}

const getFirebaseError = (code) => ({
  "auth/user-not-found":    "No account with that email.",
  "auth/wrong-password":    "Wrong password.",
  "auth/invalid-email":     "Invalid email address.",
  "auth/too-many-requests": "Too many attempts — try later.",
  "auth/invalid-credential":"Wrong email or password.",
}[code] || "Something went wrong.");