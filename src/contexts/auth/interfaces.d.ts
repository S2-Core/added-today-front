import { ReactNode } from "react";

import { IUser } from "../users/interfaces";

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  tokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
}

export interface IRefreshToken {
  refreshToken: string;
}

export type IRefreshTokenResponse = Omit<
  ILoginResponse,
  "refreshToken" | "refreshTokenExpiresIn"
>;

export interface IRegister {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  contentTopic: string;
  instagramHandle: string;
  tiktokHandle?: string;
  youtubeHandle?: string;
}

export interface ILoggedUser extends Omit<IUser, "createdAt" | "deletedAt"> {
  acceptedTerms: boolean;
}

export interface IPlanEntitlement {
  key:
    | "LAILA_INTERACTIONS"
    | "QUOTATIONS"
    | "INSIGHTS"
    | "OPPORTUNITIES"
    | "EXPORTS";
  limit: number | null;
  period: "DAY" | "WEEK" | "MONTH" | "YEAR";
  isEnabled: boolean;
  remaining?: number | null;
}

export interface IPlan {
  id: string;
  code: "FREE" | "PRO";
  description: string;
  isActive: boolean | null;
  priceCents: number;
  currency: string;
  interval: "MONTH" | "YEAR";
  planEntitlements: IPlanEntitlement[];
}

export interface ISubscription {
  id: string;
  status: "INCOMPLETE" | "ACTIVE" | "PAST_DUE" | "CANCELLED";
  provider: "STRIPE" | "MERCADOPAGO" | "PAGARME" | null;
  externalId: string;
  unitAmountCents: number;
  currency: string;
  interval: "MONTH" | "YEAR";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null;
  cancelReason: string | null;
}

export interface IUserCurrentPlan {
  currentPlan: Omit<IPlan, "planEntitlements">;
  subscription: ISubscription | null;
  planEntitlements: IPlanEntitlement[];
}

export interface IRecovery {
  email: string;
}

export interface INewPassowrd {
  password: string;
  confirmPassword: string;
}

export interface IProps {
  children: ReactNode;
}

export interface IAuthContext {
  token: string | null;
  handleLogout: () => void;
  handleLogin: (data: ILogin) => Promise<void>;
  handleSendRecoveryEmail: (data: IRecovery) => Promise<void>;
  handleNewPassword: (
    data: INewPassowrd,
    hash: string,
    reset: UseFormReset<INewPassowrd>,
  ) => Promise<void>;
  loggedUser: ILoggedUser | null;
  headerRoutes: IRouteLinks[] | null;
  termsModal: boolean;
  handleAcceptTerms: () => Promise<void>;
  isNavigationTabsLoaded: boolean;
  setIsNavigationTabsLoaded: Dispatch<SetStateAction<boolean>>;
  handleRegisterUser: (data: IRegister) => Promise<IUser | void>;
  handleFindAllPlans: () => Promise<IPlan[]>;
}
