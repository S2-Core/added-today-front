"use client";

import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "..";

import findAllQuotations from "@/services/quotations/findAll.service";
import findQuotationsRemaining from "@/services/quotations/findRemaining.service";
import createQuotation from "@/services/quotations/create.service";

import {
  ICreateQuotation,
  IProps,
  IQuotation,
  IQuotationsContext,
} from "./interfaces";

export const QuotationsContext = createContext({} as IQuotationsContext);

const QuotationsProvider = ({ children }: IProps) => {
  const { token } = useAuth();

  const [tab, setTab] = useState("myQuotations");
  const [quotations, setQuotations] = useState<IQuotation[] | null>(null);
  const [quotationsRemaining, setQuotationsRemaining] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (token) {
      handleFindAllQuotations();
      handleFindQuotationsRemaining();
    }
  }, [token, tab]);

  const handleFindAllQuotations = async () => {
    try {
      const { quotations: allQuotations } = await findAllQuotations();

      setQuotations(allQuotations);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFindQuotationsRemaining = async () => {
    try {
      const { remaining } = await findQuotationsRemaining();

      setQuotationsRemaining(remaining);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateQuotation = async (data: ICreateQuotation) => {
    try {
      await toast.promise(
        async () => {
          await createQuotation(data);

          await handleFindAllQuotations();
          await handleFindQuotationsRemaining();
        },
        {
          loading: "Criando Precificação...",
          success: "Precificação criada com sucesso!",
          error: "Ocorreu um erro ao criar a Precificação!",
        },
        { id: "register-quotation" }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <QuotationsContext.Provider
      value={{
        setTab,
        tab,
        quotations,
        quotationsRemaining,
        handleCreateQuotation,
      }}
    >
      {children}
    </QuotationsContext.Provider>
  );
};

export default QuotationsProvider;
