import { api } from "../api";

import { IOpportunitiesResponse } from "@/contexts/opportunities/interfaces";

const findAllOpportunities = async (
  filters: any
): Promise<IOpportunitiesResponse> => {
  const { data } = await api.get<IOpportunitiesResponse>("/opportunities", {
    params: filters,
  });

  return data;
};

export default findAllOpportunities;
