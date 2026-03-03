import { api } from "../api";

import { IUser } from "@/contexts/users/interfaces";

import { IMeta } from "@/types";

const findAllUsers = async (
  page = 1,
  limit = 20,
): Promise<{ data: IUser[]; meta: IMeta }> => {
  const {
    data: { success, data, meta },
  } = await api.get<{ success: boolean; data: IUser[]; meta: IMeta }>(
    "/users/admin",
    {
      params: { includeDeleted: true, page, limit },
    },
  );

  if (!success) throw new Error("Erro ao buscar usuários!");

  return { data, meta };
};

export default findAllUsers;
