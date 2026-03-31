import { api } from "../api";

import {
  IValidateCoupomBody,
  IValidateCoupomResponse,
} from "@/contexts/billings/interfaces";

const validateCoupom = async (
  body: IValidateCoupomBody,
  token?: string | null,
): Promise<IValidateCoupomResponse> => {
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  const {
    data: { success, data },
  } = await api.post<{ success: boolean; data: IValidateCoupomResponse }>(
    "/billing/coupons/validate",
    body,
    config,
  );

  if (!success) throw new Error("Erro ao validar cupom!");

  return data;
};

export default validateCoupom;
