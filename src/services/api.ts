import axios from "axios";
import Cookies from "js-cookie";

import { API_URL } from "@/config";

import { toDaysFromSeconds } from "@/utils/date.utils";

import {
  IRefreshToken,
  IRefreshTokenResponse,
} from "@/contexts/auth/interfaces";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

const handleRefreshToken = async (
  data: IRefreshToken,
): Promise<string | undefined> => {
  const { token, tokenExpiresIn } = (
    await axios.post(`${API_URL}/auth/refresh`, data)
  ).data as IRefreshTokenResponse;

  Cookies.set("token", token, {
    expires: toDaysFromSeconds(tokenExpiresIn),
  });

  return token;
};

api.interceptors.request.use(async (config) => {
  const token = Cookies.get("token");

  if (!token) {
    const refreshToken = Cookies.get("refreshToken");

    if (refreshToken) {
      const newToken = await handleRefreshToken({
        refreshToken: refreshToken,
      });

      if (newToken) {
        config.headers.Authorization = `Bearer ${newToken}`;
      }
    }
  } else {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
