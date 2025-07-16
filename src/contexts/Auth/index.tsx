"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

import loginService from "@/services/users/login.service";

import { IAuthContext, IAuthProps, ILogin } from "./interfaces";
import toast from "react-hot-toast";

export const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: IAuthProps) => {
  const [path, router] = [usePathname(), useRouter()];

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("accessToken");

    switch (storedToken) {
      case undefined:
        setToken(null);

        break;
      default:
        setToken(storedToken);

        break;
    }
  }, [path]);

  useEffect(() => {
    if (!token && !Cookies.get("accessToken")) {
      router?.push("/");
    }
  }, [token]);

  const handleLogin = async (data: ILogin): Promise<void> => {
    toast.promise(
      async () => {
        const { accessToken, refreshToken } = await loginService(data);

        Cookies.set("accessToken", accessToken, {
          expires: 0.25,
        });

        Cookies.set("refreshToken", refreshToken, {
          expires: 7,
        });
      },
      {
        loading: "Logando...",
        success: "Usuário logado com sucesso!",
        error: "Email ou senha incorretos!",
      }
    );
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
