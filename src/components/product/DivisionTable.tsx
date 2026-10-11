import { fmtPrice } from "@/lib/bn";
import type { Market } from "@/lib/types";

export default function DivisionTable({
  division,
  markets,
  globalMax,
}: {
  division: string;
  markets: Market[];
  globalMax: number;
}) {
  return (
    <div>
      <h3 className="mb-2 font-semibold text-primary">📍 {division}</h3>
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
            {markets.map((m) => (
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
  );
}
