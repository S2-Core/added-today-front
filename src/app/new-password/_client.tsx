"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TbArrowBackUp } from "react-icons/tb";
import { motion, easeOut } from "motion/react";

import { useAnalytics, useAuth } from "@/contexts";

import Container from "@/components/container";
import Form from "@/components/form";
import Input from "@/components/input";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import {
  mapPasswordResetPageViewedEventProperties,
  mapPasswordResetRequestedEventProperties,
  mapPasswordResetSubmittedEventProperties,
  mapValidationFailedEventProperties,
} from "@/lib/analytics";

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
  const [path, navigate, search] = [
    usePathname(),
    useRouter(),
    useSearchParams(),
  ];

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

  const { trackEvent } = useAnalytics();
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

  const hasTrackedPasswordResetRequested = useRef<boolean>(false);

  useEffect(() => {
    trackEvent(
      ANALYTICS_EVENTS.PASSWORD_RESET_PAGE_VIEWED,
      mapPasswordResetPageViewedEventProperties(path),
    );
  }, [path, trackEvent]);

  const handlePasswordResetRequested = () => {
    if (hasTrackedPasswordResetRequested.current) return;

    hasTrackedPasswordResetRequested.current = true;

    trackEvent(
      ANALYTICS_EVENTS.PASSWORD_RESET_REQUESTED,
      mapPasswordResetRequestedEventProperties(path),
    );
  };

  useEffect(() => {
    const invalidFields = Object.keys(errors);

    if (!invalidFields.length) return;

    trackEvent(
      ANALYTICS_EVENTS.PASSWORD_RESET_VALIDATION_FAILED,
      mapValidationFailedEventProperties({
        path,
        screen: "password_reset",
        routeName: "password_reset",
        form: "password_reset",
        invalidFields,
      }),
    );
  }, [errors]);

  if (!hash) navigate.push("/");

  return (
    <Container
      Tag="main"
      className="flex flex-col justify-center items-center gap-15 h-screen"
    >
      <Link
        href="/"
        title="Voltar para tela inicial"
        tabIndex={-1}
        className="top-5 left-5 absolute hover:bg-gray-3 p-2 rounded-full text-foreground hover:text-secondary active:text-primary text-4xl transition-all duration-300 cursor-pointer"
      >
        <TbArrowBackUp />
      </Link>

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
          onSubmit={handleSubmit(async (data) => {
            trackEvent(
              ANALYTICS_EVENTS.PASSWORD_RESET_SUBMITTED,
              mapPasswordResetSubmittedEventProperties(path),
            );

            await handleNewPassword(
              data,
              Array.isArray(hash) ? hash[0] : hash,
              reset,
            );
          })}
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
                onFocus={handlePasswordResetRequested}
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
                onFocus={handlePasswordResetRequested}
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
