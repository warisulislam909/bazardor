import Link from "next/link";

export default function EmptyState({
  icon,
  title,
  message,
  ctaLabel = "হোম পেজে ফিরে যান",
  ctaHref = "/",
}: {
  icon: string;
  title: string;
  message: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-base-300 bg-base-100 px-4 py-16 text-center">
      <p className="text-5xl">{icon}</p>
      <h2 className="mt-3 text-xl font-bold">{title}</h2>
      <p className="mt-1 text-gray-500">{message}</p>
      <Link href={ctaHref} className="btn btn-primary btn-sm mt-5 sm:btn-md">
        {ctaLabel}
      </Link>
    </div>
  );
}
