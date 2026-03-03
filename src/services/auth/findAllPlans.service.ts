import { api } from "../api";

import { IPlan } from "@/contexts/auth/interfaces";

const findAllPlans = async (): Promise<IPlan[]> => {
  const {
    data: { success, data },
  } = await api.get<{ success: boolean; data: IPlan[] }>("/billing/plans");

  if (!success) throw new Error("Erro ao buscar todos os planos!");

  return data;
};

export default findAllPlans;
