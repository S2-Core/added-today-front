"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { IAuthContext, IAuthProps } from "./interfaces";

export const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: IAuthProps) => {
  const [path, router] = [usePathname(), useRouter()];

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("AuthToken");

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
    if (!token && !Cookies.get("AuthToken")) {
      router?.push("/");
    }
  }, [token]);

  const logout = () => {
    setToken(null);

    Cookies.remove("AuthToken");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
