import * as yup from "yup";

import { ICreateQuotation } from "@/contexts/quotations/interfaces";

const createQuotationSchema = yup.object({
  niche: yup.string().required("O campo 'Nicho' é obrigatório"),
  includesEvent: yup.boolean().notRequired(),
  engagementRate: yup
    .number()
    .nullable()
    .transform((_, originalValue) => {
      if (originalValue === "" || originalValue === "0,00") {
        return null;
      }

      const numeric = Number(
        originalValue.replace(/\./g, "").replace(",", ".")
      );

      return isNaN(numeric) ? null : numeric / 100;
    })
    .min(0, "A taxa de engajamento deve ser maior ou igual a 0,01%")
    .max(1, "A taxa de engajamento deve ser menor ou igual a 100%")
    .required("A taxa de engajamento deve ser maior ou igual a 0,01%"),
  tiktokFollowers: yup
    .number()
    .nullable()
    .transform((_, originalValue) => {
      if (originalValue === "" || originalValue === "0,00") {
        return null;
      }

      const numeric = Number(
        originalValue.replace(/\./g, "").replace(",", ".")
      );

      return isNaN(numeric) ? null : numeric;
    })
    .notRequired(),
  includesReelsCombo: yup.boolean().notRequired(),
  instagramFollowers: yup
    .number()
    .nullable()
    .transform((_, originalValue) => {
      if (originalValue === "" || originalValue === "0,00") {
        return null;
      }

      const numeric = Number(
        originalValue.replace(/\./g, "").replace(",", ".")
      );

      return isNaN(numeric) ? null : numeric;
    })
    .notRequired(),
  youtubeSubscribers: yup
    .number()
    .nullable()
    .transform((_, originalValue) => {
      if (originalValue === "" || originalValue === "0,00") {
        return null;
      }

      const numeric = Number(
        originalValue.replace(/\./g, "").replace(",", ".")
      );

      return isNaN(numeric) ? null : numeric;
    })
    .notRequired(),
  includesBoostRights: yup.boolean().notRequired(),
  includesImageRights: yup.boolean().notRequired(),
  includesTiktokVideo: yup.boolean().notRequired(),
  estimatedTiktokViews: yup
    .number()
    .nullable()
    .transform((_, originalValue) => {
      if (originalValue === "" || originalValue === "0,00") {
        return null;
      }

      const numeric = Number(
        originalValue.replace(/\./g, "").replace(",", ".")
      );

      return isNaN(numeric) ? null : numeric;
    })
    .notRequired(),
}) as yup.ObjectSchema<ICreateQuotation>;

export default createQuotationSchema;
