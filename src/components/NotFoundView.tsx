import Link from "next/link";

export default function NotFoundView({
  title = "পেজটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে নেওয়া হয়েছে অথবা লিংকটি ভুল।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <div className="text-6xl">🛒</div>
      <p className="mt-4 text-5xl font-extrabold text-primary">৪০৪</p>
      <h1 className="mt-3 text-xl font-bold text-neutral">{title}</h1>
      <p className="mt-2 text-gray-500">{message}</p>
      <Link href="/" className="btn btn-primary btn-sm mt-6 sm:btn-md">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
