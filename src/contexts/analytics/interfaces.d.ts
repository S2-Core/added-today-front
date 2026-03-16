import { ReactNode } from "react";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";

export type IAnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export interface IAnalyticsUserIdentity {
  userId: string;
  name?: string;
  email?: string;
}

export interface IAnalyticsUserContext {
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

export interface IAnalyticsBaseProperties {
  source?: "frontend";
  path?: string;
  feature?: string;
  screen?: string;
  routeName?: string;
  timestamp?: string;
}

export type IAnalyticsEventProperties = IAnalyticsBaseProperties &
  Partial<IAnalyticsUserContext> &
  Partial<IAnalyticsUserIdentity> &
  Record<string, unknown>;

export interface IProps {
  children: ReactNode;
}

export interface IAnalyticsContext {
  trackEvent: (
    eventName: IAnalyticsEventName,
    properties?: IAnalyticsEventProperties,
  ) => void;
  identifyUser: (identity: IAnalyticsUserIdentity) => void;
  setUserContext: (context: IAnalyticsUserContext) => void;
  resetAnalyticsUser: () => void;
}
