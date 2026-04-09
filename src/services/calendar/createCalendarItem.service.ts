import { api } from "../api";

import {
  ICreateCampaignEvent,
  ICreateContentEvent,
  ICreateEarningEvent,
} from "@/contexts/calendar/interfaces";

type CreateCalendarItemPayload =
  | ICreateContentEvent
  | ICreateCampaignEvent
  | ICreateEarningEvent;

const createCalendarItem = async (
  data: CreateCalendarItemPayload,
): Promise<void> => {
  const {
    data: { success },
  } = await api.post("/calendar", data);

  if (!success) {
    throw new Error("Erro ao criar item do calendário!");
  }
};

export default createCalendarItem;
