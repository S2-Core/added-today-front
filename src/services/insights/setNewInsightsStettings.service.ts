import { api } from "../api";

import { IInsightSettings } from "@/contexts/insights/interfaces";

const setNewInsightsSettings = async (
  body: Partial<IInsightSettings>
): Promise<void> => {
  await api.post("/insights/preferences", body);

  return;
};

export default setNewInsightsSettings;
