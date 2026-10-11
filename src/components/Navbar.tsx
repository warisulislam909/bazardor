"use client";
import { authClient } from "@/lib/auth-client";
import Logo from "./navbar/Logo";
import CategoryNav from "./navbar/CategoryNav";
import AuthButtons from "./navbar/AuthButtons";
import UserMenu from "./navbar/UserMenu";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Logo />
        <div className="flex items-center gap-2">
          {isPending ? <div className="skeleton h-8 w-24 rounded-lg" /> : session?.user ? <UserMenu user={session.user} /> : <AuthButtons />}
        </div>
      </div>
      <CategoryNav />
    </header>
  );
}
