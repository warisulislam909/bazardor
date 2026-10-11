/** Reads ?redirect=/some/path (same-origin only) – falls back to "/" */
export function getRedirect(): string {
  if (typeof window === "undefined") return "/";
  const r = new URLSearchParams(window.location.search).get("redirect");
  return r && r.startsWith("/") && !r.startsWith("//") ? r : "/";
}
