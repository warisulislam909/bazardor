export default function FormField({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="form-control">
      <span className="label-text mb-1 font-medium">{label}</span>
      <input {...props} className="input input-bordered w-full" />
    </label>
  );
}
