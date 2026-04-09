import { api } from "../api";

import { ICalendarState } from "@/contexts/calendar/interfaces";

interface ICalendarStateResponse {
  success: boolean;
  data: ICalendarState;
}

const reportFirstAccess = async (): Promise<ICalendarState> => {
  const {
    data: { success, data },
  } = await api.post<ICalendarStateResponse>("/calendar/first-access");

  if (!success)
    throw new Error("Erro ao realizar o primeiro acesso ao calendário!");

  return data;
};

export default reportFirstAccess;
