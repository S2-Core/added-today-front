"use client";

import { ChangeEvent, createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Papa from "papaparse";

import { useAuth } from "..";

import findAllUsers from "@/services/users/findAll.service";
import createUser from "@/services/users/create.service";
import updateUser from "@/services/users/update.service";
import deactivateUser from "@/services/users/deactivate.service";
import restoreUser from "@/services/users/restore.service";

import { deepEqual } from "@/utils/objects.utils";

import {
  ICreateUser,
  IUpdateUser,
  IFormUser,
  IUser,
  IUsersContext,
  IProps,
  IUserToManage,
} from "./interfaces";

export const UsersContext = createContext({} as IUsersContext);

const UsersProvider = ({ children }: IProps) => {
  const { token, loggedUser } = useAuth();

  const [tab, setTab] = useState<string>("manageUsers");
  const [usersFile, setUsersFile] = useState<File | null>(null);
  const [formUsers, setFromUsers] = useState<IFormUser[] | null>(null);
  const [formUsersModal, setFormUsersModal] = useState<boolean>(false);
  const [formUserToCreate, setFormUserToCreate] = useState<IFormUser | null>(
    null
  );
  const [selectedUsersToCreate, setSelectedUsersToCreate] = useState<
    IFormUser[] | null
  >(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [usersToManage, setUsersToManage] = useState<IUserToManage[] | null>(
    null
  );

  useEffect(() => {
    if (token) handleFindAllUsers();
  }, [token, tab]);

  const handleFile = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    try {
      await toast.promise(
        async () => {
          const file = e.target.files?.[0];

          if (!file || file.type !== "text/csv") {
            e.target.value = "";

            throw new Error();
          }

          setUsersFile(file);
          handleFormUsers(file);
        },
        {
          loading: "Carregando arquivo...",
          success: "Arquivo carregado com sucesso!",
          error: "Por favor, selecione um arquivo CSV.",
        },
        {
          id: "file",
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormUsers = (file: File): void => {
    try {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result as string;

        const { data, errors } = Papa.parse<IFormUser>(text, {
          header: true,
        });

        if (errors.length) {
          console.error("Erro ao processar CSV:", errors);

          return;
        }

        data.forEach((formUser) => {
          Object.keys(formUser)
            .filter(
              (key) =>
                key.toLowerCase().includes("coluna") ||
                key.toLowerCase().includes("column")
            )
            .forEach((key) => delete formUser[key]);
        });

        setFromUsers(data);
      };

      reader.readAsText(file);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFile = (): void => {
    setFromUsers(null);
    setUsersFile(null);
    setSelectedUsersToCreate(null);
  };

  const handleCreateUser = async (
    data: ICreateUser | ICreateUser[],
    formUser = false
  ): Promise<void> => {
    try {
      await toast.promise(
        async () => {
          await createUser(data);

          await handleFindAllUsers();

          if (formUser) {
            setFormUsersModal(false);
            setSelectedUsersToCreate(null);
          }
        },
        {
          loading: "Criando Usuário...",
          success: "Usuário criado com sucesso!",
          error: "Ocorreu um erro ao criar o Usuário!",
        },
        { id: "register-user" }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleFindAllUsers = async (): Promise<void> => {
    try {
      const allUsers = await findAllUsers();

      const ordenatedUsers = allUsers.sort((a, b) => {
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

      setUsers(ordenatedUsers);
      handleUsersToManage(ordenatedUsers);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUsersToManage = (users: IUser[]): void => {
    const formattedUsers = users.map(
      ({
        id,
        name,
        email,
        phone,
        createdAt,
        role,
        deletedAt,
        isRegistered,
      }) => ({
        id,
        slug: id,
        isActive: !deletedAt,
        isRegistered,
        info: [
          {
            key: "name",
            value: name,
            alias: "Nome do Usuário",
          },
          {
            key: "phone",
            value: phone,
            alias: "Celular",
          },
          {
            key: "email",
            value: email,
            alias: "Email",
          },
          {
            key: !deletedAt ? "createdAt" : "deletedAt",
            value: new Date(!deletedAt ? createdAt : deletedAt),
            alias: !deletedAt ? "Data de criação" : "Data de Desativação",
          },
          {
            key: "role",
            value: role,
            alias: "Cargo",
          },
        ],
      })
    ) as IUserToManage[];

    setUsersToManage(formattedUsers);
  };

  const handleRemoveUserFromList = (
    message = true,
    formUser = formUserToCreate
  ): void => {
    if (formUsers && formUser) {
      const index = formUsers.findIndex((user) =>
        deepEqual<IFormUser>(user, formUser)
      );

      if (index === -1) {
        toast.error("Ocorreu um problema inesperado na remoção do Usuário!", {
          id: "remove-user",
        });

        return;
      }

      setFromUsers(formUsers.filter((_, i) => i !== index));

      if (message)
        toast.success("Usuário removido da lista com sucesso!", {
          id: "remove-user",
        });
    }
  };

  const handleUpdateUser = async (
    data: Partial<IUpdateUser>,
    userId: string
  ): Promise<void> => {
    try {
      await toast.promise(
        async () => {
          if (!Object.values(data).length) return;

          await updateUser(data, userId);

          await handleFindAllUsers();
        },
        {
          loading: "Atualizando Usuário...",
          success: "Usuário editado com sucesso!",
          error: "Ocorreu um erro ao editar o Usuário!",
        },
        { id: "update-user" }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeactivateUser = async (userId: string): Promise<void> => {
    try {
      await toast.promise(
        async () => {
          await deactivateUser(userId);

          await handleFindAllUsers();
        },
        {
          loading: "Desativando Usuário...",
          success: "Usuário desativado com sucesso!",
          error: "Ocorreu um erro ao desativar o Usuário!",
        },
        { id: "deactivate-user" }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleRestoreUser = async (userId: string): Promise<void> => {
    try {
      await toast.promise(
        async () => {
          await restoreUser(userId);

          await handleFindAllUsers();
        },
        {
          loading: "Reativando Usuário...",
          success: "Usuário reativado com sucesso!",
          error: "Ocorreu um erro ao reativar o Usuário!",
        },
        { id: "restore-user" }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        formUsers,
        usersFile,
        handleRemoveFile,
        handleFile,
        formUsersModal,
        setFormUsersModal,
        formUserToCreate,
        setFormUserToCreate,
        handleCreateUser,
        handleFindAllUsers,
        users,
        selectedUsersToCreate,
        setSelectedUsersToCreate,
        handleRemoveUserFromList,
        usersToManage,
        handleUpdateUser,
        handleDeactivateUser,
        handleRestoreUser,
        tab,
        setTab,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
