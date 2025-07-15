export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthProps {
  children: ReactNode;
}

export interface IAuthContext {
  token: string | null;
  logout: () => void;
}
