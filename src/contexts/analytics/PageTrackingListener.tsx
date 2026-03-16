"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { useAnalytics } from "@/contexts";
import { usePageTracking } from "./usePageTracking";

const PageTrackingListener = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { trackEvent } = useAnalytics();

  usePageTracking({
    path: pathname ?? "",
    search: searchParams?.toString() ?? "",
    trackEvent,
  });

  return null;
};

export default PageTrackingListener;
