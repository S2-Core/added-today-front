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

export type ILoggedUser = Omit<IUser, "createdAt" | "deletedAt">;

export interface IRecovery {
  recoveryEmail: string;
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
  handleLogin: (data: ILogin, reset: UseFormReset<ILogin>) => void;
  handleSendRecoveryEmail: (
    data: IRecovery,
    reset: UseFormReset<IRecovery>
  ) => void;
  handleNewPassword: (
    data: INewPassowrd,
    reset: UseFormReset<INewPassowrd>
  ) => void;
  loggedUser: ILoggedUser | null;
}
