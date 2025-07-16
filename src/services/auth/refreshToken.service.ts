import { api } from "../api";

import {
  IRefreshToken,
  IRefreshTokenResponse,
} from "@/contexts/auth/interfaces";

const refreshTokenService = async (
  body: IRefreshToken
): Promise<IRefreshTokenResponse> => {
  const { data } = await api.post<IRefreshTokenResponse>("/auth/refresh", body);

  return data;
};

export default refreshTokenService;
