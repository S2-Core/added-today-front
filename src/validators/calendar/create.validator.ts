import * as yup from "yup";

import {
  ICalendarItemType,
  ICreateCalendarItem,
} from "@/contexts/calendar/interfaces";

export const createCalendarSchema = yup.object({
  title: yup
    .string()
    .required("O título da atividade é obrigatório")
    .min(1)
    .max(150),
  startsAt: yup.string().required("Data inicial é obrigatória"),
  endsAt: yup.string().nullable().optional(),
  isAllDay: yup.boolean(),
  type: yup
    .mixed<ICalendarItemType>()
    .oneOf(["CONTENT", "CAMPAIGN", "EARNING"])
    .required(),
  description: yup.string().nullable().max(1000).optional(),

  contentType: yup.string().when("type", {
    is: "CONTENT",
    then: (schema) => schema.required("Tipo de conteúdo é obrigatório"),
    otherwise: (schema) => schema.strip(),
  }),
  platform: yup.string().when("type", {
    is: "CONTENT",
    then: (schema) => schema.required("Plataforma é obrigatória"),
    otherwise: (schema) => schema.strip(),
  }),
  hook: yup
    .string()
    .nullable()
    .max(255)
    .when("type", {
      is: "CONTENT",
      then: (schema) => schema.optional(),
      otherwise: (schema) => schema.strip(),
    }),

  brand: yup.string().when("type", {
    is: "CAMPAIGN",
    then: (schema) => schema.required("Marca é obrigatória").min(1).max(150),
    otherwise: (schema) => schema.strip(),
  }),

  earningType: yup.string().when("type", {
    is: "EARNING",
    then: (schema) => schema.required("Tipo de ganho é obrigatório"),
    otherwise: (schema) => schema.strip(),
  }),
  amountCents: yup.string().when("type", {
    is: "EARNING",
    then: (schema) => schema.required("Valor é obrigatório").min(0),
    otherwise: (schema) => schema.strip(),
  }),
  currency: yup.string().when("type", {
    is: "EARNING",
    then: (schema) => schema.optional(),
    otherwise: (schema) => schema.strip(),
  }),
  source: yup.string().when("type", {
    is: "EARNING",
    then: (schema) => schema.required("Origem é obrigatória").min(1).max(150),
    otherwise: (schema) => schema.strip(),
  }),

  status: yup.string().required("Status é obrigatório"),
}) as yup.ObjectSchema<ICreateCalendarItem>;
