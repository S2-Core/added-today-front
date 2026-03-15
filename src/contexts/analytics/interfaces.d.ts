import { ReactNode } from "react";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export interface AnalyticsUserIdentity {
  userId: string;
  name?: string;
  email?: string;
}

export interface AnalyticsUserContext {
  role?: string;
  phone?: string;
  acceptedTerms?: boolean;
  termsAcceptedAt?: string | null;
  isFounder?: boolean;
  instagramHandle?: string | null;
  tiktokHandle?: string | null;
  youtubeHandle?: string | null;
  contentTopic?: string | null;

  planCode?: string | null;
  planName?: string | null;
  planInterval?: string | null;
  subscriptionStatus?: string | null;
  subscriptionProvider?: string | null;
  cancelAtPeriodEnd?: boolean;
  hasActiveSubscription?: boolean;
  hasScheduledCancellation?: boolean;
}

export interface AnalyticsBaseProperties {
  source?: "frontend";
  path?: string;
  feature?: string;
  screen?: string;
  routeName?: string;
  timestamp?: string;
}

export type AnalyticsEventProperties = AnalyticsBaseProperties &
  Partial<AnalyticsUserContext> &
  Partial<AnalyticsUserIdentity> &
  Record<string, unknown>;

export interface IProps {
  children: ReactNode;
}

export interface IAnalyticsContext {
  trackEvent: (
    eventName: AnalyticsEventName,
    properties?: AnalyticsEventProperties,
  ) => void;
  identifyUser: (identity: AnalyticsUserIdentity) => void;
  setUserContext: (context: AnalyticsUserContext) => void;
  resetAnalyticsUser: () => void;
}
