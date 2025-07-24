import {
  ICreateInputs,
  ICreateSelects,
} from "@/components/register/interfaces";
import { IItems } from "@/components/select/interfaces";

import { ICreateMental } from "@/contexts/mentals/interfaces";

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
    label: "Status",
    items: mentalStatusItems,
  },
  {
    name: "type",
    label: "Tipo",
    items: mentalTypeItems,
  },
];
