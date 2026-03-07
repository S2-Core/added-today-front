import type {
  AnalyticsUserContext,
  AnalyticsUserIdentity,
} from "@/contexts/analytics/interface";

import { AuthMeResponse, UserPlanResponse } from "./interface";
import { IUser } from "@/contexts/users/interfaces";
import { ILoggedUser, IUserCurrentPlan } from "@/contexts/auth/interfaces";

export const ANALYTICS_EVENTS = {
  SIGNUP_CREATED: "signup_created",
  LOGIN_COMPLETED: "login_completed",
  LOGOUT_COMPLETED: "logout_completed",
  PLANS_VIEWED: "plans_viewed",
  CHECKOUT_STARTED: "checkout_started",
  CHECKOUT_COMPLETED: "checkout_completed",
  SUBSCRIPTION_CANCELLED: "subscription_cancelled",
  USER_STATE_CHANGED: "user_state_changed",
  USERPLAN_VIEWED: "userPlan_viewed",
  ONBOARDING_STARTED: "onboarding_started",
  ONBOARDING_COMPLETED: "onboarding_completed",
  PASSWORD_RESET_REQUESTED: "password_reset_requested",
  PASSWORD_RESET_COMPLETED: "password_reset_completed",
  TERMS_ACCEPTED: "terms_accepted",
  PROFILE_UPDATED: "profile_updated",
  PASSWORD_CHANGED: "password_changed",
} as const;

export const mapAuthMeToAnalyticsIdentity = (
  user: AuthMeResponse,
): AnalyticsUserIdentity => ({
  userId: user.id,
  name: user.name,
  email: user.email,
});

export const mapAuthMeToAnalyticsContext = (
  user: AuthMeResponse,
): AnalyticsUserContext => ({
  role: user.role,
  phone: user.phone,
  acceptedTerms: user.acceptedTerms,
  termsAcceptedAt: user.termsAcceptedAt ?? null,
  isFounder: user.isFounder,
  instagramHandle: user.instagramHandle ?? null,
  tiktokHandle: user.tiktokHandle ?? null,
  youtubeHandle: user.youtubeHandle ?? null,
  contentTopic: user.contentTopic ?? null,
});

export const mapUserPlanToAnalyticsContext = (
  userPlan?: UserPlanResponse | null,
): AnalyticsUserContext => {
  const { currentPlan, subscription } = userPlan ?? {
    currentPlan: null,
    subscription: null,
  };

  const planCode = currentPlan?.code ?? null;
  const planName = currentPlan?.name ?? null;
  const planInterval = currentPlan?.interval ?? null;
  const subscriptionStatus = subscription?.status ?? null;
  const subscriptionProvider = subscription?.provider ?? null;
  const cancelAtPeriodEnd = Boolean(subscription?.cancelAtPeriodEnd);
  const hasActiveSubscription =
    subscriptionStatus === "ACTIVE" || subscriptionStatus === "TRIALING";

  return {
    planCode,
    planName,
    planInterval,
    subscriptionStatus,
    subscriptionProvider,
    cancelAtPeriodEnd,
    hasActiveSubscription,
    hasScheduledCancellation: cancelAtPeriodEnd,
  };
};

export const mapSignupEventProperties = (user: IUser) => ({
  userId: user.id,
  email: user.email,
  role: user.role,
  isFounder: user.isFounder,
  instagramHandle: user.instagramHandle,
  contentTopic: user.contentTopic,
});

export const mapLoginEventProperties = (
  user: ILoggedUser,
  userPlan?: IUserCurrentPlan | null,
) => ({
  userId: user.id,
  role: user.role,
  isFounder: user.isFounder,
  hasInstagramHandle: Boolean(user.instagramHandle),
  contentTopic: user.contentTopic,
  planCode: userPlan?.currentPlan?.code ?? undefined,
  subscriptionStatus: userPlan?.subscription?.status ?? undefined,
});

export const mapPasswordResetRequestedProperties = (email: string) => ({
  email,
});

export const mapPasswordResetCompletedProperties = (
  password: string,
  email?: string,
) => ({
  resetMethod: "token",
  hasStrongPassword: password.length >= 8,
  email,
});

export const hasInstagramHandle = (value?: string | null): boolean =>
  Boolean(value?.trim());

export const hasTiktokHandle = (value?: string | null): boolean =>
  Boolean(value?.trim());

export const hasYoutubeHandle = (value?: string | null): boolean =>
  Boolean(value?.trim());

export const isOnboardingCompleted = (
  user?: Partial<ILoggedUser | IUser> | null,
): boolean =>
  Boolean(
    user?.acceptedTerms &&
    hasInstagramHandle(user?.instagramHandle) &&
    user?.contentTopic?.trim(),
  );

export const mapTermsAcceptedEventProperties = (
  user: ILoggedUser,
  userPlan?: IUserCurrentPlan | null,
) => ({
  userId: user.id,
  acceptedTerms: user.acceptedTerms,
  termsAcceptedAt: user.termsAcceptedAt,
  role: user.role,
  isFounder: user.isFounder,
  planCode: userPlan?.currentPlan?.code,
});

export const mapProfileUpdatedEventProperties = (
  user: ILoggedUser | IUser,
  userPlan?: IUserCurrentPlan | null,
) => ({
  userId: user.id,
  role: user.role,
  isFounder: user.isFounder,
  hasInstagramHandle: Boolean(user.instagramHandle?.trim()),
  hasTiktokHandle: Boolean(user.tiktokHandle?.trim()),
  hasYoutubeHandle: Boolean(user.youtubeHandle?.trim()),
  contentTopic: user.contentTopic ?? undefined,
  acceptedTerms: Boolean(user.termsAcceptedAt),
  termsAcceptedAt: user.termsAcceptedAt ?? undefined,
  planCode: userPlan?.currentPlan?.code ?? undefined,
});

export const mapPasswordChangedEventProperties = (
  user: ILoggedUser,
  userPlan?: IUserCurrentPlan | null,
) => ({
  userId: user.id,
  role: user.role,
  isFounder: user.isFounder,
  planCode: userPlan?.currentPlan?.code ?? undefined,
});

export const mapOnboardingCompletedEventProperties = (
  user: ILoggedUser | IUser,
  userPlan?: IUserCurrentPlan | null,
) => ({
  userId: user.id,
  role: user.role,
  isFounder: user.isFounder,
  acceptedTerms: Boolean(user.termsAcceptedAt),
  termsAcceptedAt: user.termsAcceptedAt ?? undefined,
  hasInstagramHandle: hasInstagramHandle(user.instagramHandle),
  hasTiktokHandle: hasTiktokHandle(user.tiktokHandle),
  hasYoutubeHandle: hasYoutubeHandle(user.youtubeHandle),
  contentTopic: user.contentTopic ?? undefined,
  planCode: userPlan?.currentPlan?.code ?? undefined,
  subscriptionStatus: userPlan?.subscription?.status ?? undefined,
});

const getOnboardingCompletedStorageKey = (userId: string) =>
  `analytics:onboarding_completed:${userId}`;

export const hasTrackedOnboardingCompleted = (userId: string): boolean => {
  if (typeof window === "undefined") return false;

  return localStorage.getItem(getOnboardingCompletedStorageKey(userId)) === "1";
};

export const markOnboardingCompletedTracked = (userId: string): void => {
  if (typeof window === "undefined") return;

  localStorage.setItem(getOnboardingCompletedStorageKey(userId), "1");
};
