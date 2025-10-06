import { Dispatch, ReactNode, SetStateAction } from "react";

import { OpportunityStatus, OpportunityType } from "@/constants/opportunities";

export interface ICreateOpportunity {
  title: string;
  deadline: Date | string;
  brand?: string;
  platform?: string;
  sourceUrl?: string;
  compensationMin?: number;
  compensationMax?: number;
  nicheTags: string[];
  audienceRange?: string;
  requirements?: string;
  location?: string;
  type: OpportunityType;
  status?: OpportunityStatus;
  currency?: string;
  highlight: boolean;
}

export interface IUpdateOpportunity {
  title: string;
  deadline: Date | string;
  brand?: string;
  platform?: string;
  sourceUrl?: string;
  compensationMin?: number;
  compensationMax?: number;
  nicheTags: string[];
  audienceRange?: string;
  requirements?: string;
  location?: string;
  type: OpportunityType;
  status?: OpportunityStatus;
  currency?: string;
  highlight: boolean;
}

export interface ICreatedBy {
  id: string;
  name: string;
  email: string;
}

export interface IOpportunity {
  id: string;
  title: string;
  deadline: Date;
  brand: string;
  platform: string;
  sourceUrl: string;
  compensationMin: number;
  compensationMax: number;
  nicheTags: string[];
  audienceRange: string;
  requirements: string;
  location: string;
  type: OpportunityType;
  status: OpportunityStatus;
  currency: string;
  highlight: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  createdBy: ICreatedBy;
}

export interface IOpportunitiesResponse {
  items: IOpportunity[];
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface IProps {
  children: ReactNode;
}

export interface IOpportunitiesContext {
  handleCreateOpportunity: (data: ICreateOpportunity) => Promise<void>;
  opportunities: IOpportunity[] | null;
  handleDeactivateOpportunity: (opportunityId: string) => Promise<void>;
  handleUpdateOpportunity: (
    data: Partial<IUpdateOpportunity>,
    opportunityId: string
  ) => Promise<void>;
  setFilters: Dispatch<SetStateAction<any>>;
  filters: any;
}
