import { api } from "../api";

import { ICreateMental } from "@/contexts/mentals/interfaces";

const createMental = async (body: ICreateMental): Promise<void> => {
  await api.post("/mental", body);

  return;
};

export default createMental;
