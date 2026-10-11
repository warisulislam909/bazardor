"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import CategoryHeader from "@/components/category/CategoryHeader";
import NotFoundView from "@/components/NotFoundView";
import ProductGrid from "@/components/ProductGrid";
import { sortProducts, SortKey } from "@/components/SortSelect";
import { GridSkeleton } from "@/components/Skeletons";
import EmptyState from "@/components/ui/EmptyState";
import ErrorAlert from "@/components/ui/ErrorAlert";
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
      <CategoryHeader icon={category.icon} name={category.nameBn} sort={sort} onSortChange={setSort} />
      {error ? (
        <ErrorAlert />
      ) : loading ? (
        <GridSkeleton count={4} />
      ) : items.length === 0 ? (
        <EmptyState icon="🫙" title="৪০৪ — কোনো পণ্য পাওয়া যায়নি" message="এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।" />
      ) : (
        <ProductGrid items={items} />
      )}
    </div>
  );
}
