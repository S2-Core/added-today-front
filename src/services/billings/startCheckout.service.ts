import { api } from "../api";

import {
  IStartCheckoutBody,
  IStartCheckoutResponse,
} from "@/contexts/billings/interfaces";

const startCheckout = async (
  body: IStartCheckoutBody,
): Promise<IStartCheckoutResponse> => {
  const {
    data: { success, data },
  } = await api.post<{ success: boolean; data: IStartCheckoutResponse }>(
    "/billing/checkout",
    body,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1MTRiZDcxLWRlYTUtNDNjOC05NDk5LTc3Y2JmNzJjZDQ1YSIsInJvbGUiOiJJTkZMVUVOQ0VSIiwiaWF0IjoxNzczMzM2NjQyLCJleHAiOjE3NzMzNDAyNDJ9.G_LZT-xp2XOk9R3FOqRAiP1uT04lNSEfv0ShFhn4upA",
      },
    },
  );

  if (!success) throw new Error("Erro ao iniciar checkout!");

  return data;
};

export default startCheckout;
