import { fmtPrice, toBn, unitName } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function TickerItem({ p }: { p: Product }) {
  const arrow = p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—";
  const color = p.change.dir === "up" ? "text-green-300" : p.change.dir === "down" ? "text-red-300" : "text-gray-200";
  return (
    <span className="flex shrink-0 items-center gap-2 px-5 text-sm">
      <span>{p.image}</span>
      <span className="font-medium">{p.nameBn}</span>
      <span>{fmtPrice(p.today)} টাকা/{unitName(p.unit)}</span>
      <span className={`font-semibold ${color}`}>{arrow} {toBn(Math.abs(p.change.pct).toFixed(1))}%</span>
    </span>
  );
}
