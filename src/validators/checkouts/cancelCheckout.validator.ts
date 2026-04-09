import * as yup from "yup";

export const cancelCheckoutSchema = yup.object({
  reason: yup
    .string()
    .required('O "Motivo do Cancelamento" é um campo obrigatório'),
}) as yup.ObjectSchema<{ reason: string }>;
