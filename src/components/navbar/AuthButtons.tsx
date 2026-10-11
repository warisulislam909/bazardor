import Link from "next/link";

export default function AuthButtons() {
  return (
    <>
      <Link href="/signin" className="btn btn-outline btn-primary btn-sm sm:btn-md">সাইন ইন</Link>
      <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">সাইন আপ</Link>
    </>
  );
}
