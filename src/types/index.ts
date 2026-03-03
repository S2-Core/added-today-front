export const safeCast = <T>(value: unknown): T => value as T;

export interface IMeta {
  hasNext: boolean;
  hasPrev: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}
