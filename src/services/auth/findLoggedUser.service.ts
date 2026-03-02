import { api } from "../api";

import { ILoggedUser } from "@/contexts/auth/interfaces";

const findLoggedUser = async (): Promise<ILoggedUser> => {
  const {
    data: { success, data },
  } = await api.get<{ success: boolean; data: ILoggedUser }>("/auth/me");

  if (!success) throw new Error("Erro ao buscar usuário logado!");

  return data;
};

export default findLoggedUser;
