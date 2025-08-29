"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import refreshTokenService from "@/services/auth/refreshToken.service";
import loginService from "@/services/auth/login.service";
import findLoggedUser from "@/services/users/findLoggedUser.service";
import sendRecoveryEmail from "@/services/auth/sendRecoveryEmail.service";
import setNewPassword from "@/services/auth/newPassword.service";
import acceptTerms from "@/services/auth/acceptTerms.service";

import { decriptValue, encriptValue } from "@/utils/encryption.utils";

import { noAuthRoutes, routeLinks, RouteType } from "@/constants/routes";
import { UserRole } from "@/constants/users";
import { IRouteLinks } from "@/constants/routes/interfaces";

import {
  IAuthContext,
  IProps,
  ILogin,
  INewPassowrd,
  IRecovery,
  IRefreshToken,
  ILoggedUser,
} from "./interfaces";

export const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: IProps) => {
  const [path, navigate] = [usePathname(), useRouter()];

  const [token, setToken] = useState<string | null>(null);
  const [loggedUser, setLoggedUser] = useState<ILoggedUser | null>(null);
  const [headerRoutes, setHeaderRoutes] = useState<IRouteLinks[] | null>(null);
  const [termsModal, setTermsModal] = useState<boolean>(false);

  useEffect(() => {
    const toaster = document.querySelector("#_rht_toaster");

    if (toaster) toaster.addEventListener("click", () => toast.dismiss());
  }, []);

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
    if (!loggedUser) return;

    if (!token && !Cookies.get("accessToken") && !Cookies.get("refreshToken")) {
      if (!noAuthRoutes.includes(path)) navigate.push("/");
    } else {
      if (path === "/") {
        if (loggedUser.role !== "ADMIN") {
          navigate?.push("/chat");
        } else {
          navigate?.push("/home");
        }
      }
    }
  }, [token, loggedUser]);

  useEffect(() => {
    if (token && Cookies.get("accessToken")) handleLoggedUser();

    if (!token && !Cookies.get("accessToken")) setLoggedUser(null);
  }, [token]);

  useEffect(() => {
    if (loggedUser) {
      setHeaderRoutes(
        routeLinks.filter((route) =>
          loggedUser.role !== "ADMIN" ? route.routeType !== "ADMIN" : route
        )
      );
    }
  }, [loggedUser]);

  useEffect(() => {
    if (!headerRoutes) return;

    if (!loggedUser || loggedUser.role === UserRole.ADMIN) return;

    const routeFound = routeLinks.find(
      ({ href }) => path === href || path.includes(href)
    );

    if (!routeFound) return;

    if (routeFound.routeType === RouteType.ADMIN) {
      toast.error("Você não tem permissão para acessar essa página!", {
        id: "no-permission",
      });

      navigate.push("/home");

      return;
    }

    if (path.split("/").length > 2) {
      toast.error("Você não tem permissão para acessar essa página!", {
        id: "no-permission",
      });

      navigate.push("/home");

      return;
    }

    return;
  }, [headerRoutes, path, loggedUser]);

  useEffect(() => {
    if (loggedUser && !loggedUser.acceptedTerms) {
      setTermsModal(true);

      navigate.push("/home");
    }
  }, [loggedUser, path]);

  const handleLogin = async (
    data: ILogin,
    reset: UseFormReset<ILogin>
  ): Promise<void> => {
    await toast
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

  const handleLoggedUser = async (): Promise<void> => {
    try {
      const user = await findLoggedUser();

      setLoggedUser(user);
    } catch (err) {
      console.error(err);
    }
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
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = (): void => {
    setToken(null);

    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("sessionId");
  };

  const handleSendRecoveryEmail = async (
    data: IRecovery,
    reset: UseFormReset<IRecovery>
  ): Promise<void> => {
    await toast
      .promise(
        async () => {
          await sendRecoveryEmail(data);
        },
        {
          loading: "Enviando Email...",
          success: "Email enviado com sucesso. Verifique sua caixa de entrada!",
          error: "Email incorreto!",
        },
        { id: "email-recovery" }
      )
      .finally(() => reset());
  };

  const handleNewPassword = async (
    { password, confirmPassword }: INewPassowrd,
    hash: string,
    reset: UseFormReset<INewPassowrd>
  ): Promise<void> => {
    if (password !== confirmPassword) {
      toast.error("As senhas devem ser iguais!", { id: "new-password" });

      return;
    }

    await toast
      .promise(
        async () => {
          await setNewPassword({ password, token: hash });
        },
        {
          loading: "Definindo nova senha...",
          success: "Nova senha definida com sucesso!",
          error: "Token expirado!",
        },
        { id: "new-password" }
      )
      .finally(() => {
        reset();

        navigate.push("/");
      });
  };

  const handleAcceptTerms = async (): Promise<void> => {
    try {
      await acceptTerms();

      setTermsModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        handleLogout,
        handleLogin,
        handleSendRecoveryEmail,
        handleNewPassword,
        loggedUser,
        headerRoutes,
        termsModal,
        handleAcceptTerms,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
