import { api } from "../api";

import { IUser } from "@/contexts/users/interfaces";

const findOneUser = async (id: string): Promise<IUser> => {
  const {
    data: { success, data },
  } = await api.get<{ success: boolean; data: IUser }>(`/users/admin/${id}`);

  if (!success) throw new Error("Erro ao buscar usuário!");

  return data;
};

export default findOneUser;
