import StatCard from "./StatCard";
import { fmtPrice, unitLabel } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function PriceStats({ p }: { p: Product }) {
  const min = Math.min(...p.markets.map((m) => m.min));
  const max = Math.max(...p.markets.map((m) => m.max));
  const avg = Math.round(p.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / p.markets.length);
  const unit = unitLabel(p.unit);

  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard label="সর্বনিম্ন দাম" value={fmtPrice(min)} unit={unit} tone="text-green-700" bg="bg-green-50" />
      <StatCard label="সর্বোচ্চ দাম" value={fmtPrice(max)} unit={unit} tone="text-red-600" bg="bg-red-50" />
      <StatCard label="গড় দাম" value={fmtPrice(avg)} unit={unit} tone="text-sky-700" bg="bg-sky-50" />
      <StatCard label="বাজারভিত্তিক আজকের দাম" value={fmtPrice(p.today)} unit={unit} tone="text-primary" bg="bg-emerald-50" />
    </section>
  );
}
