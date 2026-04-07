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
}

export interface IContentEvent extends IBaseEvent {
  type: "CONTENT";
  contentType: "REELS" | "STORY" | "POST" | "VIDEO" | "LIVE";
  platform: "INSTAGRAM" | "TIKTOK" | "YOUTUBE" | "LINKEDIN" | "OTHER";
  description?: string | null;
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

export interface IProps {
  children: ReactNode;
}

export interface ICalendarContext {
  events: IEvent[] | null;
  handleFindAllEvents: (from: string, to: string) => Promise<void>;
  dashboardData: IDashboard | null;
  handleFindDashboard: (from: string, to: string) => Promise<void>;
}
