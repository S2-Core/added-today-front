import * as yup from "yup";

import { ICreateOpportunity } from "@/contexts/opportunities/interfaces";
import { OpportunityStatus, OpportunityType } from "@/constants/opportunities";

const createOpportunitySchema = yup.object({
  title: yup
    .string()
    .min(3, "O nome da Oportunidade deve ter pelo menos 3 caracteres")
    .required('O "Nome da Oportunidade" é um campo obrigatório'),
  deadline: yup
    .date()
    .nullable()
    .typeError("Insira uma data válida")
    .min(new Date(), "A data não pode ser anterior a hoje")
    .required('O "Prazo Final da Oportunidade" é um campo obrigatório'),
  brand: yup.string().notRequired(),
  platform: yup.string().notRequired(),
  sourceUrl: yup
    .string()
    .url("Insira uma URL válida")
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .notRequired(),
  compensationMin: yup.string().notRequired(),
  compensationMax: yup.string().notRequired(),
  nicheTags: yup.array(yup.string().trim()).ensure().notRequired(),
  audienceRange: yup.string().notRequired(),
  requirements: yup.string().notRequired(),
  location: yup.string().notRequired(),
  type: yup
    .mixed<OpportunityType>()
    .oneOf(
      Object.values(OpportunityType),
      'O "Tipo da Oportunidade" é um campo obrigatório'
    )
    .required('O "Tipo da Oportunidade" é um campo obrigatório'),
  status: yup
    .mixed<OpportunityStatus>()
    .oneOf(Object.values(OpportunityStatus), "Escolha um status válido")
    .transform((value) => (value === "" ? undefined : value))
    .notRequired()
    .nullable(),
  currency: yup.string().notRequired(),
  highlight: yup
    .boolean()
    .required('O "Destaque da Oportunidade" é um campo obrigatório'),
}) as yup.ObjectSchema<ICreateOpportunity>;

export default createOpportunitySchema;
