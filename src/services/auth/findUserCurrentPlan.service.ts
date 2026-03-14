import { api } from "../api";

import { IUserCurrentPlan } from "@/contexts/auth/interfaces";

const findUserCurrentPlan = async (): Promise<IUserCurrentPlan> => {
  const {
    data: { success, data },
  } = await api.get<{ success: boolean; data: IUserCurrentPlan }>(
    "/billing/me",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1MTRiZDcxLWRlYTUtNDNjOC05NDk5LTc3Y2JmNzJjZDQ1YSIsInJvbGUiOiJJTkZMVUVOQ0VSIiwiaWF0IjoxNzczNDY5NjgyLCJleHAiOjE3NzM0NzMyODJ9.ZjN1OY1Ezqkb-XSRReLq_mSJORg8O6yNnAapfCNMVQM",
      },
    },
  );

  if (!success) throw new Error("Erro ao buscar plano atual do usuário!");

  return data;
};

export default findUserCurrentPlan;
