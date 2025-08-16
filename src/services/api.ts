import axios from "axios";
import Cookies from "js-cookie";

import { API_URL } from "@/config";

import { decriptValue, encriptValue } from "@/utils/encryption.utils";

import { IRefreshToken } from "@/contexts/auth/interfaces";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

const handleRefreshToken = async (
  data: IRefreshToken
): Promise<string | undefined> => {
  const { accessToken, accessTokenExpiresIn } = (
    await axios.post(`${API_URL}/auth/refresh`, data)
  ).data;

  const accessExpiresIn = new Date();
  accessExpiresIn.setSeconds(
    accessExpiresIn.getSeconds() + accessTokenExpiresIn
  );

  Cookies.set("accessToken", encriptValue(accessToken), {
    expires: accessExpiresIn,
  });

  return accessToken;
};

api.interceptors.request.use(async (config) => {
  const token = Cookies.get("accessToken");

  if (!token) {
    const refreshToken = Cookies.get("refreshToken");

    if (refreshToken) {
      const newToken = await handleRefreshToken({
        refreshToken: decriptValue(refreshToken),
      });

      if (newToken) {
        config.headers.Authorization = `Bearer ${newToken}`;
      }
    }
  } else {
    config.headers.Authorization = `Bearer ${decriptValue(token)}`;
  }

  return config;
});
