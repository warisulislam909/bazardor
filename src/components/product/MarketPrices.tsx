import DivisionTable from "./DivisionTable";
import { unitLabel, unitName } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function MarketPrices({ p }: { p: Product }) {
  const divisions = Array.from(new Set(p.markets.map((m) => m.division)));
  const globalMax = Math.max(...p.markets.map((m) => m.max));

  return (
    <section className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <h2 className="mb-1 text-lg font-bold">বাজারভিত্তিক দাম</h2>
      <p className="mb-4 text-sm text-gray-500">বিভিন্ন বিভাগের বাজারে {unitLabel(p.unit)} সর্বনিম্ন ও সর্বোচ্চ দাম</p>
      <div className="space-y-6">
        {divisions.map((d) => (
          <DivisionTable key={d} division={d} globalMax={globalMax} markets={p.markets.filter((m) => m.division === d)} />
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-500">* সকল দাম প্রতি {unitName(p.unit)} হিসেবে, সম্ভাব্য ও পরিবর্তনশীল।</p>
    </section>
  );
}
