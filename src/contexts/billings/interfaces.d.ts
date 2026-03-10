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
}
