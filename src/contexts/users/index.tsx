"use client";

import { ChangeEvent, createContext, useState } from "react";
import toast from "react-hot-toast";

import { safeCast } from "@/types";

import { IFormUser, IUsersContext, IUsersProps } from "./interfaces";

export const UsersContext = createContext({} as IUsersContext);

const UsersProvider = ({ children }: IUsersProps) => {
  const [usersFile, setUsersFile] = useState<File | null>(null);
  const [formUsers, setFromUsers] = useState<IFormUser[] | null>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
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
      }
    );
  };

  const handleFormUsers = (file: File) => {
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

  const removeFile = () => {
    setFromUsers(null);
    setUsersFile(null);
  };

  return (
    <UsersContext.Provider
      value={{ formUsers, usersFile, removeFile, handleFile }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
