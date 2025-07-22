"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { AuthContext } from "../auth";

import findAllMentals from "@/services/mentals/findAll.service";
import updateMental from "@/services/mentals/update.service";
import deactivateMental from "@/services/mentals/deactivate.service";

import { MentalType } from "@/constants/mentals";

import {
  IUpdateMental,
  IMental,
  IMentalsContext,
  IMentalsProps,
  IMentalToManage,
} from "./interfaces";

export const MentalsContext = createContext({} as IMentalsContext);

const MentalsProvider = ({ children }: IMentalsProps) => {
  const { token } = useContext(AuthContext);

  const [mentals, setMentals] = useState<IMental[] | null>(null);
  const [mentalsToManage, setMentalsToManage] = useState<
    IMentalToManage[] | null
  >(null);

  useEffect(() => {
    if (token) handleFindAllMentals();
  }, [token]);

  const handleFindAllMentals = async () => {
    try {
      const allMentals = await findAllMentals();

      setMentals(allMentals);
      handleMentalsToManage(allMentals);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMentalsToManage = (mentals: IMental[]) => {
    const formattedMentals = mentals.map(
      ({
        id,
        slug,
        imageUrl,
        title,
        status,
        theme,
        type,
        creatorEditable,
        createdAt,
        deletedAt,
      }) => ({
        id,
        slug,
        imageUrl,
        title,
        status,
        properties: [
          theme,
          type === MentalType.CUSTOM ? "Personalizado" : "Padrão",
          creatorEditable ? "Editável" : "Não editável",
        ],
        createdAt,
        isActive: !deletedAt,
      })
    ) as IMentalToManage[];

    setMentalsToManage(formattedMentals);
  };

  const handleUpdateMental = async (
    data: Partial<IUpdateMental>,
    mentalId: string
  ) => {
    if (token) {
      toast.promise(
        async () => {
          await updateMental(data, mentalId);

          await handleFindAllMentals();
        },
        {
          loading: "Atualizando Mental...",
          success: "Mental editado com sucesso!",
          error: "Ocorreu um erro ao editar o Mental!",
        },
        { id: "update-mental" }
      );
    }
  };

  const handleDeactivateMental = async (mentalId: string): Promise<void> => {
    toast.promise(
      async () => {
        await deactivateMental(mentalId);

        await handleFindAllMentals();
      },
      {
        loading: "Desativando Mental...",
        success: "Mental desativado com sucesso!",
        error: "Ocorreu um erro ao desativar o Mental!",
      },
      { id: "deactivate-mental" }
    );
  };

  return (
    <MentalsContext.Provider
      value={{
        mentals,
        mentalsToManage,
        handleUpdateMental,
        handleDeactivateMental,
      }}
    >
      {children}
    </MentalsContext.Provider>
  );
};

export default MentalsProvider;
