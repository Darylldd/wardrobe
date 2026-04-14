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
    const e = {};
    if (!form.displayName)             e.displayName = "Required";
    if (!form.email)                   e.email       = "Required";
    if (form.password.length < 6)      e.password    = "Min 6 characters";
    if (form.password !== form.confirm)e.confirm     = "Passwords do not match";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
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

  const u = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  return (
    <div className="w-full max-w-sm mx-auto anim-fade-up">
      <div className="mb-8">
        <p className="label text-olive mb-3">New account</p>
        <h2 className="font-typewriter text-4xl text-paper-900 leading-tight">
          Build your<br />wardrobe.
        </h2>
        <p className="text-paper-600 text-sm font-light mt-3">
          Free forever. No credit card needed.
        </p>
      </div>

      <div className="bg-white border border-paper-300 rounded-sm p-6 shadow-paper">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input label="Your name"       placeholder="Alex Rivera"     value={form.displayName} onChange={u("displayName")} error={errors.displayName} />
          <Input label="Email address"   type="email" placeholder="you@email.com" value={form.email}        onChange={u("email")}        error={errors.email} />
          <Input label="Password"        type="password" placeholder="Min 6 characters" value={form.password}    onChange={u("password")}    error={errors.password} />
          <Input label="Confirm password"type="password" placeholder="Same again"    value={form.confirm}     onChange={u("confirm")}     error={errors.confirm} />
          <Button type="submit" size="lg" loading={loading} className="w-full mt-1">
            Create account
          </Button>
        </form>
      </div>

      <p className="text-center text-paper-500 text-sm font-light mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-denim hover:text-denim-dark transition-colors underline underline-offset-2">
          Sign in
        </Link>
      </p>
    </div>
  );
}