"use client";

import { useEffect, useRef } from "react";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import type {
  IAnalyticsEventName,
  IAnalyticsEventProperties,
} from "./interfaces";

interface IProps {
  path: string;
  search?: string;
  trackEvent: (
    eventName: IAnalyticsEventName,
    properties?: IAnalyticsEventProperties,
  ) => void;
}

export const usePageTracking = ({ path, search = "", trackEvent }: IProps) => {
  const lastUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!path) return;

    const url = search ? `${path}?${search}` : path;

    if (lastUrlRef.current === url) return;

    lastUrlRef.current = url;

    trackEvent(ANALYTICS_EVENTS.PAGE_VIEWED, {
      source: "frontend",
      path,
      screen: path,
      routeName: path,
      url,
      timestamp: new Date().toISOString(),
    });
  }, [path, search, trackEvent]);
};
