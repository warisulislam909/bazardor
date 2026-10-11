import SocialButtons from "@/components/SocialButtons";

export default function AuthCard({
  title,
  subtitle,
  footer,
  children,
}: {
  title: string;
  subtitle: string;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-md px-4 py-12">
      <div className="w-full rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
        <h1 className="text-center text-2xl font-extrabold">{title}</h1>
        <p className="mt-1 text-center text-sm text-gray-500">{subtitle}</p>
        <div className="mt-6">{children}</div>
        <div className="divider text-xs text-gray-400">অথবা</div>
        <SocialButtons />
        <p className="mt-6 text-center text-sm text-gray-600">{footer}</p>
      </div>
    </div>
  );
}
