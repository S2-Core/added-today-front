import * as yup from "yup";

import { ICreateQuotation } from "@/contexts/quotations/interfaces";

const createQuotationSchema = yup.object({
  niche: yup.string().required("O campo 'Nicho' é obrigatório"),
  includesEvent: yup.boolean().notRequired(),
  engagementRate: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(0, "A taxa de engajamento deve ser maior ou igual a 0")
    .max(1.0, "A taxa de engajamento deve ser menor ou igual a 1.00")
    .required("O campo 'Taxa de Engajamento' é obrigatório"),
  tiktokFollowers: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired(),
  includesReelsCombo: yup.boolean().notRequired(),
  instagramFollowers: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired(),
  youtubeSubscribers: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired(),
  includesBoostRights: yup.boolean().notRequired(),
  includesImageRights: yup.boolean().notRequired(),
  includesTiktokVideo: yup.boolean().notRequired(),
  estimatedTiktokViews: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired(),
}) as yup.ObjectSchema<ICreateQuotation>;

export default createQuotationSchema;
