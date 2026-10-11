"use client";
import type { Product } from "@/lib/types";

export type SortKey = "default" | "asc" | "desc";

/**
 * Sorts by the NUMERIC price (`today` is a number from the API).
 * Bengali numerals only exist at display time (see lib/bn.ts), so there is
 * never any string-vs-number comparison bug. If you ever need to sort
 * Bengali-digit strings, convert them with `parseBn()` first.
 */
export function sortProducts(items: Product[], key: SortKey): Product[] {
  if (key === "default") return items;
  return [...items].sort((a, b) => (key === "asc" ? a.today - b.today : b.today - a.today));
}

export default function SortSelect({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-neutral">
      সাজান:
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="select select-bordered select-sm w-52 appearance-none bg-base-100 pr-9 sm:select-md"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </span>
    </label>
  );
}
