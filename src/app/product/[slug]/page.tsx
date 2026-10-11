"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import NotFoundView from "@/components/NotFoundView";
import { DetailSkeleton } from "@/components/Skeletons";
import ErrorAlert from "@/components/ui/ErrorAlert";
import ProductSummary from "@/components/product/ProductSummary";
import PriceStats from "@/components/product/PriceStats";
import PriceTrend from "@/components/product/PriceTrend";
import MarketPrices from "@/components/product/MarketPrices";
import { useProducts } from "@/hooks/useProducts";
import { useRequireAuth } from "@/hooks/useRequireAuth";

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
        <ErrorAlert />
      </div>
    );
  }

  const p = products?.find((x) => x.slug === slug);
  if (!p) return <NotFoundView title="পণ্যটি খুঁজে পাওয়া যায়নি" message="এই নামে কোনো পণ্য নেই।" />;

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <Link href={`/category/${p.category}`} className="text-sm text-primary hover:underline">
        ← {p.categoryNameBn}-এ ফিরে যান
      </Link>
      <ProductSummary p={p} />
      <PriceStats p={p} />
      <PriceTrend p={p} />
      <MarketPrices p={p} />
    </div>
  );
}
