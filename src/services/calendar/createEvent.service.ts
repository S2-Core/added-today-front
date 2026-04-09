import { api } from "../api";

import {
  ICreateContentEvent,
  ICreateCampaignEvent,
  ICreateEarningEvent,
} from "@/contexts/calendar/interfaces";

const createEvent = async (
  data: ICreateContentEvent | ICreateCampaignEvent | ICreateEarningEvent,
): Promise<void> => {
  const {
    data: { success },
  } = await api.post("/calendar", data);

  if (!success) throw new Error("Erro ao criar evento!");
};

export default createEvent;
