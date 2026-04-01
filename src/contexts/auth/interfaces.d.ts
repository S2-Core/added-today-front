import { Dispatch, ReactNode, SetStateAction } from "react";

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

export type ILoggedUser = Omit<IUser, "createdAt" | "deletedAt">;

export interface IPlanEntitlement {
  key: "LAILA_INTERACTIONS" | "QUOTATIONS" | "INSIGHTS" | "OPPORTUNITIES";
  limit: number | null;
  period: "DAY" | "WEEK" | "MONTH" | "YEAR";
  isEnabled: boolean;
  remaining?: number | null;
}

export interface IPlan {
  id: string;
  name?: string;
  code: "FREE" | "PRO";
  priceCents: number;
  currency: string;
  description: string;
  isActive: boolean | null;
  interval: "MONTH" | "YEAR";
  planEntitlements: IPlanEntitlement[];
}

export interface ISubscription {
  id: string;
  status: "INCOMPLETE" | "ACTIVE" | "PAST_DUE" | "CANCELED";
  provider: "STRIPE" | "MERCADOPAGO" | "PAGARME" | null;
  externalId: string;
  unitAmountCents: number;
  baseAmountCents: number;
  introPriceAmountCents: number | null;
  introPriceCyclesTotal: number;
  introPriceCyclesUsed: number;
  introPriceCyclesRemaining: number;
  isInIntroOffer: boolean;
  currency: string;
  interval: "MONTH" | "YEAR";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  checkoutMode: "ONE_TIME" | "RECURRING";
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null;
  cancelReason: string | null;
}

export interface IUserCurrentPlan {
  currentPlan: Omit<IPlan, "planEntitlements">;
  subscription: ISubscription | null;
  entitlements: IPlanEntitlement[];
}

export interface IRecovery {
  email: string;
}

export interface INewPassowrd {
  password: string;
  confirmPassword: string;
}

export type IRegisterResponse = ILoginResponse & { user: IUser };

export interface IProps {
  children: ReactNode;
}

export interface IAuthContext {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  handleLogout: (refresh?: boolean) => void;
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
  handleRegisterUser: (data: IRegister) => Promise<IRegisterResponse | void>;
  handleFindUserCurrentPlan: () => Promise<IUserCurrentPlan | null>;
  userCurrentPlan: IUserCurrentPlan | null;
  handleLoggedUser: (
    plans?: boolean,
    user?: boolean,
  ) => Promise<{ user: ILoggedUser; userPlan: IUserCurrentPlan | null } | null>;
}
