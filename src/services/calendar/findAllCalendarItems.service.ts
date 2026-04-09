import { api } from "../api";

import { ICalendarItem } from "@/contexts/calendar/interfaces";

interface ICalendarItemsResponse {
  success: boolean;
  data: ICalendarItem[];
}

const findAllCalendarItems = async (
  from: string,
  to: string,
): Promise<ICalendarItem[]> => {
  const {
    data: { success, data },
  } = await api.get<ICalendarItemsResponse>("/calendar", {
    params: { from, to },
  });

  if (!success) {
    throw new Error("Erro ao buscar itens do calendário!");
  }

  return data;
};

export default findAllCalendarItems;
