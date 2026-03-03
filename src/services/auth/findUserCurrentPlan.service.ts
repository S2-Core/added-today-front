import { api } from "../api";

import { IUserCurrentPlan } from "@/contexts/auth/interfaces";

const findUserCurrentPlan = async (): Promise<IUserCurrentPlan> => {
  const {
    data: { success, data },
  } = await api.get<{ success: boolean; data: IUserCurrentPlan }>(
    "/billing/me",
  );

  if (!success) throw new Error("Erro ao buscar plano atual do usuário!");

  return data;
};

export default findUserCurrentPlan;
