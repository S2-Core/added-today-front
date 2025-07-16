export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshToken {
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
}

export interface IAuthProps {
  children: ReactNode;
}

export interface IAuthContext {
  token: string | null;
  handleLogout: () => void;
  handleLogin: (data: ILogin, reset: UseFormReset<ILogin>) => void;
}
