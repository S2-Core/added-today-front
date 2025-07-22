import * as yup from "yup";

import { ICreateMental } from "@/contexts/mentals/interfaces";

const createMentalSchema = yup.object({
  title: yup.string().required("O nome é um campo obrigatório"),
  theme: yup.string().required("O tema é um campo obrigatório"),
}) as yup.ObjectSchema<ICreateMental>;

export default createMentalSchema;
