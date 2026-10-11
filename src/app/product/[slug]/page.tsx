"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import NotFoundView from "@/components/NotFoundView";
import { DetailSkeleton } from "@/components/Skeletons";
import { useProducts } from "@/hooks/useProducts";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { fmtPrice, unitLabel, unitName } from "@/lib/bn";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { session, isPending } = useRequireAuth();
  const { products, loading, error } = useProducts();

  if (isPending || !session || loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <DetailSkeleton />
      </div>
    );
  }
  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div role="alert" className="alert alert-error">ডেটা লোড করা যায়নি। পেজটি রিফ্রেশ করুন।</div>
      </div>
    );
  }

  const p = products?.find((x) => x.slug === slug);
  if (!p) return <NotFoundView title="পণ্যটি খুঁজে পাওয়া যায়নি" message="এই নামে কোনো পণ্য নেই।" />;

  const minPrice = Math.min(...p.markets.map((m) => m.min));
  const maxPrice = Math.max(...p.markets.map((m) => m.max));
  const avgPrice = Math.round(p.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / p.markets.length);
  const diff = p.today - p.yesterday;

  const stats = [
    { label: "সর্বনিম্ন দাম", value: minPrice, tone: "text-green-700", bg: "bg-green-50" },
    { label: "সর্বোচ্চ দাম", value: maxPrice, tone: "text-red-600", bg: "bg-red-50" },
    { label: "গড় দাম", value: avgPrice, tone: "text-sky-700", bg: "bg-sky-50" },
    { label: "বাজারভিত্তিক আজকের দাম", value: p.today, tone: "text-primary", bg: "bg-emerald-50" },
  ];

  const history = [
    { label: "আজ", value: p.today },
    { label: "গতকাল", value: p.yesterday },
    { label: "গত সপ্তাহ", value: p.lastWeek },
    { label: "গত মাস", value: p.lastMonth },
  ];
  const historyMax = Math.max(...history.map((h) => h.value));

  const divisions = Array.from(new Set(p.markets.map((m) => m.division)));
  const globalMax = Math.max(...p.markets.map((m) => m.max));

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <Link href={`/category/${p.category}`} className="text-sm text-primary hover:underline">
        ← {p.categoryNameBn}-এ ফিরে যান
      </Link>

      {/* Summary */}
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
            <span className="text-xs text-gray-500">
              গতকাল {fmtPrice(p.yesterday)} টাকা
            </span>
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-2xl p-4 ${s.bg}`}>
            <p className="text-xs text-gray-600 sm:text-sm">{s.label}</p>
            <p className={`mt-1 text-xl font-bold sm:text-2xl ${s.tone}`}>{fmtPrice(s.value)} টাকা</p>
            <p className="text-xs text-gray-500">{unitLabel(p.unit)}</p>
          </div>
        ))}
      </section>

      {/* Trend */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">দামের তুলনা</h2>
        <div className="space-y-3">
          {history.map((h) => (
            <div key={h.label} className="flex items-center gap-3 text-sm">
              <span className="w-20 shrink-0 text-gray-600">{h.label}</span>
              <div className="h-3 flex-1 rounded-full bg-base-200">
                <div className="h-3 rounded-full bg-primary" style={{ width: `${(h.value / historyMax) * 100}%` }} />
              </div>
              <span className="w-24 shrink-0 text-right font-semibold">{fmtPrice(h.value)} টাকা</span>
            </div>
          ))}
        </div>
      </section>

      {/* Markets */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
        <h2 className="mb-1 text-lg font-bold">বাজারভিত্তিক দাম</h2>
        <p className="mb-4 text-sm text-gray-500">বিভিন্ন বিভাগের বাজারে {unitLabel(p.unit)} সর্বনিম্ন ও সর্বোচ্চ দাম</p>
        <div className="space-y-6">
          {divisions.map((d) => (
            <div key={d}>
              <h3 className="mb-2 font-semibold text-primary">📍 {d}</h3>
              <div className="overflow-x-auto">
                <table className="table table-sm sm:table-md">
                  <thead>
                    <tr>
                      <th>বাজার</th>
                      <th className="text-right">সর্বনিম্ন</th>
                      <th className="text-right">সর্বোচ্চ</th>
                      <th className="hidden w-40 sm:table-cell">দামের পরিসর</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.markets
                      .filter((m) => m.division === d)
                      .map((m) => (
                        <tr key={m.market}>
                          <td className="whitespace-nowrap">{m.market}</td>
                          <td className="text-right font-medium text-green-700">{fmtPrice(m.min)} টাকা</td>
                          <td className="text-right font-medium text-red-600">{fmtPrice(m.max)} টাকা</td>
                          <td className="hidden sm:table-cell">
                            <div className="relative h-2 rounded-full bg-base-200">
                              <div
                                className="absolute h-2 rounded-full bg-gradient-to-r from-green-500 to-red-400"
                                style={{ left: `${(m.min / globalMax) * 100}%`, width: `${((m.max - m.min) / globalMax) * 100}%`, minWidth: 4 }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-500">* সকল দাম প্রতি {unitName(p.unit)} হিসেবে, সম্ভাব্য ও পরিবর্তনশীল।</p>
      </section>
    </div>
  );
}
