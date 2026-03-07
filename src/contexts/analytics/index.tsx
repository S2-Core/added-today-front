"use client";

import { createContext, useEffect, useMemo, useRef } from "react";
import posthog from "posthog-js";

import { POSTHOG_HOST, POSTHOG_KEY } from "@/config";

import type {
  AnalyticsEventName,
  AnalyticsEventProperties,
  AnalyticsUserContext,
  AnalyticsUserIdentity,
  IAnalyticsContext,
  IProps,
} from "./interface";

export const AnalyticsContext = createContext({} as IAnalyticsContext);

const AnalyticsProvider = ({ children }: IProps) => {
  const isInitializedRef = useRef(false);
  const globalPropertiesRef = useRef<Record<string, unknown>>({});
  const identifiedUserIdRef = useRef<string | null>(null);
  const lastContextHashRef = useRef<string | null>(null);

  const isBrowser = (): boolean => typeof window !== "undefined";

  useEffect(() => {
    initAnalytics();
  }, []);

  const initAnalytics = (): void => {
    if (!isBrowser() || isInitializedRef.current || !POSTHOG_KEY) return;

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: "identified_only",
      capture_pageview: false,
      capture_pageleave: true,
    });

    isInitializedRef.current = true;
  };

  const trackEvent = (
    eventName: AnalyticsEventName,
    properties?: AnalyticsEventProperties,
  ): void => {
    if (!isBrowser() || !isInitializedRef.current) return;

    posthog.capture(eventName, {
      ...globalPropertiesRef.current,
      ...properties,
    });
  };

  const identifyUser = (identity: AnalyticsUserIdentity): void => {
    if (!isBrowser() || !isInitializedRef.current || !identity.userId) return;

    if (identifiedUserIdRef.current === identity.userId) return;

    identifiedUserIdRef.current = identity.userId;

    posthog.identify(identity.userId, {
      userId: identity.userId,
      name: identity.name,
      email: identity.email,
    });

    globalPropertiesRef.current = {
      ...globalPropertiesRef.current,
      userId: identity.userId,
      name: identity.name,
      email: identity.email,
    };
  };

  const setUserContext = (context: AnalyticsUserContext): void => {
    if (!isBrowser() || !isInitializedRef.current) return;

    const nextHash = JSON.stringify(context);

    if (lastContextHashRef.current === nextHash) return;

    lastContextHashRef.current = nextHash;

    globalPropertiesRef.current = {
      ...globalPropertiesRef.current,
      ...context,
    };

    posthog.setPersonProperties({
      ...context,
    });
  };

  const resetAnalyticsUser = (): void => {
    if (!isBrowser() || !isInitializedRef.current) return;

    globalPropertiesRef.current = {};
    identifiedUserIdRef.current = null;
    lastContextHashRef.current = null;

    posthog.reset();
  };

  const value = useMemo(
    (): IAnalyticsContext => ({
      trackEvent,
      identifyUser,
      setUserContext,
      resetAnalyticsUser,
    }),
    [],
  );

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsProvider;
