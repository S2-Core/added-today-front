import { api } from "../api";

import {
  IStartCheckoutBody,
  IStartCheckoutResponse,
} from "@/contexts/billings/interfaces";

const startCheckout = async (
  body: IStartCheckoutBody,
  token?: string | null,
): Promise<IStartCheckoutResponse> => {
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  const {
    data: { success, data },
  } = await api.post<{ success: boolean; data: IStartCheckoutResponse }>(
    "/billing/checkout",
    body,
    config,
  );

  if (!success) throw new Error("Erro ao iniciar checkout!");

  return data;
};

export default startCheckout;
