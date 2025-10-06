import {
  ICreateInput,
  ICreateSelects,
  ICreateTagInput,
} from "@/components/register/interfaces";
import { IItems } from "@/components/select/interfaces";
import { ICreateOpportunity } from "@/contexts/opportunities/interfaces";
import currencyCodes from "currency-codes";

export enum OpportunityType {
  PAID = "REMUNERADA",
  PERFORMANCE = "PERFORMANCE",
  EXCHANGE = "PERMUTA",
}

export enum OpportunityStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export const opportunitiesTypeItems: IItems<OpportunityType>[] = [
  { label: "Remunerada", value: OpportunityType.PAID },
  { label: "Performance", value: OpportunityType.PERFORMANCE },
  { label: "Permuta", value: OpportunityType.EXCHANGE },
];

export const opportunitiesStatusItems: IItems<OpportunityStatus>[] = [
  { label: "Rascunho", value: OpportunityStatus.DRAFT },
  { label: "Publicada", value: OpportunityStatus.PUBLISHED },
  { label: "Arquivada", value: OpportunityStatus.ARCHIVED },
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
    label: "Nome da Campanha",
    placeholder: "Digite o nome da Campanha",
    required: true,
  },
  {
    name: "deadline",
    label: "Prazo Final da Campanha",
    placeholder: "Digite o prazo final da Campanha",
    type: "date",
    required: true,
  },

  {
    name: "brand",
    label: "Marca Associada da Campanha",
    placeholder: "Digite a marca associada da Campanha",
    required: false,
  },
  {
    name: "platform",
    label: "Plataforma da Campanha",
    placeholder: "Digite a plataforma da Campanha",
    required: false,
  },
  {
    name: "sourceUrl",
    label: "Link Original da Campanha",
    placeholder: "Digite o link original da Campanha",
    required: false,
  },
  {
    name: "compensationMin",
    label: "Faixa de Pagamento Mínima da Campanha",
    placeholder: "Digite a faixa de pagamento mínima da Campanha",
    type: "number",
    required: false,
  },
  {
    name: "compensationMax",
    label: "Faixa de Pagamento Máxima da Campanha",
    placeholder: "Digite a faixa de pagamento máxima da Campanha",
    type: "number",
    required: false,
  },
  {
    name: "audienceRange",
    label: "Público-alvo da Campanha",
    placeholder: "Digite a público-alvo da Campanha",
    required: false,
  },
  {
    name: "requirements",
    label: "Requisitos da Campanha",
    placeholder: "Digite os requisitos da Campanha",
    required: false,
  },
  {
    name: "location",
    label: "Local da Campanha",
    placeholder: "Digite o local da Campanha",
    required: false,
  },
  {
    name: "highlight",
    label: "Destaque da Campanha",
    type: "checkbox",
    required: true,
  },
];

export const createTagsInputs: ICreateTagInput<ICreateOpportunity>[] = [
  {
    name: "nicheTags",
    label: "Nichos da Campanha",
    placeholder: "Insira os nichos da Campanha",
    required: false,
  },
];

export const createSelects: ICreateSelects<ICreateOpportunity>[] = [
  {
    name: "type",
    label: "Tipo da Campanha",
    items: opportunitiesTypeItems,
    required: true,
  },
  {
    name: "status",
    label: "Status da Campanha",
    items: opportunitiesStatusItems,
    required: false,
  },

  {
    name: "currency",
    label: "Moeda da Campanha",
    items: opportunitiesCurrencyItems,
    required: false,
  },
];
