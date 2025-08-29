import { Dispatch, ReactNode, SetStateAction } from "react";

export type ICreateQuotation = IQuotationData;

export interface IQuotationData {
  niche: string;
  engagementRate: number;
  includesEvent?: boolean;
  tiktokFollowers?: number;
  includesReelsCombo?: boolean;
  instagramFollowers?: number;
  youtubeSubscribers?: number;
  includesBoostRights?: boolean;
  includesImageRights?: boolean;
  includesTiktokVideo?: boolean;
  estimatedTiktokViews?: number;
}

export interface IQuotation {
  id: string;
  createdAt: string;
  data: IQuotationData;
  openAiResponse: string;
}

export interface IProps {
  children: ReactNode;
}

export interface IQuotationsContext {
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
  quotations: IQuotation[] | null;
  quotationsRemaining: number | null;
  handleCreateQuotation: (data: ICreateQuotation) => Promise<void>;
}
