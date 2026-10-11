"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

function getRedirect() {
  const r = new URLSearchParams(window.location.search).get("redirect");
  return r && r.startsWith("/") && !r.startsWith("//") ? r : "/";
}

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দিন";
      setError(msg);
      toast.error(msg);
      return;
    }
    setLoading(true);
    const { error } = await authClient.signIn.email({ email: email.trim(), password });
    setLoading(false);
    if (error) {
      const msg = "ইমেইল বা পাসওয়ার্ড সঠিক নয়";
      setError(msg);
      toast.error(msg);
      return;
    }
    toast.success("সফলভাবে লগইন হয়েছে");
    router.push(getRedirect());
    router.refresh();
  };

  return (
    <div className="mx-auto flex max-w-md px-4 py-12">
      <div className="w-full rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
        <h1 className="text-center text-2xl font-extrabold">লগইন করুন</h1>
        <p className="mt-1 text-center text-sm text-gray-500">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
          <label className="form-control">
            <span className="label-text mb-1 font-medium">ইমেইল</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input input-bordered w-full" autoComplete="email" />
          </label>
          <label className="form-control">
            <span className="label-text mb-1 font-medium">পাসওয়ার্ড</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="input input-bordered w-full" autoComplete="current-password" />
          </label>
          {error && <p role="alert" className="text-sm text-error">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "লগইন"}
          </button>
        </form>

        <div className="divider text-xs text-gray-400">অথবা</div>
        <SocialButtons callbackURL={typeof window === "undefined" ? "/" : getRedirect()} />

        <p className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:underline">রেজিস্টার করুন</Link>
        </p>
      </div>
    </div>
  );
}
