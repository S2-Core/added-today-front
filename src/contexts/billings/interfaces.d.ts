import { Dispatch, ReactNode, SetStateAction } from "react";

import { CheckoutMode } from "@/validators/checkouts/checkout.validator";

import { IPlan } from "../auth/interfaces";
import { IPaymentMethod } from "@/app/register/_client";

export type IUIPlan = Omit<
  IPlan,
  "id" | "planEntitlements" | "description" | "isActive"
> & {
  isCurrentPlan: boolean;
  cta: { label: string; action: "SUBSCRIBE_PRO" | "MANAGE" | "CURRENT" };
  introPriceEligible: boolean;
  introPriceCents: number | null;
  introPriceCycles: number | null;
  introOfferTitle: string | null;
  introOfferMessage: string | null;
  introOfferValidUntil: string | null;
  header: { title: string; subtitle: string };
  sections: {
    title: string;
    items: {
      key: "LAILA_INTERACTIONS" | "QUOTATIONS" | "INSIGHTS" | "OPPORTUNITIES";
      icon: string;
      title: string;
      description: string;
      limit: number | null;
      period: "DAY" | "WEEK" | "MONTH" | "YEAR" | null;
      displayLimit: string | null;
      showBadge?: boolean;
    }[];
  }[];
  footer: { priceNote: string; badge: string };
};

export interface IStartCheckoutBody {
  planCode: "FREE" | "PRO";
  mode: CheckoutMode;
  method: Omit<IPaymentMethod, null>;
  customerTaxId: string;
  couponCode?: string;
  cardEncrypted?: string;
}

export interface IStartCheckoutResponse {
  provider: STRIPE | MERCADOPAGO | PAGARME | PAGBANK;
  planCode: "FREE" | "PRO";
  mode: CheckoutMode;
  method: Omit<IPaymentMethod, null>;
  subscriptionId: string | null;
  paymentId: string | null;
  providerOrderId: string | null;
  pixQrCodeText: string | null;
  pixQrCodeImageUrl: string | null;
  pixExpiresAt: string | null;
  paymentUrl: string | null;
}

export interface IPixCheckout {
  mode?: CheckoutMode | null;
  customerTaxId: string;
}

export type ICardCheckout = IPixCheckout & {
  number: string;
  holder: string;
  expirationDate: string;
  cvv: string;
};

export interface ICheckoutStatusResponse {
  paymentId: string;
  subscriptionId: string | null;
  status: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  providerStatus: string | null;
  providerCode: string | null;
  providerMessage: string | null;
  isTerminal: boolean;
}

export interface IValidateCoupomBody {
  planCode: "FREE" | "PRO";
  couponCode: string;
}

export interface IValidateCoupomResponse {
  valid: boolean;
  couponCode: string;
  couponApplied: boolean;
  message: string | null;
  appliedDiscountSource: "COUPON" | "NONE" | "INTRO_OFFER" | null;
  originalAmountCents: number | null;
  automaticDiscountAmountCents: number | null;
  couponDiscountAmountCents: number | null;
  discountAmountCents: number | null;
  finalAmountCents: number | null;
}

export interface IProps {
  children: ReactNode;
}

export interface IBillingsContext {
  allUIPlans: IUIPlan[] | null;
  handleFindAllUIPlans: () => Promise<void>;
  handleStartCheckout: (
    data: IStartCheckoutBody,
    token?: string | null,
  ) => Promise<IStartCheckoutResponse | void>;
  handlePlanSubscriptionStatus: (
    status: "ACTIVE" | "CANCELED",
    reason?: string,
  ) => Promise<void>;
  handleFindCheckoutStatus: (
    id: string,
    token?: string | null,
  ) => Promise<ICheckoutStatusResponse | void>;
  handleValidateCoupom: (
    body: IValidateCoupomBody,
    token?: string | null,
  ) => Promise<IValidateCoupomResponse | void>;
}
