import { ReactNode } from "react";

export type IEventType = "CONTENT" | "CAMPAIGN" | "EARNING";

export type IEventSource = "SYSTEM_DEMO" | "USER_CREATED";

export interface IBaseEvent {
  id: string;
  type: IEventType;
  source: IEventSource;
  title: string;
  startsAt: string;
  endsAt?: string | null;
  isAllDay: boolean;
  convertedFromDemoAt?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  description?: string | null;
}

export interface IContentEvent extends IBaseEvent {
  type: "CONTENT";
  contentType: "REELS" | "STORY" | "POST" | "VIDEO" | "LIVE";
  platform: "INSTAGRAM" | "TIKTOK" | "YOUTUBE" | "LINKEDIN" | "OTHER";
  hook?: string | null;
  status: "IDEA" | "TO_POST" | "POSTED";
}

export interface ICampaignEvent extends IBaseEvent {
  type: "CAMPAIGN";
  description?: string | null;
  status: "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";
}

export interface IEarningEvent extends IBaseEvent {
  type: "EARNING";
  earningType: "PUBLI" | "ADS_PLATFORM";
  amountCents: number;
  currency: string;
  sourceLabel: string;
  status: "EXPECTED" | "RECEIVED" | "CANCELED";
}

export type IEvent = IContentEvent | ICampaignEvent | IEarningEvent;

export interface IDashboard {
  from: string;
  to: string;
  previousFrom: string;
  previousTo: string;
  contentsCount: number;
  campaignsCount: number;
  earningsCount: number;
  earningsAmountCents: number;
  averageEarningPerPubliCents: number;
  currency: string;
  contentsByType: {
    contentType: IContentEvent["contentType"];
    count: number;
  }[];
  contentsByPlatform: {
    platform: IContentEvent["platform"];
    count: number;
  }[];
  earningsByType: {
    earningType: IEarningEvent["earningType"];
    count: number;
    amountCents: number;
  }[];
  comparison: {
    contentsCount: number;
    earningsAmountCents: number;
    contentGrowthPercent?: number | null;
    earningsGrowthPercent?: number | null;
  };
}

export interface IAISuggestion {
  title: string;
  contentType: IContentEvent["contentType"];
  platform: IContentEvent["platform"];
  description: string;
  hook: string;
}

export type IAISuggestionWithRemaining = IAISuggestion & {
  weeklyRemainingSuggestions: number;
};

export interface IAISuggestionBody {
  platform: IContentEvent["platform"];
  referenceDate?: string;
}

export interface ICalendarState {
  hasCreatedFirstRealItem: boolean;
  hasCompletedTutorial: boolean;
  tutorialCompletedAt?: string | null;
  tutorialLastSeenAt?: string | null;
  demoInsertedAt?: string | null;
  hasDemoItems: boolean;
  hasAnyRealItems: boolean;
  shouldShowTutorial: boolean;
  shouldShowInitialAiSuggestion: boolean;
  initialAiSuggestion?: IAISuggestion | null;
}

export interface ICreateEventBase {
  title: string;
  startsAt: string;
  endsAt?: string | null;
  isAllDay: boolean;
  type: IEventType;
  description?: string | null;
}

export interface ICreateContentEvent extends ICreateEventBase {
  type: "CONTENT";
  contentType: IContentEvent["contentType"];
  platform: IContentEvent["platform"];
  hook?: string | null;
  status: IContentEvent["status"];
}

export interface ICreateCampaignEvent extends ICreateEventBase {
  type: "CAMPAIGN";
  brand?: string | null;
  status: ICampaignEvent["status"];
}

export interface ICreateEarningEvent extends ICreateEventBase {
  type: "EARNING";
  earningType: IEarningEvent["earningType"];
  amountCents: number;
  currency: string;
  source?: string | null;
  status: IEarningEvent["status"];
}

export interface IProps {
  children: ReactNode;
}

export interface ICalendarContext {
  events: IEvent[] | null;
  handleFindAllEvents: (from: string, to: string) => Promise<void>;
  dashboardData: IDashboard | null;
  handleFindDashboard: (from: string, to: string) => Promise<void>;
  calendarState: ICalendarState | null;
  handleFindCalendarState: () => Promise<void>;
  handleCalendarFirstAccess: () => Promise<void>;
  handleCreateEvent: (
    data: ICreateContentEvent | ICreateCampaignEvent | ICreateEarningEvent,
  ) => Promise<void>;
  handleDeleteEvent: (eventId: string) => Promise<void>;
  handleUpdateEvent: (
    eventId: string,
    data: ICreateContentEvent | ICreateCampaignEvent | ICreateEarningEvent,
  ) => Promise<void>;
  aiSuggestion: IAISuggestionWithRemaining | null;
  handleAiSuggestion: (data: IAISuggestionBody) => Promise<void>;
  loading: boolean;
}
