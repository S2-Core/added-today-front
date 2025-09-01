import { ReactNode } from "react";

import { IUser } from "../users/interfaces";

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
}

export interface IRefreshToken {
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
  accessTokenExpiresIn: number;
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
    reset: UseFormReset<INewPassowrd>
  ) => Promise<void>;
  loggedUser: ILoggedUser | null;
  headerRoutes: IRouteLinks[] | null;
  termsModal: boolean;
  handleAcceptTerms: () => Promise<void>;
}
