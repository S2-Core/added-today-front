import { api } from "../api";

import {
  IFilters,
  IOpportunitiesResponse,
} from "@/contexts/opportunities/interfaces";

const findAllOpportunities = async (
  filters: IFilters,
): Promise<IOpportunitiesResponse> => {
  const { data } = await api.get<IOpportunitiesResponse>("/opportunities", {
    params: filters,
  });

  return data;
};

export default findAllOpportunities;
