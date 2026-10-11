"use client";
import Link from "next/link";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function ProfilePage() {
  const { session, isPending } = useRequireAuth();

  if (isPending || !session) {
    return (
      <div className="mx-auto max-w-md px-4 py-12">
        <div className="skeleton h-64 w-full rounded-2xl" />
      </div>
    );
  }

  const u = session.user;
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-sm sm:p-8">
        {u.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={u.image} alt="" className="mx-auto h-24 w-24 rounded-full" referrerPolicy="no-referrer" />
        ) : (
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-bold text-white">
            {u.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
        <h1 className="mt-4 text-2xl font-extrabold">{u.name}</h1>
        <p className="text-gray-500">{u.email}</p>
        <Link href="/profile/update" className="btn btn-primary mt-6 btn-sm sm:btn-md">
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}
