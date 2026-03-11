import { ReactNode } from "react";

import { CheckoutMode } from "@/validators/checkouts/checkout.validator";

import { IPlan } from "../auth/interfaces";

export type IUIPlan = Omit<
  IPlan,
  "id" | "planEntitlements" | "description" | "isActive"
> & {
  isCurrentPlan: boolean;
  cta: { label: string; action: "SUBSCRIBE_PRO" | "MANAGE" | "CURRENT" };
  introPriceEligible: boolean;
  introPriceCents: number | null;
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
    }[];
  }[];
  footer: { priceNote: string; badge: string };
};

export interface IStartCheckoutBody {
  planCode: "FREE" | "PRO";
  mode: CheckoutMode;
  method: Omit<IPaymentMethod, null>;
  customerTaxId: string;
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
  mode: CheckoutMode;
  customerTaxId: string;
}

export type ICardCheckout = IPixCheckout & {
  cardEncrypted: string;
};

export interface IProps {
  children: ReactNode;
}

export interface IBillingsContext {
  allUIPlans: IUIPlan[] | null;
  handleFindAllUIPlans: () => Promise<void>;
  handleStartCheckout: (
    data: IStartCheckoutBody,
  ) => Promise<IStartCheckoutResponse | void>;
}
