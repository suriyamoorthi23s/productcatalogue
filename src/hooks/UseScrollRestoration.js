import { useEffect, useRef } from "react";

export function useScrollRestoration(key, ready) {
  const restoredForKey = useRef(null);

  useEffect(() => {
    if (!ready || restoredForKey.current === key) return;
    const raw = sessionStorage.getItem(`scroll:${key}`);
    restoredForKey.current = key;
    if (raw !== null) {
      const y = Number(raw);
    
      requestAnimationFrame(() => window.scrollTo(0, y));
    } else {
      window.scrollTo(0, 0);
    }
  }, [key, ready]);

  useEffect(() => {
    const onScroll = () => {
      sessionStorage.setItem(`scroll:${key}`, String(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [key]);
}