import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-base-200 to-emerald-100">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div className="text-center md:text-left">
          <p className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            🛒 আজকের বাজার দর
          </p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-neutral sm:text-4xl lg:text-5xl">
            প্রয়োজনীয় পণ্যের দাম <span className="text-primary">এক নজরে</span>
          </h1>
          <p className="mt-4 text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার দৈনিক বাজার দর — সারা দেশের বিভিন্ন বাজারের তুলনামূলক দামসহ।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-6 btn-sm sm:btn-md">
            সব পণ্য দেখুন ↓
          </a>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image src="/hero.png" alt="তাজা ফল ও সবজির ঝুড়ি" width={315} height={263} priority className="h-auto w-full max-w-sm drop-shadow-xl" />
        </div>
      </div>
    </section>
  );
}
