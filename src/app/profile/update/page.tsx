"use client";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function UpdateProfilePage() {
  const { session, isPending } = useRequireAuth();

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      {isPending || !session ? (
        <div className="skeleton h-56 w-full rounded-2xl" />
      ) : (
        <UpdateProfileForm initialName={session.user.name ?? ""} />
      )}
    </div>
  );
}
