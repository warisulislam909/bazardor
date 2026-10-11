"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";

const base = "inline-flex whitespace-nowrap rounded-full px-3 py-1.5 font-medium transition";

export default function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className="border-t border-base-300 bg-base-200/60">
      <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 text-sm">
        <li>
          <Link href="/" className={`${base} ${pathname === "/" ? "bg-primary text-white" : "text-neutral hover:bg-base-300"}`}>
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
                className={`${base} ${active ? "bg-primary text-white shadow" : "text-neutral hover:bg-base-300"}`}
              >
                {c.icon} {c.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
