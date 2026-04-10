import type { IAnalyticsEventProperties } from "@/contexts/analytics/interfaces";
import type {
  ICalendarItem,
  ICalendarItemType,
} from "@/contexts/calendar/interfaces";

import { CALENDAR_ANALYTICS_EVENTS } from "./events";

export type ICalendarAnalyticsEventName =
  (typeof CALENDAR_ANALYTICS_EVENTS)[keyof typeof CALENDAR_ANALYTICS_EVENTS];

export interface ICalendarAnalyticsBaseParams {
  path?: string;
  userId?: string;
  planCode?: string | null;
  isFounder?: boolean;
}

export interface ICalendarViewedParams extends ICalendarAnalyticsBaseParams {
  initialView?: "dayGridWeek" | "dayGridMonth";
}

export interface ICalendarViewChangedParams extends ICalendarAnalyticsBaseParams {
  view: "dayGridWeek" | "dayGridMonth";
}

export interface ICalendarDateNavigatedParams extends ICalendarAnalyticsBaseParams {
  direction: "prev" | "next";
  view: "dayGridWeek" | "dayGridMonth";
  from?: string;
  to?: string;
}

export interface ICalendarCreateClickedParams extends ICalendarAnalyticsBaseParams {
  triggerSource:
    | "toolbar"
    | "day_header"
    | "day_modal"
    | "date_click"
    | "empty_state"
    | "unknown";
  view?: "dayGridWeek" | "dayGridMonth";
}

export interface ICalendarItemMutationParams extends ICalendarAnalyticsBaseParams {
  itemType: ICalendarItemType;
  itemId?: string;
  itemSource?: ICalendarItem["source"];
}

export interface ICalendarItemOpenedParams extends ICalendarAnalyticsBaseParams {
  itemId: string;
  itemType: ICalendarItemType;
  itemSource?: ICalendarItem["source"];
  origin: "calendar_grid" | "day_modal" | "details_modal";
}

export interface ICalendarDayModalOpenedParams extends ICalendarAnalyticsBaseParams {
  date: string;
  itemsCount: number;
  view: "dayGridWeek" | "dayGridMonth";
  origin?: "date_click" | "more_link";
}

export interface ICalendarAiClickedParams extends ICalendarAnalyticsBaseParams {
  platform?: string;
  remaining?: number;
}

export interface ICalendarAiSuggestionRequestedParams extends ICalendarAnalyticsBaseParams {
  platform: string;
  remaining?: number;
}

export interface ICalendarAiBlockedByLimitParams extends ICalendarAnalyticsBaseParams {
  platform?: string;
  remaining?: number;
}

export interface ICalendarTutorialStepParams extends ICalendarAnalyticsBaseParams {
  step?: number;
  totalSteps: number;
}

export type ICalendarAnalyticsPayload = IAnalyticsEventProperties;
