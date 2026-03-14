import * as yup from "yup";

import { IItems } from "@/components/select/interfaces";
import { ICardCheckout, IPixCheckout } from "@/contexts/billings/interfaces";

export enum CheckoutMode {
  ONE_TIME = "ONE_TIME",
  RECURRING = "RECURRING",
}

export const checkoutModeItems: IItems<CheckoutMode>[] = [
  { label: "Único", value: CheckoutMode.ONE_TIME },
  { label: "Recorrente", value: CheckoutMode.RECURRING },
];

export const pixCheckoutSchema = yup.object({
  customerTaxId: yup
    .string()
    .required('O "Documento" é um campo obrigatório')
    .min(11, 'O "Documento" deve ter no mínimo 11 caracteres')
    .max(14, 'O "Documento" deve ter no máximo 14 caracteres'),
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
  holder: yup.string().required('O "Nome do Titular" é um campo obrigatório'),
  number: yup
    .string()
    .required('O "Número do Cartão" é um campo obrigatório')
    .min(10, 'O "Numero do Cartão" deve ter no mínimo 10 caracteres'),
  expirationDate: yup
    .string()
    .required("A validade é obrigatória")
    .matches(/^\d{2}\/\d{4}$/, "Use o formato MM/AAAA")
    .test("valid-month", "O mês deve estar entre 01 e 12", (value) => {
      if (!value) return false;
      const [monthStr] = value.split("/");
      const month = Number(monthStr);
      return month >= 1 && month <= 12;
    })
    .test("not-expired", "O cartão está com a validade expirada", (value) => {
      if (!value) return false;

      const [monthStr, yearStr] = value.split("/");
      const month = Number(monthStr);
      const year = Number(yearStr);

      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      if (year < currentYear || (year === currentYear && month < currentMonth))
        return false;

      return true;
    }),
  cvv: yup
    .string()
    .required('O "CVV" é um campo obrigatório')
    .min(3, 'O "CVV" deve ter no mínimo 3 caracteres')
    .max(4, 'O "CVV" deve ter no máximo 4 caracteres'),
}) as yup.ObjectSchema<ICardCheckout>;
