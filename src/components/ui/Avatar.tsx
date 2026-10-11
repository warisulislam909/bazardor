export default function Avatar({
  name,
  image,
  size = "sm",
}: {
  name?: string | null;
  image?: string | null;
  size?: "sm" | "lg";
}) {
  const dim = size === "lg" ? "h-24 w-24 text-4xl" : "h-7 w-7 text-sm";
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt="" className={`${dim} rounded-full`} referrerPolicy="no-referrer" />;
  }
  return (
    <span className={`${dim} flex items-center justify-center rounded-full bg-primary font-bold text-white`}>
      {name?.charAt(0).toUpperCase() || "U"}
    </span>
  );
}
