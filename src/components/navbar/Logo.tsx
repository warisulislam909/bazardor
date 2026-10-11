"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Logo() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toLocaleDateString("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
  }, []);

  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/logo-icon.png" alt="" width={28} height={28} className="h-7 w-7" priority />
      <div className="leading-tight">
        <p className="text-lg font-extrabold text-primary">বাজার দর</p>
        <p className="min-h-[1em] text-[11px] text-gray-500">{date}</p>
      </div>
    </Link>
  );
}
