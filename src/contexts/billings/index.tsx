"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

import findAllUIPlans from "@/services/billings/findAllUIPlans.service";
import startCheckout from "@/services/billings/startCheckout.service";
import findCheckoutStatus from "@/services/billings/findCkeckoutStatus.service";
import planStatusChange from "@/services/billings/planStatusChange.service";

import {
  IBillingsContext,
  ICheckoutStatusResponse,
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
    token?: string | null,
  ): Promise<IStartCheckoutResponse | void> => {
    const isPIX = data.method === "PIX";

    try {
      const checkout = await toast.promise(
        async () => {
          const checkout = await startCheckout(data, token);

          return checkout;
        },
        {
          loading: `Criando ${isPIX ? "QR Code" : "solicitação"} para o pagamento...`,
          success: `${isPIX ? "QR Code criado" : "Solicitação criada"} com sucesso!`,
          error: `Ocorreu um erro ao criar ${isPIX ? "o QR Code" : "a solicitação"} para o pagamento!`,
        },
        { id: "start-checkout" },
      );

      return checkout;
    } catch (err) {
      console.error(err);
    }
  };

  const handleFindCheckoutStatus = async (
    id: string,
    token?: string | null,
  ): Promise<ICheckoutStatusResponse | void> => {
    try {
      const status = await findCheckoutStatus(id, token);

      return status;
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlanSubscriptionStatus = async (
    status: "ACTIVE" | "CANCELED",
    reason?: string,
  ): Promise<void> => {
    try {
      await toast.promise(
        async () => {
          await planStatusChange(status, reason);

          await handleFindAllUIPlans();
        },
        {
          loading: `${status === "ACTIVE" ? "Cancelando" : "Reativando"} plano...`,
          success: `Plano ${status === "ACTIVE" ? "cancelado" : "reativado"} com sucesso!`,
          error: `Ocorreu um erro ao ${status === "ACTIVE" ? "cancelar" : "reativar"} o plano!`,
        },
        { id: "plan-subscription-status-change" },
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BillingsContext.Provider
      value={{
        allUIPlans,
        handleFindAllUIPlans,
        handleStartCheckout,
        handlePlanSubscriptionStatus,
        handleFindCheckoutStatus,
      }}
    >
      {children}
    </BillingsContext.Provider>
  );
};

export default BillingsProvider;
