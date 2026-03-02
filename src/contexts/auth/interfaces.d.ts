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
  instagramHandle?: string;
  tiktokHandle?: string;
  youtubeHandle?: string;
}

export interface ILoggedUser extends Omit<IUser, "createdAt" | "deletedAt"> {
  acceptedTerms: boolean;
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
}
