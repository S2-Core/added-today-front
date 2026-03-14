import { api } from "../api";

interface IResponse {
  subscriptionId: string;
  status: "ACTIVE" | "CANCELED";
  cancelAtPeriodEnd: boolean;
  canceledAt: string;
  cancelReason: string;
  currentPeriodEnd: string;
}

const planStatusChange = async (
  status: "ACTIVE" | "CANCELED",
  reason?: string,
): Promise<IResponse> => {
  const body = reason ? { cancelReason: reason } : {};

  const {
    data: { success, data },
  } = await api.post<{ success: boolean; data: IResponse }>(
    `/billing/subscription/${status === "ACTIVE" ? "cancel" : "reactivate"}`,
    body,
  );

  if (!success)
    throw new Error(
      `Erro ao ${status === "ACTIVE" ? "cancelar" : "reativar"} o plano!`,
    );

  return data;
};

export default planStatusChange;
