import { api } from "../api";

const deactivateOpportunity = async (opportunityId: string): Promise<void> => {
  await api.delete(`/opportunities/${opportunityId}`);

  return;
};

export default deactivateOpportunity;
