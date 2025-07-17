import { AES, enc } from "crypto-js";

import { AUTH_SECRET_KEY } from "@/config";

export const encriptValue = (value: string): string =>
  AES.encrypt(value, AUTH_SECRET_KEY).toString();

export const decriptValue = (encryptedValue: string): string =>
  AES.decrypt(encryptedValue, AUTH_SECRET_KEY).toString(enc.Utf8);
