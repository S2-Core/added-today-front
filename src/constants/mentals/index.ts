import { ICreateInput, ICreateSelects } from "@/components/register/interfaces";
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

export const mentalStatusItems: IItems<MentalStatus>[] = [
  { label: "Rascunho", value: MentalStatus.DRAFT },
  { label: "Publicado", value: MentalStatus.PUBLISHED },
  { label: "Arquivado", value: MentalStatus.ARCHIVED },
];

export const mentalTypeItems: IItems<MentalType>[] = [
  { label: "Padrão", value: MentalType.DEFAULT },
  { label: "Personalizado", value: MentalType.CUSTOM },
];

export const createInputs: ICreateInput<ICreateMental>[] = [
  {
    name: "title",
    label: "Nome do Mental",
    placeholder: "Digite o nome do Mental",
    required: true,
  },
  {
    name: "slug",
    label: "Link de vizualização do Mental",
    placeholder: "Digite o link de vizualização do Mental",
    required: true,
  },
  {
    name: "theme",
    label: "Tema do Mental",
    placeholder: "Digite o tema do Mental",
    required: true,
  },
  {
    name: "creatorEditable",
    label: "Editável pelo Criador",
    type: "checkbox",
    required: true,
  },
];

export const createSelects: ICreateSelects<ICreateMental>[] = [
  {
    name: "status",
    label: "Status do Mental",
    items: mentalStatusItems,
    required: true,
  },
  {
    name: "type",
    label: "Tipo do Mental",
    items: mentalTypeItems,
    required: true,
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
