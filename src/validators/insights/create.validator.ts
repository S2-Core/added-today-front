import * as yup from "yup";

import { IInsightPreferences } from "@/contexts/insights/interfaces";
import {
  InsightTopic,
  InsightFrequency,
  InsightHour,
  InsightTerritory,
} from "@/constants/insights";

const createInsightSchema = yup.object({
  topics: yup
    .array(
      yup
        .string()
        .trim()
        .oneOf(
          Object.values(InsightTopic),
          "Valor inválido em 'Temas dos Insights'"
        )
    )
    .ensure()
    .min(1, "Insira ao menos um tópico")
    .required("O campo 'Temas dos Insights' é obrigatório"),
  territory: yup
    .mixed<InsightTerritory>()
    .oneOf(Object.values(InsightTerritory), "Tipo inválido")
    .required("O campo 'Tema do Insight' é obrigatório"),
  frequency: yup
    .mixed<InsightFrequency>()
    .oneOf(Object.values(InsightFrequency), "Tipo inválido")
    .required("O campo 'Frequência dos Insights' é obrigatório"),
  hour: yup
    .mixed<InsightHour>()
    .oneOf(Object.values(InsightHour), "Tipo inválido")
    .required("O campo 'Horario dos Insights' é obrigatório"),
}) as yup.ObjectSchema<IInsightPreferences>;

export default createInsightSchema;
