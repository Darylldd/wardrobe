"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { registerUser } from "@/lib/firebase/auth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ displayName: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.displayName)               errs.displayName = "Required";
    if (!form.email)                     errs.email       = "Required";
    if (form.password.length < 6)        errs.password    = "Min 6 characters";
    if (form.password !== form.confirm)  errs.confirm     = "Passwords don't match";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setLoading(true);
    try {
      await registerUser(form.email, form.password, form.displayName);
      toast.success("Account created. Welcome.");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const u = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="w-full max-w-sm mx-auto animate-fade-up">

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="gold-line" />
          <span className="label-xs text-gold">New Account</span>
        </div>
        <h2 className="display text-5xl text-cream mb-3">Build your<br />wardrobe.</h2>
        <p className="text-ink-400 text-sm font-light">Create an account to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <Input label="Full Name"        placeholder="Alex Rivera"        value={form.displayName} onChange={u("displayName")} error={errors.displayName} />
        <Input label="Email Address"    type="email" placeholder="you@email.com" value={form.email}        onChange={u("email")}        error={errors.email} />
        <Input label="Password"         type="password" placeholder="Min 6 characters" value={form.password}    onChange={u("password")}    error={errors.password} />
        <Input label="Confirm Password" type="password" placeholder="••••••••"     value={form.confirm}     onChange={u("confirm")}     error={errors.confirm} />

        <Button type="submit" size="lg" loading={loading} className="w-full mt-2">
          Create Account
        </Button>
      </form>

      <p className="text-center text-ink-500 text-xs font-light mt-8">
        Have an account?{" "}
        <Link href="/login" className="text-gold hover:text-gold-light transition-colors underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </div>
  );
}