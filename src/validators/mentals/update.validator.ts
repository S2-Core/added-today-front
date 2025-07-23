import * as yup from "yup";

import { IUpdateMental } from "@/contexts/mentals/interfaces";

const updateMentalSchema = yup.object({
  title: yup.string().notRequired(),
  theme: yup.string().notRequired(),
  status: yup.string().notRequired(),
  type: yup.string().notRequired(),
}) as yup.ObjectSchema<Partial<IUpdateMental>>;

export default updateMentalSchema;
