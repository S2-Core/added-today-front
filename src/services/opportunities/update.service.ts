import { api } from "../api";

import { IUpdateOpportunity } from "@/contexts/opportunities/interfaces";

const updateOpportunity = async (
  opportunityId: string,
  body: Partial<IUpdateOpportunity>
): Promise<void> => {
  await api.patch(`/opportunities/${opportunityId}`, body);

  return;
};

export default updateOpportunity;
