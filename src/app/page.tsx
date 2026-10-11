"use client";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { GridSkeleton } from "@/components/Skeletons";
import Section from "@/components/ui/Section";
import ErrorAlert from "@/components/ui/ErrorAlert";
import { useProducts } from "@/hooks/useProducts";

export default function HomePage() {
  const { products, loading, error } = useProducts();

  const risers = (products ?? [])
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = (products ?? [])
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <Hero />
      <div className="mx-auto max-w-6xl px-4">
        {error && <ErrorAlert className="mt-8" />}

        <Section title="আজ দাম বেড়েছে ▲">
          {loading ? <GridSkeleton count={6} /> : <ProductGrid items={risers} />}
        </Section>

        <Section title="আজ দাম কমেছে ▼">
          {loading ? <GridSkeleton count={6} /> : <ProductGrid items={fallers} />}
        </Section>

        <Section id="সব-পণ্য" title="সব পণ্য" subtitle="সব পণ্যের আজকের গড় দাম ও গতকালের তুলনায় পরিবর্তন">
          {loading ? <GridSkeleton count={8} /> : <ProductGrid items={products ?? []} />}
        </Section>
      </div>
    </>
  );
}
