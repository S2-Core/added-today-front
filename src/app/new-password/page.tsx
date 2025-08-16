"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TbArrowBackUp } from "react-icons/tb";

import { useAuth } from "@/contexts";

import Container from "@/components/container";
import Form from "@/components/form";
import Input from "@/components/input";

import newPasswordSchema from "@/validators/users/newPassword.validator";

import { INewPassowrd } from "@/contexts/auth/interfaces";

const NewPassword = () => {
  const navigate = useRouter();

  const { handleNewPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<INewPassowrd>({
    mode: "onChange",
    resolver: yupResolver(newPasswordSchema),
  });

  return (
    <Container
      Tag="main"
      className="flex flex-col justify-center items-center gap-15 h-screen"
    >
      <button
        type="button"
        onClick={() => navigate.back()}
        title="Voltar para tela inicial"
        tabIndex={-1}
        className="top-10 left-10 absolute hover:bg-gray-3 p-2 rounded-full text-light hover:text-secondary active:text-primary text-4xl transition-all duration-300 cursor-pointer"
      >
        <TbArrowBackUp />
      </button>

      <p className="sm:max-w-100 text-sm text-justify">
        Por meio desse formulário abaixo, defina uma nova senha para sua conta
      </p>

      <Form
        onSubmit={handleSubmit((data) => handleNewPassword(data, reset))}
        className="flex flex-col justify-center items-center gap-10"
      >
        <div className="flex flex-col gap-1 w-full sm:w-100">
          <Input
            name="password"
            label="Senha"
            placeholder="Digite sua nova senha"
            type="password"
            autoComplete="new-password"
            register={register}
            errors={errors}
          />

          <Input
            name="confirmPassword"
            label="Confirmar senha"
            placeholder="Confirme sua nova senha"
            type="password"
            autoComplete="off"
            hide={false}
            register={register}
            errors={errors}
          />
        </div>

        <button
          type="submit"
          title="Definir nova senha"
          tabIndex={-1}
          disabled={Object.keys(errors).length > 0}
          className="bg-primary hover:bg-primary/50 disabled:bg-secondary disabled:opacity-50 px-10 py-2 rounded-md w-full sm:w-fit text-light transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
        >
          Definir nova senha
        </button>
      </Form>
    </Container>
  );
};

export default NewPassword;
