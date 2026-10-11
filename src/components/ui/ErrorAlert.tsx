export default function ErrorAlert({
  message = "ডেটা লোড করা যায়নি। ইন্টারনেট সংযোগ দেখে পেজটি রিফ্রেশ করুন।",
  className = "",
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div role="alert" className={`alert alert-error ${className}`}>
      {message}
    </div>
  );
}
