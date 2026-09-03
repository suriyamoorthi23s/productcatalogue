
import { useEffect, useState } from "react";
import { fetchCategories } from "../api/products";

export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetchCategories(controller.signal)
      .then((data) => setCategories(data))
      .catch((err) => {
        if (err?.name !== "AbortError") setCategories([]);
      });
    return () => controller.abort();
  }, []);

  return categories;
}