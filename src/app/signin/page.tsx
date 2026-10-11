import Link from "next/link";
import AuthCard from "@/components/auth/AuthCard";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <AuthCard
      title="লগইন করুন"
      subtitle="আপনার অ্যাকাউন্টে প্রবেশ করুন"
      footer={
        <>
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:underline">রেজিস্টার করুন</Link>
        </>
      }
    >
      <SignInForm />
    </AuthCard>
  );
}
