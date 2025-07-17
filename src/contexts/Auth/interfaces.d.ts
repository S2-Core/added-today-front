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

export interface IAuthProps {
  children: ReactNode;
}

export interface IAuthContext {
  token: string | null;
  handleLogout: () => void;
  handleLogin: (data: ILogin, reset: UseFormReset<ILogin>) => void;
}
