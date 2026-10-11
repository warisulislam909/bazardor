"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Avatar from "@/components/ui/Avatar";
import { authClient } from "@/lib/auth-client";

export default function UserMenu({ user }: { user: { name?: string | null; image?: string | null } }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
       onError: () => {
  toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
},
      },
    });
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2 sm:btn-md">
        <Avatar name={user.name} image={user.image} />
        <span className="hidden max-w-[8rem] truncate sm:inline">{user.name}</span>
      </div>
      <ul tabIndex={0} className="menu dropdown-content z-50 mt-2 w-48 rounded-box border border-base-300 bg-base-100 p-2 shadow">
        <li><Link href="/profile">আমার প্রোফাইল</Link></li>
        <li><button onClick={handleSignOut}>সাইন আউট</button></li>
      </ul>
    </div>
  );
}
