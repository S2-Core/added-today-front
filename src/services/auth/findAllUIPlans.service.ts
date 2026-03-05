import { api } from "../api";

import { IUIPlan } from "@/contexts/auth/interfaces";

const findAllUIPlans = async (): Promise<IUIPlan[]> => {
  const {
    data: {
      success,
      data: { plans },
    },
  } = await api.get<{ success: boolean; data: { plans: IUIPlan[] } }>(
    "/billing/ui/plans",
  );

  if (!success) throw new Error("Erro ao buscar todos os planos!");

  return plans;
};

export default findAllUIPlans;
