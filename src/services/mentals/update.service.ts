import { api } from "../api";

import { IUpdateMental, IMental } from "@/contexts/mentals/interfaces";

type IEditMentalResponse = Omit<IMental, "user, userId">;

const updateMental = async (
  body: Partial<IUpdateMental>,
  mentalId: string
): Promise<void> => {
  await api.patch<IEditMentalResponse>(`/mental/${mentalId}`, body);

  return;
};

export default updateMental;
