"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import FormField from "@/components/ui/FormField";
import SubmitButton from "@/components/ui/SubmitButton";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম ফাঁকা রাখা যাবে না");
    setLoading(true);
    // https://better-auth.com/docs/concepts/users-accounts#update-user
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);
    if (error) return toast.error(error.message || "আপডেট করা যায়নি");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
      <h1 className="text-center text-2xl font-extrabold">তথ্য আপডেট করুন</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <FormField label="নাম" value={name} onChange={(e) => setName(e.target.value)} placeholder="আপনার নাম" />
        <SubmitButton loading={loading}>Update Information</SubmitButton>
        <Link href="/profile" className="btn btn-ghost w-full">বাতিল</Link>
      </form>
    </div>
  );
}
