"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion, easeOut } from "motion/react";
import Cookies from "js-cookie";

import { useAnalytics, useAuth } from "@/contexts";

import Container from "@/components/container";
import Form from "@/components/form";
import Input from "@/components/input";
import FixedModal from "@/components/fixedModal";

import {
  mapLoginFormSubmittedEventProperties,
  mapLoginPageViewedEventProperties,
  mapLoginStartedEventProperties,
  mapPasswordResetRequestedEventProperties,
  mapValidationFailedEventProperties,
} from "@/lib/analytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";

import loginSchema from "@/validators/users/login.validator";
import recoverySchema from "@/validators/users/recovery.validator";

import { ILogin, IRecovery } from "@/contexts/auth/interfaces";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const Client = () => {
  const path = usePathname();

  const { trackEvent } = useAnalytics();
  const { handleLogin, handleSendRecoveryEmail } = useAuth();

  const [recoverPasswordModal, setRecoverPasswordModal] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const hasTrackedLoginStarted = useRef<boolean>(false);

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

  useEffect(() => {
    trackEvent(
      ANALYTICS_EVENTS.LOGIN_PAGE_VIEWED,
      mapLoginPageViewedEventProperties(path),
    );
  }, [path, trackEvent]);

  useEffect(() => {
    const invalidFields = Object.keys(errors);

    if (!invalidFields.length) return;

    trackEvent(
      ANALYTICS_EVENTS.LOGIN_VALIDATION_FAILED,
      mapValidationFailedEventProperties({
        path,
        screen: "login",
        routeName: "login",
        form: "login",
        invalidFields,
      }),
    );
  }, [errors, path, trackEvent]);

  const handleFirstInteraction = (): void => {
    if (hasTrackedLoginStarted.current) return;
    hasTrackedLoginStarted.current = true;

    trackEvent(
      ANALYTICS_EVENTS.LOGIN_STARTED,
      mapLoginStartedEventProperties(path),
    );
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      <Container
        Tag="main"
        className="flex flex-col justify-center items-center gap-8 min-h-screen"
      >
        <motion.figure
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            alt="Logo"
            src="/images/logo.png"
            width={300}
            height={40}
            priority
            objectFit="cover"
            className="w-50 md:w-75 animate-pulse"
          />

          <figcaption hidden aria-hidden className="hidden">
            Logo
          </figcaption>
        </motion.figure>

        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-sm text-foreground/60 text-xs md:text-sm text-center select-none"
        >
          Bem-vindo ao sistema operacional inteligente que transforma criadores
          em empresas.
        </motion.span>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center items-center w-full"
        >
          <Form
            onSubmit={handleSubmit(async (data) => {
              trackEvent(
                ANALYTICS_EVENTS.LOGIN_FORM_SUBMITTED,
                mapLoginFormSubmittedEventProperties(path),
              );

              await handleLogin(data).then(() => {
                reset();
              });
            })}
            className="flex flex-col justify-center items-center gap-4"
          >
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-3 w-full sm:w-100"
            >
              <Input
                name="email"
                label="Email"
                placeholder="Digite seu email"
                type="email"
                autoComplete="email"
                register={register}
                errors={errors}
                onFocus={handleFirstInteraction}
              />

              <Input
                name="password"
                label="Senha"
                placeholder="Digite sua senha"
                type="password"
                autoComplete="current-password"
                register={register}
                errors={errors}
                onFocus={handleFirstInteraction}
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center gap-5 w-full sm:w-100"
            >
              <motion.button
                type="button"
                title="Esqueceu a senha?"
                onClick={() => setRecoverPasswordModal(true)}
                className="w-fit text-secondary hover:text-primary active:text-primary/50 text-sm hover:underline transition-all duration-300 cursor-pointer"
              >
                Esqueceu a senha?
              </motion.button>

              <motion.button
                type="submit"
                title="Fazer login"
                whileTap={!Object.keys(errors).length ? { scale: 0.96 } : {}}
                disabled={!!Object.keys(errors).length}
                className="bg-secondary hover:bg-primary active:bg-primary/70 disabled:bg-error disabled:opacity-50 px-10 py-2 rounded-md w-full text-light transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
              >
                Fazer login
              </motion.button>

              <motion.div
                variants={fadeUp}
                title="Registrar-se"
                className="flex justify-center gap-1 w-full text-foreground/60 text-sm whitespace-nowrap select-none"
              >
                <p>Não possui uma conta?</p>

                <Link
                  href="/register"
                  className="w-fit text-secondary hover:text-primary active:text-primary/50 hover:underline transition-all duration-300 cursor-pointer"
                >
                  [Registrar-se]
                </Link>
              </motion.div>
            </motion.div>
          </Form>
        </motion.div>
      </Container>

      {recoverPasswordModal && (
        <FixedModal
          isOpen={recoverPasswordModal}
          close={() => {
            setRecoverPasswordModal(false);
            recoveryReset();
          }}
        >
          <div className="flex flex-col gap-5">
            <p className="text-sm text-justify">
              Digite seu email no campo abaixo, e enviaremos um link para
              redefinir sua senha.
            </p>

            <Form
              onSubmit={recoveryHandleSubmit(async (data) => {
                trackEvent(
                  ANALYTICS_EVENTS.PASSWORD_RESET_REQUESTED,
                  mapPasswordResetRequestedEventProperties(path),
                );

                await handleSendRecoveryEmail(data);
                recoveryReset();
                setRecoverPasswordModal(false);
              })}
              className="flex flex-col items-center gap-5 w-full"
            >
              <Input
                name="email"
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
                disabled={!!Object.keys(recoveryErrors).length}
                className="bg-tertiary hover:bg-primary active:bg-primary/70 disabled:bg-error disabled:opacity-50 px-10 py-2 rounded-md w-full sm:w-fit text-light transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
              >
                Enviar Email
              </button>
            </Form>
          </div>
        </FixedModal>
      )}
    </>
  );
};

export default Client;
