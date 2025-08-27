import { api } from "../api";

import { IInsightSettings } from "@/contexts/insights/interfaces";

const findAllInsightsSettings = async (): Promise<IInsightSettings> => {
  const { data } = await api.get<IInsightSettings>("/insights/preferences");

  return data;
};

export default findAllInsightsSettings;
