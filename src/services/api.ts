import axios from "axios";
import Cookies from "js-cookie";

import { decriptValue } from "@/utils/encryption.utils";

import { API_URL } from "@/config";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${decriptValue(token)}`;
  }

  return config;
});
