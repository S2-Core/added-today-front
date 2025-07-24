"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { AuthContext } from "../auth";

import findAllMentals from "@/services/mentals/findAll.service";
import createMental from "@/services/mentals/create.service";
import updateMental from "@/services/mentals/update.service";
import deactivateMental from "@/services/mentals/deactivate.service";
import restoreMental from "@/services/mentals/restore.service";

import { MentalType, mentalTypeItems } from "@/constants/mentals";

import {
  IUpdateMental,
  IMental,
  IMentalsContext,
  IMentalsProps,
  IMentalToManage,
  ICreateMental,
} from "./interfaces";

export const MentalsContext = createContext({} as IMentalsContext);

const MentalsProvider = ({ children }: IMentalsProps) => {
  const { token } = useContext(AuthContext);

  const [tab, setTab] = useState<string>("manageMentals");
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

      const ordenatedMentals = allMentals.sort((a, b) => {
        const aDeleted = a.deletedAt !== null;
        const bDeleted = b.deletedAt !== null;

        if (aDeleted && !bDeleted) return 1;
        if (!aDeleted && bDeleted) return -1;

        if (!aDeleted && !bDeleted) {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }

        return (
          new Date(b.deletedAt!).getTime() - new Date(a.deletedAt!).getTime()
        );
      });

      setMentals(ordenatedMentals);
      handleMentalsToManage(ordenatedMentals);
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
          mentalTypeItems.find(({ value }) => type === value)?.label,
          creatorEditable
            ? "Editável pelo criador"
            : "Não editável pelo criador",
        ],
        createdAt,
        isActive: !deletedAt,
      })
    ) as IMentalToManage[];

    setMentalsToManage(formattedMentals);
  };

  const handleCreateMental = async (data: ICreateMental): Promise<void> => {
    toast.promise(
      async () => {
        await createMental(data);

        await handleFindAllMentals();
      },
      {
        loading: "Criando Mental...",
        success: "Mental criado com sucesso!",
        error: "Ocorreu um erro ao criar o Mental!",
      },
      { id: "register-mental" }
    );
  };

  const handleUpdateMental = async (
    data: Partial<IUpdateMental>,
    mentalId: string
  ) => {
    if (token) {
      toast.promise(
        async () => {
          if (!Object.values(data).length) return;

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

  const handleRestoreMental = async (mentalId: string): Promise<void> => {
    toast.promise(
      async () => {
        await restoreMental(mentalId);

        await handleFindAllMentals();
      },
      {
        loading: "Reativando Mental...",
        success: "Mental reativado com sucesso!",
        error: "Ocorreu um erro ao reativar o Mental!",
      },
      { id: "restore-mental" }
    );
  };

  return (
    <MentalsContext.Provider
      value={{
        mentals,
        mentalsToManage,
        handleUpdateMental,
        handleDeactivateMental,
        tab,
        setTab,
        handleCreateMental,
        handleRestoreMental,
      }}
    >
      {children}
    </MentalsContext.Provider>
  );
};

export default MentalsProvider;
