"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import NotFoundView from "@/components/NotFoundView";
import ProductGrid from "@/components/ProductGrid";
import SortSelect, { sortProducts, SortKey } from "@/components/SortSelect";
import { GridSkeleton } from "@/components/Skeletons";
import { useProducts } from "@/hooks/useProducts";
import { CATEGORIES } from "@/lib/categories";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products, loading, error } = useProducts();
  const [sort, setSort] = useState<SortKey>("default");

  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return <NotFoundView title="ক্যাটাগরি খুঁজে পাওয়া যায়নি" message="এই ক্যাটাগরিতে কোনো পণ্য নেই।" />;

  const items = sortProducts((products ?? []).filter((p) => p.category === category.slug), sort);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-base-100 text-3xl shadow-sm">{category.icon}</span>
          {category.nameBn}
        </h1>
        <SortSelect value={sort} onChange={setSort} />
      </div>

      {error ? (
        <div role="alert" className="alert alert-error">ডেটা লোড করা যায়নি। পেজটি রিফ্রেশ করুন।</div>
      ) : loading ? (
        <GridSkeleton count={4} />
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-base-300 bg-base-100 px-4 py-16 text-center">
          <p className="text-5xl">🫙</p>
          <h2 className="mt-3 text-xl font-bold">৪০৪ — কোনো পণ্য পাওয়া যায়নি</h2>
          <p className="mt-1 text-gray-500">এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।</p>
          <Link href="/" className="btn btn-primary btn-sm mt-5 sm:btn-md">হোম পেজে ফিরে যান</Link>
        </div>
      ) : (
        <ProductGrid items={items} />
      )}
    </div>
  );
}
