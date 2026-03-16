"use client";

import { createContext, useCallback, useMemo, useRef } from "react";
import posthog from "posthog-js";

import { usePageTracking } from "./usePageTracking";

import type {
  IAnalyticsEventName,
  IAnalyticsEventProperties,
  IAnalyticsUserContext,
  IAnalyticsUserIdentity,
  IAnalyticsContext,
  IProps,
} from "./interfaces";

export const AnalyticsContext = createContext({} as IAnalyticsContext);

const AnalyticsProvider = ({ children }: IProps) => {
  const globalPropertiesRef = useRef<Record<string, unknown>>({});
  const identifiedUserIdRef = useRef<string | null>(null);
  const lastContextHashRef = useRef<string | null>(null);

  const isBrowser = (): boolean => typeof window !== "undefined";

  const trackEvent = useCallback(
    (
      eventName: IAnalyticsEventName,
      properties?: IAnalyticsEventProperties,
    ): void => {
      if (!isBrowser()) return;

      posthog.capture(eventName, {
        ...globalPropertiesRef.current,
        ...properties,
      });
    },
    [],
  );

  const identifyUser = useCallback((identity: IAnalyticsUserIdentity): void => {
    if (
      !isBrowser() ||
      !identity.userId ||
      identifiedUserIdRef.current === identity.userId
    )
      return;

    identifiedUserIdRef.current = identity.userId;

    posthog.identify(identity.userId, {
      userId: identity.userId,
      name: identity.name,
      email: identity.email,
    });

    globalPropertiesRef.current = {
      ...globalPropertiesRef.current,
      userId: identity.userId,
    };
  }, []);

  const setUserContext = useCallback((context: IAnalyticsUserContext): void => {
    if (!isBrowser()) return;

    const nextHash = JSON.stringify(context);

    if (lastContextHashRef.current === nextHash) return;

    lastContextHashRef.current = nextHash;

    globalPropertiesRef.current = {
      ...globalPropertiesRef.current,
      ...context,
    };

    posthog.setPersonProperties(context);
  }, []);

  const resetAnalyticsUser = useCallback((): void => {
    if (!isBrowser()) return;

    globalPropertiesRef.current = {};
    identifiedUserIdRef.current = null;
    lastContextHashRef.current = null;

    posthog.reset();
  }, []);

  const value = useMemo(
    (): IAnalyticsContext => ({
      trackEvent,
      identifyUser,
      setUserContext,
      resetAnalyticsUser,
    }),
    [trackEvent, identifyUser, setUserContext, resetAnalyticsUser],
  );

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsProvider;
