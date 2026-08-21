"use client";

import { useEffect, useRef } from "react";

export function useAutoScroll<T extends HTMLElement = HTMLDivElement>(
  dependencies: any[] = [],
  smooth = true
) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]);

  return containerRef;
}
