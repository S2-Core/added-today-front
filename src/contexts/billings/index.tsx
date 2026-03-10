"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import findAllUIPlans from "@/services/auth/findAllUIPlans.service";

import { IBillingsContext, IProps, IUIPlan } from "./interfaces";

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

  return (
    <BillingsContext.Provider value={{ allUIPlans, handleFindAllUIPlans }}>
      {children}
    </BillingsContext.Provider>
  );
};

export default BillingsProvider;
