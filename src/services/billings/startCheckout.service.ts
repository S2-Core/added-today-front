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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1MTRiZDcxLWRlYTUtNDNjOC05NDk5LTc3Y2JmNzJjZDQ1YSIsInJvbGUiOiJJTkZMVUVOQ0VSIiwiaWF0IjoxNzczMzEzODQ3LCJleHAiOjE3NzMzMTc0NDd9.1eDidTfqb1FWLdbdB6FsZOHpaQpgI4soOfH_74WjF4I",
      },
    },
  );

  if (!success) throw new Error("Erro ao iniciar checkout!");

  return data;
};

export default startCheckout;
