import SortSelect, { SortKey } from "@/components/SortSelect";

export default function CategoryHeader({
  icon,
  name,
  sort,
  onSortChange,
}: {
  icon: string;
  name: string;
  sort: SortKey;
  onSortChange: (v: SortKey) => void;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-base-100 text-3xl shadow-sm">{icon}</span>
        {name}
      </h1>
      <SortSelect value={sort} onChange={onSortChange} />
    </div>
  );
}
