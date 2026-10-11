"use client";
import { useProducts } from "@/hooks/useProducts";
import { fmtPrice, toBn, unitName } from "@/lib/bn";

export default function Ticker() {
  const { products } = useProducts();
  if (!products) return <div className="h-9 bg-primary" />;

  const items = products.map((p) => {
    const arrow = p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—";
    const color = p.change.dir === "up" ? "text-green-300" : p.change.dir === "down" ? "text-red-300" : "text-gray-200";
    return (
      <span key={p.id} className="flex shrink-0 items-center gap-2 px-5 text-sm">
        <span>{p.image}</span>
        <span className="font-medium">{p.nameBn}</span>
        <span>
          {fmtPrice(p.today)} টাকা/{unitName(p.unit)}
        </span>
        <span className={`font-semibold ${color}`}>
          {arrow} {toBn(Math.abs(p.change.pct).toFixed(1))}%
        </span>
      </span>
    );
  });

  return (
    <div className="overflow-hidden bg-primary py-2 text-white" aria-label="দামের তালিকা">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {items}
        {items.map((el, i) => (
          <span key={`dup-${i}`} className="contents" aria-hidden="true">
            {el}
          </span>
        ))}
      </div>
    </div>
  );
}
