import { useCallback, useEffect, useRef, useState } from "react";
import { fetchProducts } from "../api/products";

export function useProducts({ search, category }) {
    const [status, setStatus] = useState("loading"); // loading | success | error
    const [products, setProducts] = useState([]);
    const requestIdRef = useRef(0);
    const controllerRef = useRef(null);

    const load = useCallback(() => {
        const requestId = ++requestIdRef.current;

        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;

        setStatus("loading");

        fetchProducts({ search, category, signal: controller.signal })
            .then((data) => {
                if (requestId !== requestIdRef.current) return; // superseded, drop it
                setProducts(data);
                setStatus("success");
            })
            .catch((err) => {
                if (err?.name === "AbortError") return;
                if (requestId !== requestIdRef.current) return;
                setStatus("error");
            });
    }, [search, category]);

    useEffect(() => {
        load();
        return () => controllerRef.current?.abort();
    }, [load]);

    return { products, status, retry: load };
}
