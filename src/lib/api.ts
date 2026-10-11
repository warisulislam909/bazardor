import type { Product } from "./types";

const BASE = "https://openapi.programming-hero.com/api/bazardor";

let cache: Promise<Product[]> | null = null;

export function getProducts(): Promise<Product[]> {
  if (!cache) {
    cache = fetch(`${BASE}/products`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load products");
        return r.json() as Promise<Product[]>;
      })
      .catch((e) => {
        cache = null;
        throw e;
      });
  }
  return cache;
}
