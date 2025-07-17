"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import refreshTokenService from "@/services/auth/refreshToken.service";
import loginService from "@/services/auth/login.service";

import { decriptValue, encriptValue } from "@/utils/encryption.utils";

import { IAuthContext, IAuthProps, ILogin, IRefreshToken } from "./interfaces";

export const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: IAuthProps) => {
  const [path, router] = [usePathname(), useRouter()];

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (storedToken) {
      setToken(decriptValue(storedToken));
    } else {
      setToken(null);
    }

    if (refreshToken && !storedToken) {
      handleRefreshToken({ refreshToken: decriptValue(refreshToken) });
    }
  }, [path]);

  useEffect(() => {
    if (!token && !Cookies.get("accessToken") && !Cookies.get("refreshToken")) {
      router?.push("/");
    } else {
      if (path === "/") {
        router?.push("/home");
      }
    }
  }, [token]);

  const handleLogin = async (
    data: ILogin,
    reset: UseFormReset<ILogin>
  ): Promise<void> => {
    toast
      .promise(
        async () => {
          const {
            accessToken,
            accessTokenExpiresIn,
            refreshToken,
            refreshTokenExpiresIn,
          } = await loginService(data);

          const accessExpiresIn = new Date();
          accessExpiresIn.setSeconds(
            accessExpiresIn.getSeconds() + accessTokenExpiresIn
          );

          Cookies.set("accessToken", encriptValue(accessToken), {
            expires: accessExpiresIn,
          });

          const refreshExpiresIn = new Date();
          refreshExpiresIn.setSeconds(
            refreshExpiresIn.getSeconds() + refreshTokenExpiresIn
          );

          Cookies.set("refreshToken", encriptValue(refreshToken), {
            expires: refreshExpiresIn,
          });

          setToken(accessToken);
        },
        {
          loading: "Logando...",
          success: "Usuário logado com sucesso!",
          error: "Email ou senha incorretos!",
        },
        { id: "login" }
      )
      .finally(() => reset());
  };

  const handleRefreshToken = async (data: IRefreshToken): Promise<void> => {
    try {
      const { accessToken, accessTokenExpiresIn } =
        await refreshTokenService(data);

      const accessExpiresIn = new Date();
      accessExpiresIn.setSeconds(
        accessExpiresIn.getSeconds() + accessTokenExpiresIn
      );

      Cookies.set("accessToken", encriptValue(accessToken), {
        expires: accessExpiresIn,
      });

      setToken(accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = (): void => {
    setToken(null);

    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        handleLogout,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
