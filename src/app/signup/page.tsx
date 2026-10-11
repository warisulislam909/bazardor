"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
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
    <div className="mx-auto flex max-w-md px-4 py-12">
      <div className="w-full rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
        <h1 className="text-center text-2xl font-extrabold">রেজিস্টার করুন</h1>
        <p className="mt-1 text-center text-sm text-gray-500">নতুন অ্যাকাউন্ট তৈরি করুন</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
          <label className="form-control">
            <span className="label-text mb-1 font-medium">নাম</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="আপনার নাম" className="input input-bordered w-full" autoComplete="name" />
          </label>
          <label className="form-control">
            <span className="label-text mb-1 font-medium">ইমেইল</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input input-bordered w-full" autoComplete="email" />
          </label>
          <label className="form-control">
            <span className="label-text mb-1 font-medium">পাসওয়ার্ড</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="কমপক্ষে ৮ অক্ষর" className="input input-bordered w-full" autoComplete="new-password" />
          </label>
          {error && <p role="alert" className="text-sm text-error">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "রেজিস্টার"}
          </button>
        </form>

        <div className="divider text-xs text-gray-400">অথবা</div>
        <SocialButtons callbackURL="/" />

        <p className="mt-6 text-center text-sm text-gray-600">
          আগেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-semibold text-primary hover:underline">লগইন করুন</Link>
        </p>
      </div>
    </div>
  );
}
