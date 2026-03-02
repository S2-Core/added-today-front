import { api } from "../api";

import { IUser } from "@/contexts/users/interfaces";

const findAllUsers = async (): Promise<IUser[]> => {
  const {
    data: { success, data },
  } = await api.get<{ success: boolean; data: IUser[] }>("/users/admin", {
    params: { includeDeleted: true },
  });

  if (!success) throw new Error("Erro ao buscar usuários!");

  return data;
};

export default findAllUsers;
