export interface IAuthContext {
  token: string | null;
  logout: () => void;
}
