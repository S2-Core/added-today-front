"use client";

import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuth } from "..";

import createOpportunity from "@/services/opportunities/create.service";
import findAllOpportunities from "@/services/opportunities/findAll.service";
import deactivateOpportunity from "@/services/opportunities/deactivate.service";
import updateOpportunity from "@/services/opportunities/update.service";

import {
  ICreateOpportunity,
  IOpportunitiesContext,
  IOpportunity,
  IProps,
  IUpdateOpportunity,
} from "./interfaces";

export const OpportunitiesContext = createContext({} as IOpportunitiesContext);

const OpportunitiesProvider = ({ children }: IProps) => {
  const navigate = useRouter();

  const { token, loggedUser } = useAuth();

  const [opportunities, setOpportunities] = useState<IOpportunity[] | null>(
    null
  );
  const [filters, setFilters] = useState({
    q: "",
    limit: 20,
    status: "",
    type: "",
    sortby: "deadline",
    order: "desc",
  });

  useEffect(() => {
    if (token && loggedUser) {
      handleFindAllOpportunities();
    }
  }, [token, filters, loggedUser]);

  const handleCreateOpportunity = async (
    data: ICreateOpportunity
  ): Promise<void> => {
    try {
      await toast.promise(
        async () => {
          await createOpportunity(data);

          await handleFindAllOpportunities();
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
      const { items: allOpportunities } = await findAllOpportunities(
        Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== "")
        )
      );

      setOpportunities(allOpportunities);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeactivateOpportunity = async (opportunityId: string) => {
    try {
      await toast.promise(
        async () => {
          await deactivateOpportunity(opportunityId);

          await handleFindAllOpportunities();
        },
        {
          loading: "Desativando Oportunidade...",
          success: "Oportunidade desativada com sucesso!",
          error: "Ocorreu um erro ao desativar a Oportunidade!",
        },
        { id: "deactivate-opportunity" }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateOpportunity = async (
    data: Partial<IUpdateOpportunity>,
    opportunityId: string
  ) => {
    try {
      await toast.promise(
        async () => {
          if (!Object.values(data).length) return;

          await updateOpportunity(opportunityId, data);

          await handleFindAllOpportunities();

          navigate.push("/campaigns");
        },
        {
          loading: "Editando Oportunidade...",
          success: "Oportunidade editada com sucesso!",
          error: "Ocorreu um erro ao editar a Oportunidade!",
        },
        { id: "deactivate-opportunity" }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <OpportunitiesContext.Provider
      value={{
        handleCreateOpportunity,
        opportunities,
        handleDeactivateOpportunity,
        handleUpdateOpportunity,
        setFilters,
        filters,
      }}
    >
      {children}
    </OpportunitiesContext.Provider>
  );
};

export default OpportunitiesProvider;
