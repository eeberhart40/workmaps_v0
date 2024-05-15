import { useState, useEffect } from "react";

export function useWindowWidth(mobileBreakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < mobileBreakpoint : false
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    window.addEventListener("resize", handleResize);

    setIsMobile(window.innerWidth < mobileBreakpoint);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileBreakpoint]);

  return isMobile;
}
