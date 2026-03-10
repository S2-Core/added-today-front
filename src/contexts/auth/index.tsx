"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import { useAnalytics } from "..";

import refreshTokenService from "@/services/auth/refreshToken.service";
import loginService from "@/services/auth/login.service";
import findLoggedUser from "@/services/auth/findLoggedUser.service";
import sendRecoveryEmail from "@/services/auth/sendRecoveryEmail.service";
import setNewPassword from "@/services/auth/newPassword.service";
import acceptTerms from "@/services/auth/acceptTerms.service";
import registerUser from "@/services/auth/registerUser.service";
import findUserCurrentPlan from "@/services/auth/findUserCurrentPlan.service";

import {
  ANALYTICS_EVENTS,
  hasTrackedOnboardingCompleted,
  isOnboardingCompleted,
  mapAuthMeToAnalyticsContext,
  mapAuthMeToAnalyticsIdentity,
  mapUserPlanToAnalyticsContext,
  mapLoginEventProperties,
  mapOnboardingCompletedEventProperties,
  mapPasswordResetCompletedProperties,
  mapPasswordResetRequestedProperties,
  mapSignupEventProperties,
  mapTermsAcceptedEventProperties,
  markOnboardingCompletedTracked,
} from "@/lib/analytics";

import { noAuthRoutes, routeLinks, RouteType } from "@/constants/routes";
import { UserRole } from "@/constants/users";

import { decriptValue, encriptValue } from "@/utils/encryption.utils";
import { toDaysFromMs } from "@/utils/date.utils";

import { IRouteLinks } from "@/constants/routes/interfaces";
import {
  IAuthContext,
  IProps,
  ILogin,
  INewPassowrd,
  IRecovery,
  IRefreshToken,
  ILoggedUser,
  IRegister,
  IUserCurrentPlan,
  IRegisterResponse,
} from "./interfaces";

export const AuthContext = createContext({} as IAuthContext);

const AuthProvider = ({ children }: IProps) => {
  const [path, navigate] = [usePathname(), useRouter()];

  const { trackEvent, identifyUser, setUserContext, resetAnalyticsUser } =
    useAnalytics();

  const [token, setToken] = useState<string | null>(null);
  const [loggedUser, setLoggedUser] = useState<ILoggedUser | null>(null);
  const [userCurrentPlan, setUserCurrentPlan] =
    useState<IUserCurrentPlan | null>(null);
  const [headerRoutes, setHeaderRoutes] = useState<IRouteLinks[] | null>(null);
  const [termsModal, setTermsModal] = useState<boolean>(false);
  const [isNavigationTabsLoaded, setIsNavigationTabsLoaded] =
    useState<boolean>(false);

  useEffect(() => {
    if (!loggedUser?.id) return;

    identifyUser(mapAuthMeToAnalyticsIdentity(loggedUser));
    setUserContext(mapAuthMeToAnalyticsContext(loggedUser));
  }, [loggedUser, identifyUser, setUserContext]);

  useEffect(() => {
    if (!loggedUser?.id) return;

    setUserContext(mapUserPlanToAnalyticsContext(userCurrentPlan));
  }, [loggedUser?.id, userCurrentPlan, setUserContext]);

  useEffect(() => {
    const hasTokenCookie = Boolean(Cookies.get("token"));
    const hasRefreshTokenCookie = Boolean(Cookies.get("refreshToken"));

    if (token || loggedUser || hasTokenCookie || hasRefreshTokenCookie) return;

    resetAnalyticsUser();
  }, [token, loggedUser, resetAnalyticsUser]);

  useEffect(() => {
    const toaster = document.querySelector(".hot-toast-container");

    if (toaster) toaster.addEventListener("click", () => toast.dismiss());

    return () => {
      if (toaster) toaster.removeEventListener("click", () => toast.dismiss());
    };
  }, []);

  useEffect(() => {
    const storedToken = Cookies.get("token");
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
    if (!token && !Cookies.get("token") && !Cookies.get("refreshToken")) {
      if (!noAuthRoutes.includes(path)) navigate.push("/");
    } else {
      if (path === "/") {
        navigate.push("/campaigns");
      }
    }
  }, [token, loggedUser, path, navigate]);

  useEffect(() => {
    if (token && Cookies.get("token")) handleLoggedUser();

    if (!token && !Cookies.get("token")) setLoggedUser(null);
  }, [token, path]);

  useEffect(() => {
    if (loggedUser) {
      setHeaderRoutes(
        routeLinks.filter((route) =>
          loggedUser.role !== "ADMIN" ? route.routeType !== "ADMIN" : route,
        ),
      );
    } else navigate.push("/");
  }, [loggedUser]);

  useEffect(() => {
    if (!headerRoutes) return;

    if (!loggedUser || loggedUser.role === UserRole.ADMIN) return;

    const routeFound = routeLinks.find(
      ({ href }) => path === href || path.includes(href),
    );

    if (!routeFound) return;

    if (routeFound.routeType === RouteType.ADMIN) {
      toast.error("Você não tem permissão para acessar essa página!", {
        id: "no-permission",
      });

      navigate.push("/campaigns");

      return;
    }

    if (path.split("/").length > 2) {
      toast.error("Você não tem permissão para acessar essa página!", {
        id: "no-permission",
      });

      navigate.push("/campaigns");

      return;
    }

    return;
  }, [headerRoutes, path, loggedUser, userCurrentPlan]);

  useEffect(() => {
    if (loggedUser && !loggedUser.acceptedTerms) {
      setTermsModal(true);

      navigate.push("/campaigns");
    }
  }, [loggedUser, path, navigate]);

  const handleLogin = async (data: ILogin): Promise<void> => {
    await toast.promise(
      async () => {
        const { token, tokenExpiresIn, refreshToken, refreshTokenExpiresIn } =
          await loginService(data);

        Cookies.set("token", encriptValue(token), {
          expires: toDaysFromMs(tokenExpiresIn),
        });

        Cookies.set("refreshToken", encriptValue(refreshToken), {
          expires: toDaysFromMs(refreshTokenExpiresIn),
        });

        setToken(token);

        const sessionData = await handleLoggedUser(false, false);

        if (sessionData?.user) {
          trackEvent(
            ANALYTICS_EVENTS.LOGIN_COMPLETED,
            mapLoginEventProperties(sessionData.user, sessionData.userPlan),
          );
        }

        navigate.push("/campaigns");
      },
      {
        loading: "Logando...",
        success: "Usuário logado com sucesso!",
        error: "Email ou senha incorretos!",
      },
      { id: "login" },
    );
  };

  const handleLoggedUser = async (
    plans = true,
    setUser = true,
  ): Promise<{
    user: ILoggedUser;
    userPlan: IUserCurrentPlan | null;
  } | null> => {
    try {
      const user = await findLoggedUser();

      if (setUser) setLoggedUser(user);

      let userPlan: IUserCurrentPlan | null = null;

      if (plans) userPlan = await handleFindUserCurrentPlan();

      return { user, userPlan };
    } catch (err) {
      console.error(err);
      handleLogout();

      return null;
    }
  };

  const handleFindUserCurrentPlan =
    async (): Promise<IUserCurrentPlan | null> => {
      try {
        const userPlan = await findUserCurrentPlan();

        setUserCurrentPlan(userPlan);

        return userPlan;
      } catch (err) {
        console.error(err);

        return null;
      }
    };

  const handleRefreshToken = async (data: IRefreshToken): Promise<void> => {
    try {
      const { token, tokenExpiresIn } = await refreshTokenService(data);

      const accessExpiresIn = new Date();
      accessExpiresIn.setSeconds(accessExpiresIn.getSeconds() + tokenExpiresIn);

      Cookies.set("token", encriptValue(token), {
        expires: accessExpiresIn,
      });

      setToken(token);
    } catch (err) {
      console.error(err);
      handleLogout();
    }
  };

  const handleLogout = (refresh = false): void => {
    resetAnalyticsUser();

    setToken(null);
    setLoggedUser(null);
    setUserCurrentPlan(null);

    Cookies.remove("token");
    Cookies.remove("sessionId");

    if (refresh) Cookies.remove("refreshToken");
  };

  const handleSendRecoveryEmail = async (data: IRecovery): Promise<void> => {
    await toast.promise(
      async () => {
        await sendRecoveryEmail(data);

        trackEvent(
          ANALYTICS_EVENTS.PASSWORD_RESET_REQUESTED,
          mapPasswordResetRequestedProperties(data.email),
        );
      },
      {
        loading: "Enviando Email...",
        success: "Email enviado com sucesso. Verifique sua caixa de entrada!",
        error: "Email incorreto!",
      },
      { id: "email-recovery" },
    );
  };

  const handleNewPassword = async (
    { password, confirmPassword }: INewPassowrd,
    hash: string,
    reset: UseFormReset<INewPassowrd>,
  ): Promise<void> => {
    if (password !== confirmPassword) {
      toast.error("As senhas devem ser iguais!", { id: "new-password" });

      return;
    }

    try {
      await toast.promise(
        async () => {
          await setNewPassword({ password, token: hash });

          trackEvent(
            ANALYTICS_EVENTS.PASSWORD_RESET_COMPLETED,
            mapPasswordResetCompletedProperties(password),
          );

          reset();

          navigate.push("/");
        },
        {
          loading: "Definindo nova senha...",
          success: "Nova senha definida com sucesso!",
          error: "Token expirado!",
        },
        { id: "new-password" },
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleAcceptTerms = async (): Promise<void> => {
    try {
      await acceptTerms();

      setTermsModal(false);

      const sessionData = await handleLoggedUser(false, false);

      if (!sessionData?.user) return;

      trackEvent(
        ANALYTICS_EVENTS.TERMS_ACCEPTED,
        mapTermsAcceptedEventProperties(sessionData.user, sessionData.userPlan),
      );

      maybeTrackOnboardingCompleted(sessionData.user, sessionData.userPlan);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegisterUser = async (
    data: IRegister,
  ): Promise<IRegisterResponse | void> => {
    try {
      const createdUser = await toast.promise(
        async () => {
          const newUser = await registerUser(data);

          return newUser;
        },
        {
          loading: "Criando usuário...",
          success: "Usuário criado com sucesso!",
          error: "Usuário ja cadastrado!",
        },
        { id: "register" },
      );

      if (!createdUser) return;

      trackEvent(
        ANALYTICS_EVENTS.SIGNUP_CREATED,
        mapSignupEventProperties(createdUser.user),
      );

      return createdUser;
    } catch (error) {
      throw error;
    }
  };

  const maybeTrackOnboardingCompleted = (
    user?: ILoggedUser | null,
    userPlan?: IUserCurrentPlan | null,
  ): void => {
    if (
      !user?.id ||
      !isOnboardingCompleted(user) ||
      hasTrackedOnboardingCompleted(user.id)
    )
      return;

    trackEvent(
      ANALYTICS_EVENTS.ONBOARDING_COMPLETED,
      mapOnboardingCompletedEventProperties(user, userPlan),
    );

    markOnboardingCompletedTracked(user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        handleLogout,
        handleLogin,
        handleSendRecoveryEmail,
        handleNewPassword,
        loggedUser,
        headerRoutes,
        termsModal,
        handleAcceptTerms,
        isNavigationTabsLoaded,
        setIsNavigationTabsLoaded,
        handleRegisterUser,
        handleFindUserCurrentPlan,
        userCurrentPlan,
        handleLoggedUser,
        maybeTrackOnboardingCompleted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
