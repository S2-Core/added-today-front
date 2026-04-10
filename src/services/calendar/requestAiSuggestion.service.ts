import { api } from "../api";

import {
  IAISuggestionBody,
  IAISuggestionWithRemaining,
} from "@/contexts/calendar/interfaces";

const requestAiSuggestion = async (
  body: IAISuggestionBody,
): Promise<IAISuggestionWithRemaining> => {
  const {
    data: { success, data },
  } = await api.post("/calendar/ai-suggestion", body);

  if (!success) {
    throw new Error("Erro ao gerar sugestão com IA!");
  }

  return data;
};

export default requestAiSuggestion;
