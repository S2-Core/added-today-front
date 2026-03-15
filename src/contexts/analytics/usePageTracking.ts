"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import type {
  AnalyticsEventName,
  AnalyticsEventProperties,
} from "./interfaces";

interface IProps {
  trackEvent: (
    eventName: AnalyticsEventName,
    properties?: AnalyticsEventProperties,
  ) => void;
}

export const usePageTracking = ({ trackEvent }: IProps) => {
  const [path, searchParams] = [usePathname(), useSearchParams()];

  const lastUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const query = searchParams?.toString();
    const url = query ? `${path}?${query}` : path;

    if (!path || lastUrlRef.current === url) return;

    lastUrlRef.current = url;

    trackEvent(ANALYTICS_EVENTS.PAGE_VIEWED, {
      source: "frontend",
      path,
      screen: path,
      routeName: path,
      url,
      timestamp: new Date().toISOString(),
    });
  }, [path, searchParams, trackEvent]);
};
