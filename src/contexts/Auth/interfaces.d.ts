export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthProps {
  children: ReactNode;
}

export interface IAuthContext {
  token: string | null;
  handleLogout: () => void;
  handleLogin: (data: ILogin) => void;
}
