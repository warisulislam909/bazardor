"use client";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { GridSkeleton } from "@/components/Skeletons";
import { useProducts } from "@/hooks/useProducts";

function Section({ id, title, subtitle, children }: { id?: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32 py-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-neutral">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

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
        {error && (
          <div role="alert" className="alert alert-error mt-8">
            ডেটা লোড করা যায়নি। ইন্টারনেট সংযোগ দেখে পেজটি রিফ্রেশ করুন।
          </div>
        )}

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
