import type {
  IAnalyticsUserContext,
  IAnalyticsUserIdentity,
} from "@/contexts/analytics/interfaces";
import {
  AuthMeResponse,
  ICreateBaseEventPropertiesParams,
  UserPlanResponse,
} from "./interfaces";
import { IUser } from "@/contexts/users/interfaces";
import { ILoggedUser, IUserCurrentPlan } from "@/contexts/auth/interfaces";
import { IPaymentMethod } from "@/app/register/_client";

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
): IAnalyticsUserIdentity => ({
  userId: user.id,
  name: user.name,
  email: user.email,
});

export const mapAuthMeToAnalyticsContext = (
  user: AuthMeResponse,
): IAnalyticsUserContext => ({
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
): IAnalyticsUserContext => {
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

export const mapRegisterPageViewedEventProperties = (path?: string) => ({
  ...createBaseEventProperties({
    path,
    feature: "auth",
    screen: "register",
    routeName: "register",
    timestamp: true,
  }),
});

export const mapRegisterStartedEventProperties = (path?: string) => ({
  ...createBaseEventProperties({
    path,
    feature: "auth",
    screen: "register",
    routeName: "register",
    timestamp: true,
  }),
  form: "register",
});

export const mapRegisterFormSubmittedEventProperties = (path?: string) => ({
  ...createBaseEventProperties({
    path,
    feature: "auth",
    screen: "register",
    routeName: "register",
    timestamp: true,
  }),
  form: "register",
});

export const mapValidationFailedEventProperties = ({
  path,
  screen,
  routeName,
  form,
  invalidFields,
}: {
  path?: string;
  screen: string;
  routeName: string;
  form: string;
  invalidFields: string[];
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "auth",
    screen,
    routeName,
    timestamp: true,
  }),
  form,
  errorType: "validation",
  invalidFields,
  invalidFieldsCount: invalidFields.length,
});

export const mapLoginPageViewedEventProperties = (path?: string) => ({
  ...createBaseEventProperties({
    path,
    feature: "auth",
    screen: "login",
    routeName: "login",
    timestamp: true,
  }),
});

export const mapLoginStartedEventProperties = (path?: string) => ({
  ...createBaseEventProperties({
    path,
    feature: "auth",
    screen: "login",
    routeName: "login",
    timestamp: true,
  }),
  form: "login",
});

export const mapLoginFormSubmittedEventProperties = (path?: string) => ({
  ...createBaseEventProperties({
    path,
    feature: "auth",
    screen: "login",
    routeName: "login",
    timestamp: true,
  }),
  form: "login",
});

export const mapPasswordResetPageViewedEventProperties = (path?: string) => ({
  ...createBaseEventProperties({
    path,
    feature: "auth",
    screen: "password_reset",
    routeName: "password_reset",
    timestamp: true,
  }),
});

export const mapPasswordResetRequestedEventProperties = (path?: string) => ({
  ...createBaseEventProperties({
    path,
    feature: "auth",
    screen: "password_reset_request",
    routeName: "password_reset_request",
    timestamp: true,
  }),
  form: "password_reset_request",
});

export const mapPasswordResetSubmittedEventProperties = (path?: string) => ({
  ...createBaseEventProperties({
    path,
    feature: "auth",
    screen: "password_reset_submit",
    routeName: "password_reset_submit",
    timestamp: true,
  }),
  form: "password_reset_submit",
});

export const mapTermsModalViewedEventProperties = (
  userId?: string,
  path?: string,
) => ({
  ...createBaseEventProperties({
    path,
    feature: "auth",
    screen: "terms_modal",
    routeName: "terms_modal",
    userId,
    timestamp: true,
  }),
});

export const mapTermsAcceptedClickedEventProperties = (
  userId?: string,
  path?: string,
) => ({
  ...createBaseEventProperties({
    path,
    feature: "auth",
    screen: "terms_modal",
    routeName: "terms_modal",
    userId,
    timestamp: true,
  }),
});

export const mapPlansViewedEventProperties = ({
  path,
  user,
  currentPlanCode,
  isFounder,
  visiblePlanCodes,
  hasIntroPriceEligible,
  surface,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  currentPlanCode?: string | null;
  isFounder?: boolean | null;
  visiblePlanCodes: string[];
  hasIntroPriceEligible: boolean;
  surface: "public_pricing" | "authenticated_billing";
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "billing",
    screen: "plans",
    routeName: "plans",
    userId: user?.id,
    planCode: currentPlanCode ?? null,
    isFounder: isFounder ?? user?.isFounder ?? undefined,
    timestamp: true,
  }),
  currentPlanCode,
  plansCount: visiblePlanCodes.length,
  visiblePlanCodes,
  hasIntroPriceEligible,
  surface,
});

export const mapUpgradeCtaClickedEventProperties = ({
  path,
  user,
  currentPlanCode,
  targetPlanCode,
  ctaAction,
  ctaLabel,
  introPriceEligible,
  surface,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  currentPlanCode?: string | null;
  targetPlanCode?: string | null;
  ctaAction?: string | null;
  ctaLabel?: string | null;
  introPriceEligible?: boolean;
  surface: "public_pricing" | "authenticated_billing";
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "billing",
    screen: "plans",
    routeName: "plans",
    userId: user?.id,
    planCode: currentPlanCode ?? null,
    isFounder: user?.isFounder ?? undefined,
    timestamp: true,
  }),
  currentPlanCode,
  targetPlanCode,
  ctaAction,
  ctaLabel,
  introPriceEligible: Boolean(introPriceEligible),
  surface,
});

export const mapCheckoutStartedEventProperties = ({
  path,
  user,
  currentPlanCode,
  planCode,
  provider,
  mode,
  method,
  subscriptionId,
  paymentId,
  providerOrderId,
  hasPaymentUrl,
  hasPixQrCode,
  surface,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  currentPlanCode?: string | null;
  planCode?: string | null;
  provider?: string | null;
  mode?: string | null;
  method?: IPaymentMethod | null;
  subscriptionId?: string | null;
  paymentId?: string | null;
  providerOrderId?: string | null;
  hasPaymentUrl?: boolean;
  hasPixQrCode?: boolean;
  surface: "public_pricing" | "authenticated_billing";
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "billing",
    screen: "checkout",
    routeName: "checkout",
    userId: user?.id,
    planCode: currentPlanCode ?? null,
    isFounder: user?.isFounder ?? undefined,
    timestamp: true,
  }),
  currentPlanCode,
  targetPlanCode: planCode ?? null,
  provider: provider ?? null,
  mode: mode ?? null,
  method: method ?? null,
  subscriptionId: subscriptionId ?? null,
  paymentId: paymentId ?? null,
  providerOrderId: providerOrderId ?? null,
  hasPaymentUrl: Boolean(hasPaymentUrl),
  hasPixQrCode: Boolean(hasPixQrCode),
  surface,
});

export const mapBillingViewedEventProperties = ({
  path,
  user,
  billing,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  billing?: {
    currentPlan?: {
      code?: string | null;
      interval?: string | null;
    } | null;
    subscription?: {
      status?: string | null;
      provider?: string | null;
      cancelAtPeriodEnd?: boolean | null;
    } | null;
  } | null;
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "billing",
    screen: "billing",
    routeName: "billing",
    userId: user?.id,
    planCode: billing?.currentPlan?.code ?? null,
    isFounder: user?.isFounder ?? undefined,
    timestamp: true,
  }),
  planCode: billing?.currentPlan?.code ?? null,
  planInterval: billing?.currentPlan?.interval ?? null,
  subscriptionStatus: billing?.subscription?.status ?? null,
  subscriptionProvider: billing?.subscription?.provider ?? null,
  cancelAtPeriodEnd: Boolean(billing?.subscription?.cancelAtPeriodEnd),
});

export const mapPaywallViewedEventProperties = ({
  path,
  user,
  currentPlanCode,
  feature,
  requiredPlan,
  surface,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  currentPlanCode?: string | null;
  feature?: string;
  requiredPlan?: string | null;
  surface: "modal" | "feature_block" | "pricing_prompt";
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "paywall",
    screen: "paywall",
    routeName: "paywall",
    userId: user?.id,
    planCode: currentPlanCode ?? null,
    isFounder: user?.isFounder ?? undefined,
    timestamp: true,
  }),
  currentPlanCode,
  requiredPlan,
  feature,
  surface,
});

export const mapFeatureBlockedByPlanEventProperties = ({
  path,
  user,
  feature,
  currentPlanCode,
  requiredPlan,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  feature: string;
  currentPlanCode?: string | null;
  requiredPlan?: string | null;
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "paywall",
    screen: "feature_block",
    routeName: "feature_block",
    userId: user?.id,
    planCode: currentPlanCode ?? null,
    isFounder: user?.isFounder ?? undefined,
    timestamp: true,
  }),
  feature,
  currentPlanCode,
  requiredPlan,
});

export const mapFreeLimitReachedEventProperties = ({
  path,
  user,
  feature,
  currentUsage,
  limitValue,
  currentPlanCode,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  feature: string;
  currentUsage?: number;
  limitValue?: number;
  currentPlanCode?: string | null;
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "paywall",
    screen: "limit_reached",
    routeName: "limit_reached",
    userId: user?.id,
    planCode: currentPlanCode ?? null,
    isFounder: user?.isFounder ?? undefined,
    timestamp: true,
  }),
  feature,
  currentUsage,
  limitValue,
  currentPlanCode,
});

export const mapCancelFlowStartedEventProperties = ({
  path,
  user,
  userPlan,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  userPlan?: {
    currentPlan?: { code?: string | null; interval?: string | null };
    subscription?: { status?: string | null };
  } | null;
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "billing",
    screen: "cancel_flow",
    routeName: "cancel_flow",
    userId: user?.id,
    planCode: userPlan?.currentPlan?.code ?? null,
    isFounder: user?.isFounder ?? undefined,
    timestamp: true,
  }),
  currentPlanCode: userPlan?.currentPlan?.code ?? null,
  planInterval: userPlan?.currentPlan?.interval ?? null,
  subscriptionStatus: userPlan?.subscription?.status ?? null,
});

export const mapCancelFlowAbandonedEventProperties = ({
  path,
  user,
  userPlan,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  userPlan?: {
    currentPlan?: { code?: string | null; interval?: string | null };
    subscription?: { status?: string | null };
  } | null;
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "billing",
    screen: "cancel_flow",
    routeName: "cancel_flow",
    userId: user?.id,
    planCode: userPlan?.currentPlan?.code ?? null,
    isFounder: user?.isFounder ?? undefined,
    timestamp: true,
  }),
  currentPlanCode: userPlan?.currentPlan?.code ?? null,
  planInterval: userPlan?.currentPlan?.interval ?? null,
  subscriptionStatus: userPlan?.subscription?.status ?? null,
  reason: "modal_closed",
});

export const mapCampaignPageViewedEventProperties = ({
  path,
  user,
  userPlan,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  userPlan?: {
    currentPlan?: {
      code?: string | null;
      interval?: string | null;
    } | null;
    subscription?: {
      status?: string | null;
      provider?: string | null;
      cancelAtPeriodEnd?: boolean | null;
    } | null;
  } | null;
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "campaigns",
    screen: "campaigns",
    routeName: "campaigns",
    userId: user?.id,
    planCode: userPlan?.currentPlan?.code ?? null,
    isFounder: user?.isFounder ?? undefined,
    timestamp: true,
  }),
  currentPlanCode: userPlan?.currentPlan?.code ?? null,
  planInterval: userPlan?.currentPlan?.interval ?? null,
  subscriptionStatus: userPlan?.subscription?.status ?? null,
  subscriptionProvider: userPlan?.subscription?.provider ?? null,
  cancelAtPeriodEnd: Boolean(userPlan?.subscription?.cancelAtPeriodEnd),
});

export const mapQuotationPageViewedEventProperties = ({
  path,
  user,
  userPlan,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  userPlan?: {
    currentPlan?: { code?: string | null; interval?: string | null } | null;
    subscription?: { status?: string | null } | null;
  } | null;
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "quotations",
    screen: "quotation_page",
    routeName: "quotations",
    userId: user?.id,
    planCode: userPlan?.currentPlan?.code ?? null,
    isFounder: user?.isFounder ?? undefined,
    timestamp: true,
  }),
  currentPlanCode: userPlan?.currentPlan?.code ?? null,
  planInterval: userPlan?.currentPlan?.interval ?? null,
  subscriptionStatus: userPlan?.subscription?.status ?? null,
});

export const mapQuotationStartedEventProperties = (path?: string) => ({
  ...createBaseEventProperties({
    path,
    feature: "quotations",
    screen: "quotation_form",
    routeName: "quotations",
    timestamp: true,
  }),
});

export const mapQuotationSubmittedEventProperties = ({
  path,
  user,
  userPlan,
  quotationType,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  userPlan?: {
    currentPlan?: { code?: string | null } | null;
  } | null;
  quotationType?: string;
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "quotations",
    screen: "quotation_form",
    routeName: "quotations",
    userId: user?.id,
    planCode: userPlan?.currentPlan?.code ?? null,
    isFounder: user?.isFounder ?? undefined,
    timestamp: true,
  }),
  quotationType,
});

export const mapQuotationValidationFailedEventProperties = ({
  path,
  user,
  userPlan,
  invalidFields,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  userPlan?: {
    currentPlan?: { code?: string | null } | null;
  } | null;
  invalidFields?: string[];
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "quotations",
    screen: "quotation_form",
    routeName: "quotations",
    userId: user?.id,
    planCode: userPlan?.currentPlan?.code ?? null,
    isFounder: user?.isFounder ?? undefined,
    timestamp: true,
  }),
  form: "quotation",
  errorType: "validation",
  invalidFields,
});

export const mapInsightsPageViewedEventProperties = ({
  path,
  user,
  userPlan,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  userPlan?: {
    currentPlan?: { code?: string | null; interval?: string | null } | null;
    subscription?: { status?: string | null } | null;
  } | null;
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "insights",
    screen: "insights_page",
    routeName: "insights",
    userId: user?.id,
    planCode: userPlan?.currentPlan?.code ?? null,
    isFounder: user?.isFounder ?? undefined,
    timestamp: true,
  }),
  currentPlanCode: userPlan?.currentPlan?.code ?? null,
  planInterval: userPlan?.currentPlan?.interval ?? null,
  subscriptionStatus: userPlan?.subscription?.status ?? null,
});

export const mapInsightsConfigStartedEventProperties = (path?: string) => ({
  ...createBaseEventProperties({
    path,
    feature: "insights",
    screen: "insights_config",
    routeName: "insights",
    timestamp: true,
  }),
});

export const mapInsightsConfigSubmittedEventProperties = ({
  path,
  user,
  userPlan,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  userPlan?: {
    currentPlan?: { code?: string | null } | null;
  } | null;
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "insights",
    screen: "insights_config",
    routeName: "insights",
    userId: user?.id,
    planCode: userPlan?.currentPlan?.code ?? null,
    isFounder: user?.isFounder ?? undefined,
    timestamp: true,
  }),
});

export const mapInsightsValidationFailedEventProperties = ({
  path,
  user,
  userPlan,
  invalidFields,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  userPlan?: {
    currentPlan?: { code?: string | null } | null;
  } | null;
  invalidFields?: string[];
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "insights",
    screen: "insights_config",
    routeName: "insights",
    userId: user?.id,
    planCode: userPlan?.currentPlan?.code ?? null,
    isFounder: user?.isFounder ?? undefined,
    timestamp: true,
  }),
  form: "insights",
  errorType: "validation",
  invalidFields,
});

export const mapChatPageViewedEventProperties = ({
  path,
  user,
  userPlan,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  userPlan?: {
    currentPlan?: { code?: string | null; interval?: string | null } | null;
    subscription?: { status?: string | null } | null;
  } | null;
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "chat",
    screen: "chat_page",
    routeName: "chat",
    userId: user?.id,
    planCode: userPlan?.currentPlan?.code ?? null,
    isFounder: user?.isFounder ?? undefined,
    timestamp: true,
  }),
  currentPlanCode: userPlan?.currentPlan?.code ?? null,
  planInterval: userPlan?.currentPlan?.interval ?? null,
  subscriptionStatus: userPlan?.subscription?.status ?? null,
});

export const mapChatStartedEventProperties = (path?: string) => ({
  ...createBaseEventProperties({
    path,
    feature: "chat",
    screen: "chat",
    routeName: "chat",
    timestamp: true,
  }),
});

export const mapChatUserMessageSentEventProperties = ({
  path,
  user,
  userPlan,
  messageLength,
  message,
}: {
  path?: string;
  user?: { id?: string; isFounder?: boolean | null } | null;
  userPlan?: {
    currentPlan?: { code?: string | null } | null;
  } | null;
  messageLength?: number;
  message?: string;
}) => ({
  ...createBaseEventProperties({
    path,
    feature: "chat",
    screen: "chat",
    routeName: "chat",
    userId: user?.id,
    planCode: userPlan?.currentPlan?.code ?? null,
    isFounder: user?.isFounder ?? undefined,
    timestamp: true,
  }),
  message,
  messageLength,
});
