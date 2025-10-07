"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TbArrowBackUp } from "react-icons/tb";
import { motion, easeOut } from "motion/react";

import { useAuth } from "@/contexts";

import Container from "@/components/container";
import Form from "@/components/form";
import Input from "@/components/input";

import newPasswordSchema from "@/validators/users/newPassword.validator";

import { INewPassowrd } from "@/contexts/auth/interfaces";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const Client = () => {
  const [navigate, search] = [useRouter(), useSearchParams()];

  const { hash } = Array.from(search.entries()).reduce<
    Record<string, string | string[]>
  >((acc, [key, value]) => {
    key in acc
      ? (acc[key] = Array.isArray(acc[key])
          ? [...acc[key], value]
          : [acc[key] as string, value])
      : (acc[key] = value);

    return acc;
  }, {});

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

  if (!hash) navigate.push("/");

  return (
    <Container
      Tag="main"
      className="flex flex-col justify-center items-center gap-15 h-screen"
    >
      <motion.button
        type="button"
        onClick={() => navigate.back()}
        title="Voltar para tela inicial"
        tabIndex={-1}
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9, rotate: 5 }}
        className="top-5 left-5 absolute hover:bg-gray-3 p-2 rounded-full text-foreground hover:text-tertiary active:text-primary text-4xl transition-all duration-300 cursor-pointer"
      >
        <TbArrowBackUp />
      </motion.button>

      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="flex flex-col items-center gap-10 w-full"
      >
        <motion.p
          variants={fadeUp}
          className="sm:max-w-100 text-sm text-center select-none"
        >
          Por meio desse formulário abaixo, defina uma nova senha para sua
          conta.
        </motion.p>

        <Form
          onSubmit={handleSubmit((data) =>
            handleNewPassword(data, Array.isArray(hash) ? hash[0] : hash, reset)
          )}
          className="flex flex-col justify-center items-center gap-10 w-full sm:w-100"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-3 w-full"
          >
            <motion.div variants={fadeUp}>
              <Input
                name="password"
                label="Senha"
                placeholder="Digite sua nova senha"
                type="password"
                autoComplete="new-password"
                register={register}
                errors={errors}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
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
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col items-end gap-5 w-full sm:w-100"
          >
            <motion.button
              type="submit"
              title="Definir nova senha"
              whileTap={!Object.keys(errors).length ? { scale: 0.96 } : {}}
              disabled={!!Object.keys(errors).length}
              className="bg-secondary hover:bg-primary active:bg-primary/70 disabled:bg-error disabled:opacity-50 px-10 py-2 rounded-md w-full text-light transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
            >
              Definir nova senha
            </motion.button>
          </motion.div>
        </Form>
      </motion.div>
    </Container>
  );
};

export default Client;
