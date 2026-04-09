import { api } from "../api";

import {
  ICreateContentEvent,
  ICreateCampaignEvent,
  ICreateEarningEvent,
} from "@/contexts/calendar/interfaces";

const updateEvent = async (
  id: string,
  data: ICreateContentEvent | ICreateCampaignEvent | ICreateEarningEvent,
): Promise<void> => {
  const {
    data: { success },
  } = await api.patch(`/calendar/${id}`, data);

  if (!success) throw new Error("Erro ao editar evento!");
};

export default updateEvent;
