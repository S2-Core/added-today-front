import * as yup from "yup";

import { IEditUser } from "@/contexts/users/interfaces";

const updateUserSchema = yup.object({
  name: yup.string().notRequired(),
  phone: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
}) as yup.ObjectSchema<Partial<IEditUser>>;

export default updateUserSchema;
