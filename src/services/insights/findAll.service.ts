import { api } from "../api";

import { IInsightReponse } from "@/contexts/insights/interfaces";

const findAllInsights = async (limit?: number): Promise<IInsightReponse> => {
  const { data } = await api.get<IInsightReponse>("/insights/history", {
    params: { limit },
  });

  return data;
};

export default findAllInsights;
