"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import findAllUIPlans from "@/services/billings/findAllUIPlans.service";
import startCheckout from "@/services/billings/startCheckout.service";

import {
  IBillingsContext,
  IProps,
  IStartCheckoutBody,
  IStartCheckoutResponse,
  IUIPlan,
} from "./interfaces";

export const BillingsContext = createContext({} as IBillingsContext);

const BillingsProvider = ({ children }: IProps) => {
  const [path] = [usePathname()];

  const [allUIPlans, setAllUIPlans] = useState<IUIPlan[] | null>(null);

  useEffect(() => {
    handleFindAllUIPlans();
  }, [path]);

  const handleFindAllUIPlans = async (): Promise<void> => {
    try {
      const plans = await findAllUIPlans();

      setAllUIPlans(plans);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartCheckout = async (
    data: IStartCheckoutBody,
  ): Promise<IStartCheckoutResponse | void> => {
    try {
      const checkout = await startCheckout(data);

      return checkout;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BillingsContext.Provider
      value={{ allUIPlans, handleFindAllUIPlans, handleStartCheckout }}
    >
      {children}
    </BillingsContext.Provider>
  );
};

export default BillingsProvider;
