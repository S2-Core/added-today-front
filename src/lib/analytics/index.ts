import type {
  AnalyticsUserContext,
  AnalyticsUserIdentity,
} from "@/contexts/analytics/interfaces";
import {
  AuthMeResponse,
  ICreateBaseEventPropertiesParams,
  UserPlanResponse,
} from "./interfaces";
import { IUser } from "@/contexts/users/interfaces";
import { ILoggedUser, IUserCurrentPlan } from "@/contexts/auth/interfaces";

export const createBaseEventProperties = ({
  path,
  feature,
  screen,
  routeName,
  userId,
  planCode,
  isFounder,
  timestamp = false,
}: ICreateBaseEventPropertiesParams) => ({
  source: "frontend" as const,
  path,
  feature,
  screen,
  routeName,
  userId,
  planCode,
  isFounder,
  ...(timestamp ? { timestamp: new Date().toISOString() } : {}),
});

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

export const mapProfileUpdatedEventProperties = (
  user: ILoggedUser | IUser,
  userPlan?: IUserCurrentPlan | null,
  path?: string,
) => ({
  ...createBaseEventProperties({
    path,
    feature: "profile",
    screen: "profile",
    routeName: "profile",
    userId: user.id,
    planCode: userPlan?.currentPlan?.code ?? null,
    isFounder: user.isFounder,
    timestamp: true,
  }),
  role: user.role,
  hasInstagramHandle: Boolean(user.instagramHandle?.trim()),
  hasTiktokHandle: Boolean(user.tiktokHandle?.trim()),
  hasYoutubeHandle: Boolean(user.youtubeHandle?.trim()),
  contentTopic: user.contentTopic ?? undefined,
  acceptedTerms: Boolean(user.termsAcceptedAt),
  termsAcceptedAt: user.termsAcceptedAt ?? undefined,
});

export const mapPasswordChangedEventProperties = (
  user: ILoggedUser,
  userPlan?: IUserCurrentPlan | null,
  path?: string,
) => ({
  ...createBaseEventProperties({
    path,
    feature: "profile",
    screen: "profile_security",
    routeName: "profile_security",
    userId: user.id,
    planCode: userPlan?.currentPlan?.code ?? null,
    isFounder: user.isFounder,
    timestamp: true,
  }),
  role: user.role,
});
