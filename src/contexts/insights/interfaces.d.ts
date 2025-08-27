import { Dispatch, ReactNode, SetStateAction } from "react";

import {
  InsightFrequency,
  InsightHour,
  InsightTerritory,
  InsightTopics,
} from "@/constants/insights";

export interface IInsightSettings {
  topics: InsightTopics[];
  territory: InsightTerritory;
  frequency: InsightFrequency;
  hour: InsightHour;
}

export interface IInsight {
  id: string;
  title: string;
  summary: string;
  tip: string;
  topic: string;
  territory: string;
  sentAt: string;
  postGenerated: boolean;
  contentIdeas: string[];
  hashtags: string[];
  source: string;
}

export interface IInsightPagination {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface IInsightReponse {
  insights: IInsight[];
  pagination: IInsightPagination;
}

export interface IProps {
  children: ReactNode;
}

export interface IInsightsContext {
  setTab: Dispatch<SetStateAction<string>>;
  tab: string;
  insights: IInsight[] | null;
  insightsSettings: IInsightSettings | null;
  handleSetInsightSettings: (data: Partial<IInsightSettings>) => Promise<void>;
}
