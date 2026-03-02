import { api } from "../api";

import {
  IRefreshToken,
  IRefreshTokenResponse,
} from "@/contexts/auth/interfaces";

const refreshTokenService = async (
  body: IRefreshToken,
): Promise<IRefreshTokenResponse> => {
  const {
    data: { data, success },
  } = await api.post<{ success: boolean; data: IRefreshTokenResponse }>(
    "/auth/refresh",
    body,
  );

  if (!success) throw new Error("Token expirado!");

  return data;
};

export default refreshTokenService;
