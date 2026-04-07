import { api } from "../api";

import { IEvent } from "@/contexts/calendar/interfaces";

interface IEventsResponse {
  success: boolean;
  data: IEvent[];
}

const findAllEvents = async (from: string, to: string): Promise<IEvent[]> => {
  const {
    data: { success, data },
  } = await api.get<IEventsResponse>("/calendar", {
    params: { from, to },
  });

  if (!success) throw new Error("Erro ao buscar eventos do calendário!");

  return data;
};

export default findAllEvents;
