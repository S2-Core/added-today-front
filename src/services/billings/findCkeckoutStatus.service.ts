import { api } from "../api";

import { ICheckoutStatusResponse } from "@/contexts/billings/interfaces";

const findCheckoutStatus = async (
  id: string,
  token?: string | null,
): Promise<ICheckoutStatusResponse> => {
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  const {
    data: { success, data },
  } = await api.get<{ success: boolean; data: ICheckoutStatusResponse }>(
    `/billing/payments/${id}/status`,
    config,
  );

  if (!success) throw new Error("Erro ao buscar status do checkout!");

  return data;
};

export default findCheckoutStatus;
