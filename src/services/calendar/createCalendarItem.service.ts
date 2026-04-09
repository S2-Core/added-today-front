import { api } from "../api";

import { ICreateCalendarItem } from "@/contexts/calendar/interfaces";

const createCalendarItem = async (data: ICreateCalendarItem): Promise<void> => {
  const {
    data: { success },
  } = await api.post("/calendar", data);

  if (!success) {
    throw new Error("Erro ao criar item do calendário!");
  }
};

export default createCalendarItem;
