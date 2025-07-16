"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import refreshTokenService from "@/services/auth/refreshToken.service";
import loginService from "@/services/auth/login.service";

import { IAuthContext, IAuthProps, ILogin, IRefreshToken } from "./interfaces";

export const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: IAuthProps) => {
  const [path, router] = [usePathname(), useRouter()];

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (storedToken) {
      setToken(storedToken);
    } else {
      setToken(null);
    }

    if (refreshToken && !storedToken) {
      handleRefreshToken({ refreshToken });
    }
  }, [path]);

  useEffect(() => {
    if (!token && !Cookies.get("accessToken")) {
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
          const { accessToken, refreshToken } = await loginService(data);

          const fifiteenMinutesLater = new Date();
          fifiteenMinutesLater.setMinutes(
            fifiteenMinutesLater.getMinutes() + 15
          );

          const weekLater = new Date();
          weekLater.setDate(weekLater.getDate() + 7);

          const test = 1;

          Cookies.set("accessToken", accessToken, {
            expires: test ?? fifiteenMinutesLater,
          });

          Cookies.set("refreshToken", refreshToken, {
            expires: weekLater,
          });

          setToken(accessToken);
        },
        {
          loading: "Logando...",
          success: "Usuário logado com sucesso!",
          error: "Email ou senha incorretos!",
        }
      )
      .finally(() => reset());
  };

  const handleRefreshToken = async (data: IRefreshToken) => {
    try {
      const { accessToken } = await refreshTokenService(data);

      setToken(accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = (): void => {
    setToken(null);

    Cookies.remove("accessToken");
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
