import * as yup from "yup";

import { IInsightSettings } from "@/contexts/insights/interfaces";
import {
  InsightTopics,
  InsightFrequency,
  InsightHour,
  InsightTerritory,
} from "@/constants/insights";

const setInsightSettingsSchema = yup.object({
  topics: yup
    .array(
      yup
        .string()
        .trim()
        .oneOf(
          Object.values(InsightTopics),
          "O campo 'Temas dos Insights' é obrigatório"
        )
    )
    .ensure()
    .min(1, "Insira ao menos um tópico")
    .required("O campo 'Temas dos Insights' é obrigatório"),
  territory: yup
    .mixed<InsightTerritory>()
    .oneOf(
      Object.values(InsightTerritory),
      'O campo "Área dos Insights" é obrigatório'
    )
    .required('O campo "Área dos Insights" é obrigatório'),
  frequency: yup
    .mixed<InsightFrequency>()
    .oneOf(
      Object.values(InsightFrequency),
      "O campo 'Frequência dos Insights' é obrigatório"
    )
    .required("O campo 'Frequência dos Insights' é obrigatório"),
  hour: yup
    .mixed<InsightHour>()
    .oneOf(
      Object.values(InsightHour),
      'O campo "Horario de Envio dos Insights" é obrigatório'
    )
    .required('O campo "Horario de Envio dos Insights" é obrigatório'),
}) as yup.ObjectSchema<Partial<IInsightSettings>>;

export default setInsightSettingsSchema;
