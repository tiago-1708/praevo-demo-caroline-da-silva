import { useEffect, useRef, useState } from "react";

type RevealOptions = {
  threshold?: number;
  rootMargin?: string;
  /** Atraso em ms depois de entrar no viewport — para stagger em grelhas. */
  delay?: number;
};

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Revela um elemento uma única vez quando entra no viewport. Com
 * `prefers-reduced-motion` ou sem IntersectionObserver revela logo.
 */
export function useReveal<T extends Element = HTMLDivElement>({
  threshold = 0.12,
  rootMargin = "0px 0px -8% 0px",
  delay = 0,
}: RevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    let timer: number | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        if (delay > 0) timer = window.setTimeout(() => setRevealed(true), delay);
        else setRevealed(true);
      },
      { threshold, rootMargin },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [threshold, rootMargin, delay]);

  return { ref, revealed };
}
