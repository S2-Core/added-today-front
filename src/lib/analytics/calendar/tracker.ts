import type {
  IAnalyticsEventName,
  IAnalyticsEventProperties,
} from "@/contexts/analytics/interfaces";

import { CALENDAR_ANALYTICS_EVENTS } from "./events";
import {
  mapCalendarAiBlockedByLimitEventProperties,
  mapCalendarAiClickedEventProperties,
  mapCalendarAiSuggestionRequestedEventProperties,
  mapCalendarCreateClickedEventProperties,
  mapCalendarDateNavigatedEventProperties,
  mapCalendarDayModalOpenedEventProperties,
  mapCalendarItemCreatedEventProperties,
  mapCalendarItemDeletedEventProperties,
  mapCalendarItemOpenedEventProperties,
  mapCalendarItemUpdatedEventProperties,
  mapCalendarTutorialCompletedEventProperties,
  mapCalendarTutorialReopenedEventProperties,
  mapCalendarTutorialSkippedEventProperties,
  mapCalendarTutorialStartedEventProperties,
  mapCalendarViewedEventProperties,
  mapCalendarViewChangedEventProperties,
} from "./mappers";
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

type TrackEventFn = (
  eventName: IAnalyticsEventName,
  properties?: IAnalyticsEventProperties,
) => void;

export const trackCalendarViewed = (
  trackEvent: TrackEventFn,
  params: ICalendarViewedParams,
): void => {
  trackEvent(
    CALENDAR_ANALYTICS_EVENTS.VIEWED,
    mapCalendarViewedEventProperties(params),
  );
};

export const trackCalendarViewChanged = (
  trackEvent: TrackEventFn,
  params: ICalendarViewChangedParams,
): void => {
  trackEvent(
    CALENDAR_ANALYTICS_EVENTS.VIEW_CHANGED as IAnalyticsEventName,
    mapCalendarViewChangedEventProperties(params),
  );
};

export const trackCalendarDateNavigated = (
  trackEvent: TrackEventFn,
  params: ICalendarDateNavigatedParams,
): void => {
  trackEvent(
    CALENDAR_ANALYTICS_EVENTS.DATE_NAVIGATED as IAnalyticsEventName,
    mapCalendarDateNavigatedEventProperties(params),
  );
};

export const trackCalendarCreateClicked = (
  trackEvent: TrackEventFn,
  params: ICalendarCreateClickedParams,
): void => {
  trackEvent(
    CALENDAR_ANALYTICS_EVENTS.CREATE_CLICKED,
    mapCalendarCreateClickedEventProperties(params),
  );
};

export const trackCalendarItemOpened = (
  trackEvent: TrackEventFn,
  params: ICalendarItemOpenedParams,
): void => {
  trackEvent(
    CALENDAR_ANALYTICS_EVENTS.ITEM_OPENED as IAnalyticsEventName,
    mapCalendarItemOpenedEventProperties(params),
  );
};

export const trackCalendarItemCreated = (
  trackEvent: TrackEventFn,
  params: ICalendarItemMutationParams,
): void => {
  trackEvent(
    CALENDAR_ANALYTICS_EVENTS.ITEM_CREATED as IAnalyticsEventName,
    mapCalendarItemCreatedEventProperties(params),
  );
};

export const trackCalendarItemUpdated = (
  trackEvent: TrackEventFn,
  params: ICalendarItemMutationParams,
): void => {
  trackEvent(
    CALENDAR_ANALYTICS_EVENTS.ITEM_UPDATED as IAnalyticsEventName,
    mapCalendarItemUpdatedEventProperties(params),
  );
};

export const trackCalendarItemDeleted = (
  trackEvent: TrackEventFn,
  params: ICalendarItemMutationParams,
): void => {
  trackEvent(
    CALENDAR_ANALYTICS_EVENTS.ITEM_DELETED as IAnalyticsEventName,
    mapCalendarItemDeletedEventProperties(params),
  );
};

export const trackCalendarDayModalOpened = (
  trackEvent: TrackEventFn,
  params: ICalendarDayModalOpenedParams,
): void => {
  trackEvent(
    CALENDAR_ANALYTICS_EVENTS.DAY_MODAL_OPENED as IAnalyticsEventName,
    mapCalendarDayModalOpenedEventProperties(params),
  );
};

export const trackCalendarAiClicked = (
  trackEvent: TrackEventFn,
  params: ICalendarAiClickedParams,
): void => {
  trackEvent(
    CALENDAR_ANALYTICS_EVENTS.AI_CLICKED,
    mapCalendarAiClickedEventProperties(params),
  );
};

export const trackCalendarAiSuggestionRequested = (
  trackEvent: TrackEventFn,
  params: ICalendarAiSuggestionRequestedParams,
): void => {
  trackEvent(
    CALENDAR_ANALYTICS_EVENTS.AI_SUGGESTION_REQUESTED as IAnalyticsEventName,
    mapCalendarAiSuggestionRequestedEventProperties(params),
  );
};

export const trackCalendarAiBlockedByLimit = (
  trackEvent: TrackEventFn,
  params: ICalendarAiBlockedByLimitParams,
): void => {
  trackEvent(
    CALENDAR_ANALYTICS_EVENTS.AI_BLOCKED_BY_LIMIT as IAnalyticsEventName,
    mapCalendarAiBlockedByLimitEventProperties(params),
  );
};

export const trackCalendarTutorialStarted = (
  trackEvent: TrackEventFn,
  params: ICalendarTutorialStepParams,
): void => {
  trackEvent(
    CALENDAR_ANALYTICS_EVENTS.TUTORIAL_STARTED,
    mapCalendarTutorialStartedEventProperties(params),
  );
};

export const trackCalendarTutorialCompleted = (
  trackEvent: TrackEventFn,
  params: ICalendarTutorialStepParams,
): void => {
  trackEvent(
    CALENDAR_ANALYTICS_EVENTS.TUTORIAL_COMPLETED,
    mapCalendarTutorialCompletedEventProperties(params),
  );
};

export const trackCalendarTutorialSkipped = (
  trackEvent: TrackEventFn,
  params: ICalendarTutorialStepParams,
): void => {
  trackEvent(
    CALENDAR_ANALYTICS_EVENTS.TUTORIAL_SKIPPED,
    mapCalendarTutorialSkippedEventProperties(params),
  );
};

export const trackCalendarTutorialReopened = (
  trackEvent: TrackEventFn,
  params: ICalendarTutorialStepParams,
): void => {
  trackEvent(
    CALENDAR_ANALYTICS_EVENTS.TUTORIAL_REOPENED,
    mapCalendarTutorialReopenedEventProperties(params),
  );
};
