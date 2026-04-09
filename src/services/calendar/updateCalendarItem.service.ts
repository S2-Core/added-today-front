import { api } from "../api";

import {
  ICreateCampaignEvent,
  ICreateContentEvent,
  ICreateEarningEvent,
} from "@/contexts/calendar/interfaces";

type UpdateCalendarItemPayload =
  | ICreateContentEvent
  | ICreateCampaignEvent
  | ICreateEarningEvent;

const updateCalendarItem = async (
  id: string,
  data: UpdateCalendarItemPayload,
): Promise<void> => {
  const {
    data: { success },
  } = await api.patch(`/calendar/${id}`, data);

  if (!success) {
    throw new Error("Erro ao atualizar item do calendário!");
  }
};

export default updateCalendarItem;
