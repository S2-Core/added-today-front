import { api } from "../api";

import { IOpportunitiesResponse } from "@/contexts/opportunities/interfaces";

const findAllOpportunities = async (
  limit?: number
): Promise<IOpportunitiesResponse> => {
  const { data } = await api.get<IOpportunitiesResponse>("/opportunities", {
    params: { limit },
  });

  return data;
};

export default findAllOpportunities;
