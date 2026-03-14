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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1MTRiZDcxLWRlYTUtNDNjOC05NDk5LTc3Y2JmNzJjZDQ1YSIsInJvbGUiOiJJTkZMVUVOQ0VSIiwiaWF0IjoxNzczNDY5NjgyLCJleHAiOjE3NzM0NzMyODJ9.ZjN1OY1Ezqkb-XSRReLq_mSJORg8O6yNnAapfCNMVQM",
      },
    },
  );

  if (!success) throw new Error("Erro ao iniciar checkout!");

  return data;
};

export default startCheckout;
