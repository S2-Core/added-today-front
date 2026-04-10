import { ReactNode } from "react";

export type ICalendarItemType = "CONTENT" | "CAMPAIGN" | "EARNING";

export type ICalendarItemSource = "SYSTEM_DEMO" | "USER_CREATED";

export interface IBaseCalendarItem {
  id: string;
  type: ICalendarItemType;
  source: ICalendarItemSource;
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

export interface IContentCalendarItem extends IBaseCalendarItem {
  type: "CONTENT";
  contentType: "REELS" | "STORY" | "POST" | "VIDEO" | "LIVE";
  platform: "INSTAGRAM" | "TIKTOK" | "YOUTUBE" | "LINKEDIN" | "OTHER";
  hook?: string | null;
  status: "IDEA" | "TO_POST" | "POSTED";
}

export interface ICampaignCalendarItem extends IBaseCalendarItem {
  type: "CAMPAIGN";
  description?: string | null;
  brand?: string | null;
  status: "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELED";
}

export interface IEarningCalendarItem extends IBaseCalendarItem {
  type: "EARNING";
  earningType: "PUBLI" | "ADS_PLATFORM";
  amountCents: number;
  currency: string;
  sourceLabel: string;
  status: "EXPECTED" | "RECEIVED" | "CANCELED";
}

export type ICalendarItem =
  | IContentCalendarItem
  | ICampaignCalendarItem
  | IEarningCalendarItem;

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
    contentType: IContentCalendarItem["contentType"];
    count: number;
  }[];
  contentsByPlatform: {
    platform: IContentCalendarItem["platform"];
    count: number;
  }[];
  earningsByType: {
    earningType: IEarningCalendarItem["earningType"];
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
  contentType: IContentCalendarItem["contentType"];
  platform: IContentCalendarItem["platform"];
  description: string;
  hook: string;
}

export type IAISuggestionWithRemaining = IAISuggestion & {
  weeklyRemainingSuggestions: number;
};

export interface IAISuggestionBody {
  platform: IContentCalendarItem["platform"];
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

export interface ICreateCalendarItemBase {
  title: string;
  startsAt: string;
  endsAt?: string | null;
  isAllDay: boolean;
  type: ICalendarItemType;
  description?: string | null;
}

export interface ICreateContentCalendarItem extends ICreateCalendarItemBase {
  type: "CONTENT";
  contentType: IContentCalendarItem["contentType"];
  platform: IContentCalendarItem["platform"];
  hook?: string | null;
  status: IContentCalendarItem["status"];
}

export interface ICreateCampaignCalendarItem extends ICreateCalendarItemBase {
  type: "CAMPAIGN";
  brand?: string | null;
  status: ICampaignCalendarItem["status"];
}

export interface ICreateEarningCalendarItem extends ICreateCalendarItemBase {
  type: "EARNING";
  earningType: IEarningCalendarItem["earningType"];
  amountCents: number;
  currency: string;
  source?: string | null;
  status: IEarningCalendarItem["status"];
}

export type ICreateCalendarItem =
  | ICreateContentCalendarItem
  | ICreateCampaignCalendarItem
  | ICreateEarningCalendarItem;

export interface IProps {
  children: ReactNode;
}

export interface ICalendarContext {
  items: ICalendarItem[] | null;
  handleFindAllItems: (from: string, to: string) => Promise<void>;
  dashboardData: IDashboard | null;
  handleFindDashboard: (from: string, to: string) => Promise<void>;
  calendarState: ICalendarState | null;
  handleFindCalendarState: () => Promise<void>;
  handleCalendarFirstAccess: () => Promise<void>;
  handleCreateItem: (data: ICreateCalendarItem) => Promise<void>;
  handleDeleteItem: (itemId: string) => Promise<void>;
  handleUpdateItem: (
    itemId: string,
    data: ICreateCalendarItem,
  ) => Promise<void>;
  aiSuggestion: IAISuggestionWithRemaining | null;
  handleAiSuggestion: (data: IAISuggestionBody) => Promise<void>;
  loading: boolean;
}
