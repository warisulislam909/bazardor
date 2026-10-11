"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { CATEGORIES } from "@/lib/categories";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    );
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/");
          router.refresh();
        },
        onError: () => toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন"),
      },
    });
  };

  const user = session?.user;

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-icon.png" alt="" width={28} height={28} className="h-7 w-7" priority />
          <div className="leading-tight">
            <p className="text-lg font-extrabold text-primary">বাজার দর</p>
            <p className="min-h-[1em] text-[11px] text-gray-500">{date}</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-8 w-24 rounded-lg" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2 sm:btn-md">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt="" className="h-7 w-7 rounded-full" referrerPolicy="no-referrer" />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                )}
                <span className="hidden max-w-[8rem] truncate sm:inline">{user.name}</span>
              </div>
              <ul tabIndex={0} className="menu dropdown-content z-50 mt-2 w-48 rounded-box border border-base-300 bg-base-100 p-2 shadow">
                <li>
                  <Link href="/profile">আমার প্রোফাইল</Link>
                </li>
                <li>
                  <button onClick={handleSignOut}>সাইন আউট</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-outline btn-primary btn-sm sm:btn-md">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-base-300 bg-base-200/60">
        <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 text-sm">
          <li>
            <Link
              href="/"
              className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 font-medium transition ${
                pathname === "/" ? "bg-primary text-white" : "text-neutral hover:bg-base-300"
              }`}
            >
              🏠 হোম
            </Link>
          </li>
          {CATEGORIES.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 font-medium transition ${
                    active ? "bg-primary text-white shadow" : "text-neutral hover:bg-base-300"
                  }`}
                >
                  {c.icon} {c.nameBn}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
