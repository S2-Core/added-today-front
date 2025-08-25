import { api } from "../api";

import { ICreateOpportunity } from "@/contexts/opportunities/interfaces";

const createOpportunity = async (body: ICreateOpportunity): Promise<void> => {
  await api.post("/opportunities", body);

  return;
};

export default createOpportunity;
