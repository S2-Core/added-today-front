import {
  ICreateInputs,
  ICreateSelects,
} from "@/components/register/interfaces";
import { IItems } from "@/components/select/interfaces";

import { ICreateMental, IHomeMental } from "@/contexts/mentals/interfaces";

export enum MentalStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum MentalType {
  DEFAULT = "DEFAULT",
  CUSTOM = "CUSTOM",
}

export const createInputs: ICreateInputs<ICreateMental>[] = [
  {
    name: "title",
    label: "Nome do Mental",
    placeholder: "Digite o nome do Mental",
  },
  {
    name: "slug",
    label: "Link de vizualização do Mental",
    placeholder: "Digite o link de vizualização do Mental",
  },
  {
    name: "theme",
    label: "Tema do Mental",
    placeholder: "Digite o tema do Mental",
  },
  {
    name: "creatorEditable",
    label: "Editável pelo Criador",
    type: "checkbox",
  },
];

export const mentalStatusItems: IItems<MentalStatus>[] = [
  { label: "Rascunho", value: MentalStatus.DRAFT },
  { label: "Publicado", value: MentalStatus.PUBLISHED },
  { label: "Arquivado", value: MentalStatus.ARCHIVED },
];

export const mentalTypeItems: IItems<MentalType>[] = [
  { label: "Padrão", value: MentalType.DEFAULT },
  { label: "Personalizado", value: MentalType.CUSTOM },
];

export const createSelects: ICreateSelects<ICreateMental>[] = [
  {
    name: "status",
    label: "Status do Mental",
    items: mentalStatusItems,
  },
  {
    name: "type",
    label: "Tipo do Mental",
    items: mentalTypeItems,
  },
];

export const homeExampleMentals: IHomeMental[] = [
  {
    name: "laila",
    description: "Mentora da clareza criativa",
    background: "bg-tertiary/30",
  },
  {
    name: "valai",
    description: "Mentor da precificação e potência",
    background: "bg-success/30",
  },
  {
    name: "luai",
    description: "Mentor da inspiração fora da lógica",
    background: "bg-warning/30",
  },
  {
    name: "kairi",
    description: "Mentor dos erros criativos",
    background: "bg-error/30",
  },
];
