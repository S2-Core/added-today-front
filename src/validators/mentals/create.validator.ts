import * as yup from "yup";

import { ICreateMental } from "@/contexts/mentals/interfaces";
import { MentalStatus, MentalType } from "@/constants/mentals";

const createMentalSchema = yup.object({
  title: yup.string().required('O "Nome do Mental" é um campo obrigatório'),
  slug: yup
    .string()
    .required('O "Link de vizualização do Mental" é um campo obrigatório'),
  theme: yup.string().required('O "Tema do Mental" é um campo obrigatório'),
  status: yup
    .mixed<MentalStatus>()
    .oneOf(Object.values(MentalStatus), "Status inválido")
    .required('O "Status do Mental" é um campo obrigatório'),
  type: yup
    .mixed<MentalType>()
    .oneOf(Object.values(MentalType), "Tipo inválido")
    .required('O "Tipo do Mental" é um campo obrigatório'),
  creatorEditable: yup
    .boolean()
    .required('O campo "Editável pelo Criador" é obrigatório'),
}) as yup.ObjectSchema<ICreateMental>;

export default createMentalSchema;
