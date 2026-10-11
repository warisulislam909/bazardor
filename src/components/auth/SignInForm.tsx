"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import FormField from "@/components/ui/FormField";
import SubmitButton from "@/components/ui/SubmitButton";
import { authClient } from "@/lib/auth-client";
import { getRedirect } from "@/lib/redirect";

export default function SignInForm() {
  const router = useRouter();
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
    if (!email.trim() || !password) return fail("ইমেইল ও পাসওয়ার্ড দিন");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email: email.trim(), password });
    setLoading(false);
    if (error) return fail("ইমেইল বা পাসওয়ার্ড সঠিক নয়");

    toast.success("সফলভাবে লগইন হয়েছে");
    router.push(getRedirect());
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <FormField label="ইমেইল" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
      <FormField label="পাসওয়ার্ড" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
      {error && <p role="alert" className="text-sm text-error">{error}</p>}
      <SubmitButton loading={loading}>লগইন</SubmitButton>
    </form>
  );
}
