import { toBn } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function ChangeBadge({ change }: { change: Product["change"] }) {
  const pct = toBn(Math.abs(change.pct).toFixed(1));
  if (change.dir === "up")
    return <span className="badge badge-sm border-0 bg-green-100 font-semibold text-green-700">▲ {pct}%</span>;
  if (change.dir === "down")
    return <span className="badge badge-sm border-0 bg-red-100 font-semibold text-red-600">▼ {pct}%</span>;
  return <span className="badge badge-sm border-0 bg-gray-100 font-semibold text-gray-500">—{pct}%</span>;
}
