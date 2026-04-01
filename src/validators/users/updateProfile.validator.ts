import * as yup from "yup";

import { IUpdateProfile } from "@/contexts/users/interfaces";

const updateProfileSchema = yup
  .object({
    name: yup
      .string()
      .required('O "Nome do Usuário" é um campo obrigatório')
      .min(2, "O nome deve ter pelo menos 2 caracteres"),
    phone: yup
      .string()
      .required('O "Telefone do Usuário" é um campo obrigatório'),
    email: yup
      .string()
      .email("Digite um email válido")
      .required('O "Email do Usuário" é um campo obrigatório'),
    instagramHandle: yup
      .string()
      .required("O Instagram é um campo obrigatório"),
    tiktokHandle: yup.string().notRequired(),
    youtubeHandle: yup.string().notRequired(),
    contentTopic: yup.string().notRequired(),

    currentPassword: yup.string().notRequired(),

    newPassword: yup
      .string()
      .notRequired()
      .test(
        "min-length",
        "A senha deve ter pelo menos 8 caracteres",
        (value) => {
          if (!value || value.trim() === "") return true;

          return value.length >= 8;
        },
      )
      .test(
        "lowercase",
        "A senha deve conter pelo menos uma letra minúscula",
        (value) => {
          if (!value || value.trim() === "") return true;

          return /[a-z]/.test(value);
        },
      )
      .test(
        "uppercase",
        "A senha deve conter pelo menos uma letra maiúscula",
        (value) => {
          if (!value || value.trim() === "") return true;

          return /[A-Z]/.test(value);
        },
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
        },
      ),

    confirmNewPassword: yup.string().when("newPassword", {
      is: (value: string | undefined) => !!value && value.trim() !== "",
      then: (schema) =>
        schema
          .required("A confirmação de senha é obrigatória")
          .oneOf([yup.ref("newPassword")], "As senhas não coincidem"),
      otherwise: (schema) => schema.notRequired(),
    }),
  })
  .test(
    "password-change-pair",
    "Para alterar a senha, informe a senha atual e a nova senha",
    function (values) {
      const currentPassword = values?.currentPassword?.trim() ?? "";
      const newPassword = values?.newPassword?.trim() ?? "";

      const hasCurrent = currentPassword.length > 0;
      const hasNew = newPassword.length > 0;

      if (!hasCurrent && !hasNew) return true;

      if (hasCurrent && hasNew) return true;

      if (hasCurrent && !hasNew)
        return this.createError({
          path: "newPassword",
          message: "A nova senha é obrigatória",
        });

      return this.createError({
        path: "currentPassword",
        message: "A senha atual é obrigatória para alterar a senha",
      });
    },
  ) as yup.ObjectSchema<IUpdateProfile>;

export default updateProfileSchema;
