"use client";
import ProfileCard from "@/components/profile/ProfileCard";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function ProfilePage() {
  const { session, isPending } = useRequireAuth();

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      {isPending || !session ? <div className="skeleton h-64 w-full rounded-2xl" /> : <ProfileCard user={session.user} />}
    </div>
  );
}
