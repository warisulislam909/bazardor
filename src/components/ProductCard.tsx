import Link from "next/link";
import ChangeBadge from "./ChangeBadge";
import { fmtPrice, unitLabel } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="group block rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-base-200 text-3xl">
          {p.image}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-neutral group-hover:text-primary">{p.nameBn}</h3>
          <p className="text-sm text-gray-500">{unitLabel(p.unit)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between border-t border-dashed border-base-300 pt-3">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-lg font-bold text-neutral">{fmtPrice(p.today)} টাকা</p>
        </div>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}
