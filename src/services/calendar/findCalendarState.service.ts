import { api } from "../api";

import { ICalendarState } from "@/contexts/calendar/interfaces";

interface ICalendarStateResponse {
  success: boolean;
  data: ICalendarState;
}

const findCalendarState = async (): Promise<ICalendarState> => {
  const {
    data: { success, data },
  } = await api.get<ICalendarStateResponse>("/calendar/feature-state");

  if (!success) throw new Error("Erro ao buscar o estado do calendário!");

  return data;
};

export default findCalendarState;
