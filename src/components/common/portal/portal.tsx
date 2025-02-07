"use client"; // Ensures this component is client-only in Next.js 13+

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Only update state on the client
  }, []);

  if (!mounted) return null; // Prevents SSR errors

  return createPortal(children, document.body);
};

export default Portal;
