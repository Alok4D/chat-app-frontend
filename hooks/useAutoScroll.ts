"use client";

import { useEffect, useRef } from "react";

export function useAutoScroll<T extends HTMLElement = HTMLDivElement>(
  dependencies: any[] = [],
  smooth = true,
  threshold = 120
) {
  const containerRef = useRef<T | null>(null);
  const isNearBottomRef = useRef(true);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      isNearBottomRef.current = distanceToBottom <= threshold;
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (isInitialMount.current || isNearBottomRef.current) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: isInitialMount.current || !smooth ? "auto" : "smooth",
      });
      isInitialMount.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  return containerRef;
}
