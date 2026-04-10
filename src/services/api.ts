import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Cookies from "js-cookie";

import { API_URL } from "@/config";
import { toDaysFromSeconds } from "@/utils/date.utils";
import {
  IRefreshToken,
  IRefreshTokenResponse,
} from "@/contexts/auth/interfaces";

interface IRefreshTokenApiResponse {
  success: boolean;
  data: IRefreshTokenResponse;
}

interface IRetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

const isRefreshRequest = (url?: string): boolean => {
  return Boolean(url?.includes("/auth/refresh"));
};

const persistAccessToken = (token: string, tokenExpiresIn: number): void => {
  Cookies.set("token", token, {
    expires: toDaysFromSeconds(tokenExpiresIn),
  });
};

const clearAuthCookies = (): void => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  Cookies.remove("sessionId");
};

const handleRefreshToken = async (
  body: IRefreshToken,
): Promise<string | undefined> => {
  const response = await axios.post<IRefreshTokenApiResponse>(
    `${API_URL}/auth/refresh`,
    body,
  );

  const { success, data } = response.data;

  if (!success) {
    return undefined;
  }

  persistAccessToken(data.token, data.tokenExpiresIn);

  return data.token;
};

api.interceptors.request.use(async (config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as IRetryableRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (isRefreshRequest(originalRequest.url)) {
      clearAuthCookies();
      return Promise.reject(error);
    }

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
      clearAuthCookies();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newToken = await handleRefreshToken({ refreshToken });

      if (!newToken) {
        clearAuthCookies();
        return Promise.reject(error);
      }

      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      clearAuthCookies();
      return Promise.reject(refreshError);
    }
  },
);
