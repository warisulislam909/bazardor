"use client";
import { useProducts } from "@/hooks/useProducts";
import TickerItem from "./TickerItem";

export default function Ticker() {
  const { products } = useProducts();
  if (!products) return <div className="h-9 bg-primary" />;

  return (
    <div className="overflow-hidden bg-primary py-2 text-white" aria-label="দামের তালিকা">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {products.map((p) => (
          <TickerItem key={p.id} p={p} />
        ))}
        {/* duplicate set for a seamless infinite loop */}
        {products.map((p) => (
          <TickerItem key={`dup-${p.id}`} p={p} />
        ))}
      </div>
    </div>
  );
}
