import * as yup from "yup";

import { ICreateMental } from "@/contexts/mentals/interfaces";

const createMentalSchema = yup.object({
  title: yup.string().required('O "Nome do Mental" é um campo obrigatório'),
  theme: yup.string().required('O "Tema do Mental" é um campo obrigatório'),
  status: yup.string().required('O "Status do Mental" é um campo obrigatório'),
  type: yup.string().required('O "Tipo do Mental" é um campo obrigatório'),
  creatorEditable: yup
    .boolean()
    .required('O campo "Editável pelo Criador" é obrigatório'),
}) as yup.ObjectSchema<ICreateMental>;

export default createMentalSchema;
