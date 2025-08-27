import * as yup from "yup";

import { ICreateQuotation } from "@/contexts/quotations/interfaces";

const createQuotationSchema = yup.object({
  niche: yup.string().required('O "Nincho" é um campo obrigatório'),
  includesEvent: yup
    .boolean()
    .required('O "Incluir Evento" é um campo obrigatório'),
  engagementRate: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(0, "A taxa de engajamento deve ser maior ou igual a 0")
    .max(1.0, "A taxa de engajamento deve ser menor ou igual a 1.00")
    .required('O "Taxa de Engajamento" é um campo obrigatório'),
  tiktokFollowers: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required('O "Seguidores no TikTok" é um campo obrigatório'),
  includesReelsCombo: yup
    .boolean()
    .required('O "Incluir Combo de Reels" é um campo obrigatório'),
  instagramFollowers: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required('O "Seguidores no Instagram" é um campo obrigatório'),
  youtubeSubscribers: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required('O "Inscritos no YouTube" é um campo obrigatório'),
  includesBoostRights: yup
    .boolean()
    .required('O "Incluir Direitos de Boost" é um campo obrigatório'),
  includesImageRights: yup
    .boolean()
    .required('O "Incluir Direitos de Imagem" é um campo obrigatório'),
  includesTiktokVideo: yup
    .boolean()
    .required('O "Incluir Video no TikTok" é um campo obrigatório'),
  estimatedTiktokViews: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required('O "Visualizações Estimada no TikTok" é um campo obrigatório'),
}) as yup.ObjectSchema<ICreateQuotation>;

export default createQuotationSchema;
