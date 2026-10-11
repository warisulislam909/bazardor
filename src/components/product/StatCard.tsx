export default function StatCard({
  label,
  value,
  unit,
  tone,
  bg,
}: {
  label: string;
  value: string;
  unit: string;
  tone: string;
  bg: string;
}) {
  return (
    <div className={`rounded-2xl p-4 ${bg}`}>
      <p className="text-xs text-gray-600 sm:text-sm">{label}</p>
      <p className={`mt-1 text-xl font-bold sm:text-2xl ${tone}`}>{value} টাকা</p>
      <p className="text-xs text-gray-500">{unit}</p>
    </div>
  );
}
