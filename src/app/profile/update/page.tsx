"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { session, isPending } = useRequireAuth();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session?.user?.name]);

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

  if (isPending || !session) {
    return (
      <div className="mx-auto max-w-md px-4 py-12">
        <div className="skeleton h-56 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
        <h1 className="text-center text-2xl font-extrabold">তথ্য আপডেট করুন</h1>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="form-control">
            <span className="label-text mb-1 font-medium">নাম</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full" placeholder="আপনার নাম" />
          </label>
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Update Information"}
          </button>
          <Link href="/profile" className="btn btn-ghost w-full">বাতিল</Link>
        </form>
      </div>
    </div>
  );
}
