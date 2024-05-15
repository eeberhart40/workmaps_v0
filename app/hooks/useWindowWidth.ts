import { useState, useEffect } from "react";

export function useWindowWidth(mobileBreakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < mobileBreakpoint
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileBreakpoint]);

  return isMobile;
}
