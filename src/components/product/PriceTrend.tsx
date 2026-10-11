import { fmtPrice } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function PriceTrend({ p }: { p: Product }) {
  const history = [
    { label: "আজ", value: p.today },
    { label: "গতকাল", value: p.yesterday },
    { label: "গত সপ্তাহ", value: p.lastWeek },
    { label: "গত মাস", value: p.lastMonth },
  ];
  const max = Math.max(...history.map((h) => h.value));

  return (
    <section className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-bold">দামের তুলনা</h2>
      <div className="space-y-3">
        {history.map((h) => (
          <div key={h.label} className="flex items-center gap-3 text-sm">
            <span className="w-20 shrink-0 text-gray-600">{h.label}</span>
            <div className="h-3 flex-1 rounded-full bg-base-200">
              <div className="h-3 rounded-full bg-primary" style={{ width: `${(h.value / max) * 100}%` }} />
            </div>
            <span className="w-24 shrink-0 text-right font-semibold">{fmtPrice(h.value)} টাকা</span>
          </div>
        ))}
      </div>
    </section>
  );
}
