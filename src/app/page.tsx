"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "@/contexts";

import Container from "@/components/container";
import Form from "@/components/form";
import Input from "@/components/input";
import FixedModal from "@/components/fixedModal";

import loginSchema from "@/validators/users/login.validator";
import recoverySchema from "@/validators/users/recovery.validator";

import { ILogin, IRecovery } from "@/contexts/auth/interfaces";

const Login = () => {
  const { handleLogin, handleSendRecoveryEmail } = useAuth();

  const [recoverPasswordModal, setRecoverPasswordModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILogin>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const {
    register: recoveryRegister,
    handleSubmit: recoveryHandleSubmit,
    formState: { errors: recoveryErrors },
    reset: recoveryReset,
  } = useForm<IRecovery>({
    mode: "onChange",
    resolver: yupResolver(recoverySchema),
  });

  return (
    <>
      <Container
        Tag={"main"}
        className="flex flex-col justify-center items-center gap-10 h-screen"
      >
        <figure className="relative mx-auto w-full max-w-100 h-full max-h-30 overflow-hidden">
          <Image
            src="/images/logo.png"
            alt="Logo"
            fill
            className="mx-auto object-cover"
          />
          <figcaption className="hidden w-full">Logo</figcaption>
        </figure>

        <Form
          onSubmit={handleSubmit((data) => handleLogin(data, reset))}
          className="flex flex-col justify-center items-center gap-1"
        >
          <div className="flex flex-col gap-1 w-full sm:w-100">
            <Input
              name="email"
              label="Email"
              placeholder="Digite seu email"
              type="email"
              autoComplete="email"
              register={register}
              errors={errors}
            />

            <Input
              name="password"
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
              autoComplete="current-password"
              register={register}
              errors={errors}
            />
          </div>

          <div className="flex flex-col items-center gap-10 w-full sm:w-100">
            <button
              type="button"
              title="Esqueceu a senha?"
              tabIndex={-1}
              onClick={() => setRecoverPasswordModal(true)}
              className="w-fit hover:text-tertiary active:text-tertiary/50 text-sm hover:underline transition-all duration-300 cursor-pointer"
            >
              Esqueceu a senha?
            </button>

            <button
              type="submit"
              title="Fazer login"
              tabIndex={-1}
              disabled={Object.keys(errors).length > 0}
              className="bg-primary hover:bg-primary/50 disabled:bg-secondary disabled:opacity-50 px-10 py-2 rounded-md w-full sm:w-fit text-light transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
            >
              Fazer login
            </button>
          </div>
        </Form>
      </Container>

      <FixedModal
        isOpen={recoverPasswordModal}
        close={() => {
          setRecoverPasswordModal(false);
          recoveryReset();
        }}
      >
        <p className="text-sm text-justify">
          Digite seu email no campo abaixo, e enviaremos um link para redefinir
          sua senha.
        </p>

        <Form
          onSubmit={recoveryHandleSubmit((data) =>
            handleSendRecoveryEmail(data, recoveryReset)
          )}
          className="flex flex-col items-center gap-5 w-full"
        >
          <Input
            name="recoveryEmail"
            label=""
            placeholder="Digite seu Email para redefinir a senha da sua conta"
            type="email"
            autoComplete="email"
            register={recoveryRegister}
            errors={recoveryErrors}
            className="w-full"
          />

          <button
            type="submit"
            title="Enviar Email"
            tabIndex={-1}
            disabled={Object.keys(recoveryErrors).length > 0}
            className="bg-primary hover:bg-primary/50 disabled:bg-secondary disabled:opacity-50 px-10 py-2 rounded-md w-full sm:w-fit text-light transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
          >
            Enviar Email
          </button>
        </Form>
      </FixedModal>
    </>
  );
};

export default Login;
