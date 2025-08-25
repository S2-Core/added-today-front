"use client";

import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "..";

import createOpportunity from "@/services/opportunities/create.service";

import {
  ICreateOpportunity,
  IOpportunitiesContext,
  IOpportunity,
  IProps,
} from "./interfaces";
import findAllOpportunities from "@/services/opportunities/findAll.service";

export const OpportunitiesContext = createContext({} as IOpportunitiesContext);

const OpportunitiesProvider = ({ children }: IProps) => {
  const { token } = useAuth();

  const [tab, setTab] = useState<string>("manageOpportunities");
  const [opportunities, setOpportunities] = useState<IOpportunity[] | null>(
    null
  );

  useEffect(() => {
    if (token) {
      handleFindAllOpportunities();
    }
  }, [token, tab]);

  const handleCreateOpportunity = async (
    data: ICreateOpportunity
  ): Promise<void> => {
    try {
      await toast.promise(
        async () => {
          await createOpportunity(data);
        },
        {
          loading: "Criando Oportunidade...",
          success: "Oportunidade criada com sucesso!",
          error: "Ocorreu um erro ao criar a Oportunidade!",
        },
        { id: "register-opportunity" }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleFindAllOpportunities = async (): Promise<void> => {
    try {
      const { items: allOpportunities } = await findAllOpportunities(20);

      setOpportunities(allOpportunities);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <OpportunitiesContext.Provider
      value={{ tab, setTab, handleCreateOpportunity, opportunities }}
    >
      {children}
    </OpportunitiesContext.Provider>
  );
};

export default OpportunitiesProvider;
