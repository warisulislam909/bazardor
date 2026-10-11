"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import FormField from "@/components/ui/FormField";
import SubmitButton from "@/components/ui/SubmitButton";
import { authClient } from "@/lib/auth-client";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fail = (msg: string) => {
    setError(msg);
    toast.error(msg);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return fail("আপনার নাম দিন");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return fail("সঠিক ইমেইল দিন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name: name.trim(), email: email.trim(), password });
    setLoading(false);
    if (error) {
      const exists = /exist|already/i.test(error.message || "");
      return fail(exists ? "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে" : error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    }
    toast.success("রেজিস্ট্রেশন সফল! এখন লগইন করুন");
    router.push("/signin");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <FormField label="নাম" value={name} onChange={(e) => setName(e.target.value)} placeholder="আপনার নাম" autoComplete="name" />
      <FormField label="ইমেইল" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
      <FormField label="পাসওয়ার্ড" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="কমপক্ষে ৮ অক্ষর" autoComplete="new-password" />
      {error && <p role="alert" className="text-sm text-error">{error}</p>}
      <SubmitButton loading={loading}>রেজিস্টার</SubmitButton>
    </form>
  );
}
