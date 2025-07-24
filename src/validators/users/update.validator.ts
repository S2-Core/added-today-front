import * as yup from "yup";

import { IUpdateUser } from "@/contexts/users/interfaces";

const updateUserSchema = yup.object({
  name: yup.string().notRequired(),
  phone: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  role: yup.string().notRequired(),
  password: yup
    .string()
    .notRequired()
    .test("min-length", "A senha deve ter pelo menos 8 caracteres", (value) => {
      if (!value || value.trim() === "") return true;
      return value.length >= 8;
    })
    .test(
      "lowercase",
      "A senha deve conter pelo menos uma letra minúscula",
      (value) => {
        if (!value || value.trim() === "") return true;
        return /[a-z]/.test(value);
      }
    )
    .test(
      "uppercase",
      "A senha deve conter pelo menos uma letra maiúscula",
      (value) => {
        if (!value || value.trim() === "") return true;
        return /[A-Z]/.test(value);
      }
    )
    .test("number", "A senha deve conter pelo menos um número", (value) => {
      if (!value || value.trim() === "") return true;
      return /\d/.test(value);
    })
    .test(
      "special-char",
      "A senha deve conter pelo menos um caractere especial (@$!%*?&)",
      (value) => {
        if (!value || value.trim() === "") return true;
        return /[@$!%*?&]/.test(value);
      }
    ),
  confirmPassword: yup.string().when("password", {
    is: (value: string | undefined) => !!value && value.trim() !== "",
    then: (schema) =>
      schema
        .required("A confirmação de senha é obrigatória")
        .oneOf([yup.ref("password")], "As senhas não coincidem"),
    otherwise: (schema) => schema.notRequired(),
  }),
}) as yup.ObjectSchema<Partial<IUpdateUser>>;

export default updateUserSchema;
