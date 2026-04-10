import { api } from "../api";

import { ICreateCalendarItem } from "@/contexts/calendar/interfaces";

const updateCalendarItem = async (
  id: string,
  data: ICreateCalendarItem,
): Promise<void> => {
  const {
    data: { success },
  } = await api.patch(`/calendar/${id}`, data);

  if (!success) {
    throw new Error("Erro ao atualizar item do calendário!");
  }
};

export default updateCalendarItem;
