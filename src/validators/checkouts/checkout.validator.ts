import * as yup from "yup";

import { IItems } from "@/components/select/interfaces";
import { ICardCheckout, IPixCheckout } from "@/contexts/billings/interfaces";

export enum CheckoutMode {
  ONE_TIME = "ONE_TIME",
  RECURRING = "RECURRING",
}

export const checkoutModeItems: IItems<CheckoutMode>[] = [
  { label: "Único", value: CheckoutMode.ONE_TIME },
  // { label: "Recorrente", value: CheckoutMode.RECURRING },
];

export const pixCheckoutSchema = yup.object({
  customerTaxId: yup
    .string()
    .required('O "Documento" é um campo obrigatório')
    .min(11, 'O "Documento" deve ter no mínimo 11 caracteres')
    .max(14, 'O "Documento" deve ter no máximo 14 caracteres'),
  mode: yup
    .mixed<CheckoutMode>()
    .oneOf(
      Object.values(CheckoutMode),
      'O "Modo de Assinatura" é um campo obrigatório',
    )
    .required('O "Modo de Assinatura" é um campo obrigatório'),
}) as yup.ObjectSchema<IPixCheckout>;

export const cardCheckoutSchema = yup.object({
  customerTaxId: yup
    .string()
    .required('O "Documento" é um campo obrigatório')
    .min(11, 'O "Documento" deve ter no mínimo 11 caracteres')
    .max(14, 'O "Documento" deve ter no máximo 14 caracteres'),
  mode: yup
    .mixed<CheckoutMode>()
    .oneOf(
      Object.values(CheckoutMode),
      'O "Modo de Assinatura" é um campo obrigatório',
    )
    .required('O "Modo de Assinatura" é um campo obrigatório'),
  cardEncrypted: yup
    .string()
    .required('O "Número do Cartão" é um campo obrigatório')
    .min(10, 'O "Numero do Cartão" deve ter no mínimo 10 caracteres'),
}) as yup.ObjectSchema<ICardCheckout>;
