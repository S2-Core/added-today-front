import { ICreateInputs } from "@/types/general";

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
    placeholder: "Digite o thema do Mental",
  },
];
