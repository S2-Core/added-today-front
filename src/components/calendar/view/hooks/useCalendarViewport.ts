import { useEffect, useState } from "react";

const SMALL_MOBILE_BREAKPOINT = 480;
const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;
const WEEK_COMPACT_BREAKPOINT = 860;

const useCalendarViewport = () => {
  const [viewportWidth, setViewportWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isSmallMobile: viewportWidth > 0 && viewportWidth < SMALL_MOBILE_BREAKPOINT,
    isMobile: viewportWidth > 0 && viewportWidth < MOBILE_BREAKPOINT,
    isTablet:
      viewportWidth >= MOBILE_BREAKPOINT && viewportWidth < TABLET_BREAKPOINT,
    isDesktop: viewportWidth >= TABLET_BREAKPOINT,
    isWeekCompact: viewportWidth > 0 && viewportWidth < WEEK_COMPACT_BREAKPOINT,
  };
};

export default useCalendarViewport;
