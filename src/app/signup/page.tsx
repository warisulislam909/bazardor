import Link from "next/link";
import AuthCard from "@/components/auth/AuthCard";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthCard
      title="রেজিস্টার করুন"
      subtitle="নতুন অ্যাকাউন্ট তৈরি করুন"
      footer={
        <>
          আগেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-semibold text-primary hover:underline">লগইন করুন</Link>
        </>
      }
    >
      <SignUpForm />
    </AuthCard>
  );
}
