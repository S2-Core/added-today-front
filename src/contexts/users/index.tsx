"use client";

import {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

import { AuthContext } from "../auth";

import findAllUsers from "@/services/users/findAll.service";
import createUser from "@/services/users/create.service";

import { normalizeStr } from "@/utils/string.utls";

import { safeCast } from "@/types";

import {
  ICreateUser,
  IFormUser,
  IUser,
  IUsersContext,
  IUsersProps,
  IUserToManage,
} from "./interfaces";

export const UsersContext = createContext({} as IUsersContext);

const UsersProvider = ({ children }: IUsersProps) => {
  const { token } = useContext(AuthContext);

  const [usersFile, setUsersFile] = useState<File | null>(null);
  const [formUsers, setFromUsers] = useState<IFormUser[] | null>(null);
  const [formUsersModal, setFormUsersModal] = useState<boolean>(false);
  const [formUserToCreate, setFormUserToCreate] = useState<IFormUser | null>(
    null
  );
  const [users, setUsers] = useState<IUser[]>([]);
  const [usersToManage, setUsersToManage] = useState<IUserToManage[] | null>(
    null
  );

  useEffect(() => {
    if (token) {
      handleFindAllUsers();
    }
  }, [token]);

  const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
    toast.promise(
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
  };

  const handleFormUsers = (file: File): void => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;

      const lines = text.split("\n").map((line) => line.trim());

      const headers = lines[0].split(",");

      const data = safeCast<IFormUser[]>(
        lines.slice(1).map((line) => {
          const values = line.split(",");

          return Object.fromEntries(
            values.map((val, idx) => [headers[idx], val])
          );
        })
      );

      setFromUsers(data);
    };

    reader.readAsText(file);
  };

  const handleRemoveFile = (): void => {
    setFromUsers(null);
    setUsersFile(null);
  };

  const handleCreateUser = async (data: ICreateUser): Promise<void> => {
    toast.promise(
      async () => {
        await createUser(data);
      },
      {
        loading: "Criando usuário...",
        success: "Usuário criado com sucesso!",
        error: "Ocorreu um erro ao criar o usuário.",
      },
      { id: "register" }
    );
  };

  const handleFindAllUsers = async (): Promise<void> => {
    try {
      const allUsers = await findAllUsers();

      setUsers(allUsers);
      handleUsersToManage(allUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUsersToManage = (users: IUser[]): void => {
    const formattedUsers = users.map(
      ({ id, name, email, phone, createdAt, role, deletedAt }) => ({
        id,
        slug: normalizeStr(name),
        isActive: !deletedAt,
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
            key: "createdAt",
            value: new Date(createdAt),
            alias: "Data de criação",
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

  const handleRemoveUserFromList = (): void => {
    if (formUsers && formUserToCreate) {
      const index = formUsers.findIndex(
        (user) =>
          user.email === formUserToCreate.email &&
          user.nome === formUserToCreate.nome &&
          user.instagram === formUserToCreate.instagram &&
          user.telefone === formUserToCreate.telefone &&
          user.conteúdo === formUserToCreate.conteúdo &&
          user.tiktok === formUserToCreate.tiktok &&
          user.CEP === formUserToCreate.CEP &&
          user["qual a sua principal dor como criador?"] ===
            formUserToCreate["qual a sua principal dor como criador?"] &&
          user[
            "você pagaria por um serviço que RESOLVESSE seus problemas como criador?"
          ] ===
            formUserToCreate[
              "você pagaria por um serviço que RESOLVESSE seus problemas como criador?"
            ] &&
          user["o que você gostaria que essse serviço oferecesse?"] ===
            formUserToCreate[
              "o que você gostaria que essse serviço oferecesse?"
            ]
      );

      if (index === -1) {
        toast.error("Ocorreu um problema inesperado na remoção do usuário.", {
          id: "removeUser",
        });

        return;
      }

      setFromUsers(formUsers.filter((_, i) => i !== index));

      setFormUserToCreate(null);

      toast.success("Usuário removido da lista com sucesso!", {
        id: "removeUser",
      });
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
        handleRemoveUserFromList,
        usersToManage,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
