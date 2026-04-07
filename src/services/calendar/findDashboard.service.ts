import { api } from "../api";

import { IDashboard } from "@/contexts/calendar/interfaces";

interface IDashboardResponse {
  success: boolean;
  data: IDashboard;
}

const findDashboard = async (from: string, to: string): Promise<IDashboard> => {
  const {
    data: { success, data },
  } = await api.get<IDashboardResponse>("/calendar/dashboard", {
    params: { from, to },
  });

  if (!success) throw new Error("Erro ao buscar dados do dashboard!");

  return data;
};

export default findDashboard;
