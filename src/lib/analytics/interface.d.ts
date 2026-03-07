export interface AuthMeResponse {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  phone?: string;
  acceptedTerms?: boolean;
  termsAcceptedAt?: string | null;
  isFounder?: boolean;
  instagramHandle?: string | null;
  tiktokHandle?: string | null;
  youtubeHandle?: string | null;
  contentTopic?: string | null;
}

export interface UserPlanResponse {
  currentPlan?: {
    code?: string | null;
    name?: string | null;
    interval?: string | null;
  } | null;
  subscription?: {
    status?: string | null;
    cancelAtPeriodEnd?: boolean | null;
    provider?: string | null;
  } | null;
}
