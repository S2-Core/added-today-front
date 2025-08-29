import {
  ICreateInput,
  ICreateSelects,
  ICreateTagInput,
} from "@/components/register/interfaces";
import { IItems } from "@/components/select/interfaces";
import { ICreateOpportunity } from "@/contexts/opportunities/interfaces";
import currencyCodes from "currency-codes";

export enum OpportunityType {
  PAID = "PAID",
  VISIBILITY = "VISIBILITY",
  NETWORKING = "NETWORKING",
}

export enum OpportunityStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export const opportunitiesTypeItems: IItems<OpportunityType>[] = [
  { label: "Remunerado", value: OpportunityType.PAID },
  { label: "Visibilidade", value: OpportunityType.VISIBILITY },
  { label: "Networking", value: OpportunityType.NETWORKING },
];

export const opportunitiesStatusItems: IItems<OpportunityStatus>[] = [
  { label: "Rascunho", value: OpportunityStatus.DRAFT },
  { label: "Publicado", value: OpportunityStatus.PUBLISHED },
  { label: "Arquivado", value: OpportunityStatus.ARCHIVED },
];

export const opportunitiesCurrencyItems: IItems<string>[] = currencyCodes
  .codes()
  .map((code) => ({
    label: code,
    value: code,
  }));

export const createInputs: ICreateInput<ICreateOpportunity>[] = [
  {
    name: "title",
    label: "Nome da Oportunidade",
    placeholder: "Digite o nome da Oportunidade",
    required: true,
  },
  {
    name: "deadline",
    label: "Prazo Final da Oportunidade",
    placeholder: "Digite o prazo final da Oportunidade",
    type: "date",
    required: true,
  },

  {
    name: "brand",
    label: "Marca Associada da Oportunidade",
    placeholder: "Digite a marca associada da Oportunidade",
    required: false,
  },
  {
    name: "platform",
    label: "Plataforma da Oportunidade",
    placeholder: "Digite a plataforma da Oportunidade",
    required: false,
  },
  {
    name: "sourceUrl",
    label: "Link Original da Oportunidade",
    placeholder: "Digite o link original da Oportunidade",
    required: false,
  },
  {
    name: "compensationMin",
    label: "Faixa de Pagamento Mínima da Oportunidade",
    placeholder: "Digite a faixa de pagamento mínima da Oportunidade",
    type: "number",
    required: false,
  },
  {
    name: "compensationMax",
    label: "Faixa de Pagamento Máxima da Oportunidade",
    placeholder: "Digite a faixa de pagamento máxima da Oportunidade",
    type: "number",
    required: false,
  },
  {
    name: "audienceRange",
    label: "Público-alvo da Oportunidade",
    placeholder: "Digite a público-alvo da Oportunidade",
    required: false,
  },
  {
    name: "requirements",
    label: "Requisitos da Oportunidade",
    placeholder: "Digite os requisitos da Oportunidade",
    required: false,
  },
  {
    name: "location",
    label: "Local da Oportunidade",
    placeholder: "Digite o local da Oportunidade",
    required: false,
  },
  {
    name: "highlight",
    label: "Destaque da Oportunidade",
    type: "checkbox",
    required: true,
  },
];

export const createTagsInputs: ICreateTagInput<ICreateOpportunity>[] = [
  {
    name: "nicheTags",
    label: "Nichos da Oportunidade",
    placeholder: "Insira os nichos da Oportunidade",
    required: false,
  },
];

export const createSelects: ICreateSelects<ICreateOpportunity>[] = [
  {
    name: "type",
    label: "Tipo da Oportunidade",
    items: opportunitiesTypeItems,
    required: true,
  },
  {
    name: "status",
    label: "Status da Oportunidade",
    items: opportunitiesStatusItems,
    required: false,
  },

  {
    name: "currency",
    label: "Moeda da Oportunidade",
    items: opportunitiesCurrencyItems,
    required: false,
  },
];
