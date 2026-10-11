import Link from "next/link";
import ChangeBadge from "@/components/ChangeBadge";
import { fmtPrice, unitLabel } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function ProductSummary({ p }: { p: Product }) {
  const diff = p.today - p.yesterday;
  return (
    <section className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-5xl">{p.image}</div>
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold sm:text-3xl">{p.nameBn}</h1>
          <p className="mt-1 text-gray-600">
            {p.nameBn}-এর আজকের গড় বাজারদর {fmtPrice(p.today)} টাকা, {unitLabel(p.unit)}। দাম গতকালের তুলনায়{" "}
            {diff > 0 ? "বেড়েছে" : diff < 0 ? "কমেছে" : "অপরিবর্তিত আছে"}।
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href={`/category/${p.category}`} className="badge badge-outline badge-primary py-3">
              {p.categoryIcon} {p.categoryNameBn}
            </Link>
            <span className="badge badge-outline py-3">⚖️ {unitLabel(p.unit)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:flex-col sm:items-end">
          <ChangeBadge change={p.change} />
          <span className="text-xs text-gray-500">গতকাল {fmtPrice(p.yesterday)} টাকা</span>
        </div>
      </div>
    </section>
  );
}
