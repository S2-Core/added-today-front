import { createBaseEventProperties } from "@/lib/analytics";
import type { IAnalyticsEventProperties } from "@/contexts/analytics/interfaces";

import type {
  ICalendarAiBlockedByLimitParams,
  ICalendarAiClickedParams,
  ICalendarAiSuggestionRequestedParams,
  ICalendarCreateClickedParams,
  ICalendarDateNavigatedParams,
  ICalendarDayModalOpenedParams,
  ICalendarItemMutationParams,
  ICalendarItemOpenedParams,
  ICalendarTutorialStepParams,
  ICalendarViewedParams,
  ICalendarViewChangedParams,
} from "./types";

const createCalendarBaseEventProperties = ({
  path,
  userId,
  planCode,
  isFounder,
}: {
  path?: string;
  userId?: string;
  planCode?: string | null;
  isFounder?: boolean;
}): IAnalyticsEventProperties =>
  createBaseEventProperties({
    path,
    feature: "calendar",
    screen: "home_calendar",
    routeName: "home",
    userId,
    planCode,
    isFounder,
    timestamp: true,
  });

export const mapCalendarViewedEventProperties = ({
  path,
  userId,
  planCode,
  isFounder,
  initialView,
}: ICalendarViewedParams): IAnalyticsEventProperties => ({
  ...createCalendarBaseEventProperties({
    path,
    userId,
    planCode,
    isFounder,
  }),
  initialView,
});

export const mapCalendarViewChangedEventProperties = ({
  path,
  userId,
  planCode,
  isFounder,
  view,
}: ICalendarViewChangedParams): IAnalyticsEventProperties => ({
  ...createCalendarBaseEventProperties({
    path,
    userId,
    planCode,
    isFounder,
  }),
  view,
});

export const mapCalendarDateNavigatedEventProperties = ({
  path,
  userId,
  planCode,
  isFounder,
  direction,
  view,
  from,
  to,
}: ICalendarDateNavigatedParams): IAnalyticsEventProperties => ({
  ...createCalendarBaseEventProperties({
    path,
    userId,
    planCode,
    isFounder,
  }),
  direction,
  view,
  from,
  to,
});

export const mapCalendarCreateClickedEventProperties = ({
  path,
  userId,
  planCode,
  isFounder,
  triggerSource,
  view,
}: ICalendarCreateClickedParams): IAnalyticsEventProperties => ({
  ...createCalendarBaseEventProperties({
    path,
    userId,
    planCode,
    isFounder,
  }),
  triggerSource,
  view,
});

export const mapCalendarItemOpenedEventProperties = ({
  path,
  userId,
  planCode,
  isFounder,
  itemId,
  itemType,
  itemSource,
  origin,
}: ICalendarItemOpenedParams): IAnalyticsEventProperties => ({
  ...createCalendarBaseEventProperties({
    path,
    userId,
    planCode,
    isFounder,
  }),
  itemId,
  itemType,
  itemSource,
  origin,
});

export const mapCalendarItemCreatedEventProperties = ({
  path,
  userId,
  planCode,
  isFounder,
  itemType,
  itemId,
  itemSource,
}: ICalendarItemMutationParams): IAnalyticsEventProperties => ({
  ...createCalendarBaseEventProperties({
    path,
    userId,
    planCode,
    isFounder,
  }),
  itemType,
  itemId,
  itemSource,
});

export const mapCalendarItemUpdatedEventProperties = ({
  path,
  userId,
  planCode,
  isFounder,
  itemType,
  itemId,
  itemSource,
}: ICalendarItemMutationParams): IAnalyticsEventProperties => ({
  ...createCalendarBaseEventProperties({
    path,
    userId,
    planCode,
    isFounder,
  }),
  itemType,
  itemId,
  itemSource,
});

export const mapCalendarItemDeletedEventProperties = ({
  path,
  userId,
  planCode,
  isFounder,
  itemType,
  itemId,
  itemSource,
}: ICalendarItemMutationParams): IAnalyticsEventProperties => ({
  ...createCalendarBaseEventProperties({
    path,
    userId,
    planCode,
    isFounder,
  }),
  itemType,
  itemId,
  itemSource,
});

export const mapCalendarDayModalOpenedEventProperties = ({
  path,
  userId,
  planCode,
  isFounder,
  date,
  itemsCount,
  view,
  origin,
}: ICalendarDayModalOpenedParams): IAnalyticsEventProperties => ({
  ...createCalendarBaseEventProperties({
    path,
    userId,
    planCode,
    isFounder,
  }),
  date,
  itemsCount,
  view,
  origin,
});

export const mapCalendarAiClickedEventProperties = ({
  path,
  userId,
  planCode,
  isFounder,
  platform,
  remaining,
}: ICalendarAiClickedParams): IAnalyticsEventProperties => ({
  ...createCalendarBaseEventProperties({
    path,
    userId,
    planCode,
    isFounder,
  }),
  platform,
  remaining,
});

export const mapCalendarAiSuggestionRequestedEventProperties = ({
  path,
  userId,
  planCode,
  isFounder,
  platform,
  remaining,
}: ICalendarAiSuggestionRequestedParams): IAnalyticsEventProperties => ({
  ...createCalendarBaseEventProperties({
    path,
    userId,
    planCode,
    isFounder,
  }),
  platform,
  remaining,
});

export const mapCalendarAiBlockedByLimitEventProperties = ({
  path,
  userId,
  planCode,
  isFounder,
  platform,
  remaining,
}: ICalendarAiBlockedByLimitParams): IAnalyticsEventProperties => ({
  ...createCalendarBaseEventProperties({
    path,
    userId,
    planCode,
    isFounder,
  }),
  platform,
  remaining,
});

export const mapCalendarTutorialStartedEventProperties = ({
  path,
  userId,
  planCode,
  isFounder,
  step,
  totalSteps,
}: ICalendarTutorialStepParams): IAnalyticsEventProperties => ({
  ...createCalendarBaseEventProperties({
    path,
    userId,
    planCode,
    isFounder,
  }),
  step,
  totalSteps,
});

export const mapCalendarTutorialCompletedEventProperties = ({
  path,
  userId,
  planCode,
  isFounder,
  totalSteps,
}: ICalendarTutorialStepParams): IAnalyticsEventProperties => ({
  ...createCalendarBaseEventProperties({
    path,
    userId,
    planCode,
    isFounder,
  }),
  totalSteps,
});

export const mapCalendarTutorialSkippedEventProperties = ({
  path,
  userId,
  planCode,
  isFounder,
  step,
  totalSteps,
}: ICalendarTutorialStepParams): IAnalyticsEventProperties => ({
  ...createCalendarBaseEventProperties({
    path,
    userId,
    planCode,
    isFounder,
  }),
  step,
  totalSteps,
});

export const mapCalendarTutorialReopenedEventProperties = ({
  path,
  userId,
  planCode,
  isFounder,
  totalSteps,
}: ICalendarTutorialStepParams): IAnalyticsEventProperties => ({
  ...createCalendarBaseEventProperties({
    path,
    userId,
    planCode,
    isFounder,
  }),
  totalSteps,
});
