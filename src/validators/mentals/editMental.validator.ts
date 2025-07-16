import * as yup from "yup";

import { IMentals } from "@/contexts/mentals/interfaces";

const editMentalSchema = yup.object({
  title: yup.string().notRequired(),
  slug: yup.string().notRequired(),
}) as yup.ObjectSchema<Partial<IMentals>>;

export default editMentalSchema;
