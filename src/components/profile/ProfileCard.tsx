import Link from "next/link";
import Avatar from "@/components/ui/Avatar";

export default function ProfileCard({ user }: { user: { name?: string | null; email?: string | null; image?: string | null } }) {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-sm sm:p-8">
      <div className="flex justify-center">
        <Avatar name={user.name} image={user.image} size="lg" />
      </div>
      <h1 className="mt-4 text-2xl font-extrabold">{user.name}</h1>
      <p className="text-gray-500">{user.email}</p>
      <Link href="/profile/update" className="btn btn-primary mt-6 btn-sm sm:btn-md">
        তথ্য আপডেট করুন
      </Link>
    </div>
  );
}
