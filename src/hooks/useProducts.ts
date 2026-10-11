"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/types";

export function useProducts() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    getProducts()
      .then((d) => alive && setProducts(d))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, []);

  return { products, error, loading: !products && !error };
}
