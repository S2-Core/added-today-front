"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { WiStars } from "react-icons/wi";
import { AnimatePresence, motion, easeOut } from "motion/react";

import { useAnalytics, useAuth, useBillings } from "@/contexts";

import Container from "@/components/container";
import Input from "@/components/input";
import Textarea from "@/components/textarea";
import RegisterTabs from "@/components/registerTabs";
import RegisterCheckout from "@/components/registerCheckout";

import {
  mapRegisterFormSubmittedEventProperties,
  mapRegisterPageViewedEventProperties,
  mapRegisterStartedEventProperties,
  mapValidationFailedEventProperties,
} from "@/lib/analytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";

import { planBenefitsExamples } from "@/constants/plans";

import registerSchema from "@/validators/users/register.validator";

import { ILoginResponse, IRegister } from "@/contexts/auth/interfaces";
import { IUser } from "@/contexts/users/interfaces";

export type IStage = 1 | 2 | 3;
export type IPaymentMethod = "CARD" | "PIX" | null;

const Client = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const pageTransition = {
    hidden: { opacity: 0, y: 20, scale: 0.985 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.35, ease: easeOut },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.99,
      transition: { duration: 0.2, ease: easeOut },
    },
  };

  const STEP_FIELDS: Record<IStage, (keyof IRegister)[]> = {
    1: [
      "name",
      "instagramHandle",
      "tiktokHandle",
      "youtubeHandle",
      "contentTopic",
    ],
    2: ["phone", "email", "password", "confirmPassword"],
    3: [],
  };

  const [path, navigate] = [usePathname(), useRouter()];

  const [stage, setStage] = useState<IStage>(3);
  const [unlocked2, setUnlocked2] = useState<boolean>(false);
  const [finalSubmitted, setFinalSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [createdUser, setCreatedUser] = useState<IUser | null>(null);
  const [createdUserAuth, setCreatedUserAuth] = useState<ILoginResponse | null>(
    null,
  );
  const [paymentMethod, setPaymentMethod] = useState<IPaymentMethod>(null);

  const formRef = useRef<HTMLFormElement | null>(null);
  const hasTrackedRegisterStarted = useRef<boolean>(false);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<IRegister>({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
    shouldUnregister: false,
  });

  const { trackEvent } = useAnalytics();
  const { handleRegisterUser } = useAuth();
  const { allUIPlans } = useBillings();

  useEffect(() => {
    trackEvent(
      ANALYTICS_EVENTS.REGISTER_PAGE_VIEWED,
      mapRegisterPageViewedEventProperties(path),
    );
  }, [path, trackEvent]);

  const handleFirstInteraction = (): void => {
    if (hasTrackedRegisterStarted.current) return;
    hasTrackedRegisterStarted.current = true;

    trackEvent(
      ANALYTICS_EVENTS.REGISTER_STARTED,
      mapRegisterStartedEventProperties(path),
    );
  };

  useEffect(() => {
    const invalidFields = Object.keys(errors);

    if (!invalidFields.length) return;

    trackEvent(
      ANALYTICS_EVENTS.REGISTER_VALIDATION_FAILED,
      mapValidationFailedEventProperties({
        path,
        screen: "register",
        routeName: "register",
        form: "register",
        invalidFields,
      }),
    );
  }, [errors]);

  const validateStep = async (stage: IStage): Promise<boolean> => {
    const fields = STEP_FIELDS[stage];

    return fields.length ? await trigger(fields, { shouldFocus: true }) : true;
  };

  const handleNext = async (): Promise<void> => {
    const ok = await validateStep(stage);

    if (!ok) return;

    if (stage === 1) {
      setUnlocked2(true);
      setStage(2);

      return;
    }

    if (stage === 2) {
      formRef.current?.requestSubmit();

      return;
    }
  };

  const onSubmit = async (data: IRegister): Promise<void> => {
    const formattedData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => !!value.trim()),
    ) as IRegister;

    if (formattedData.instagramHandle)
      formattedData.instagramHandle =
        formattedData.instagramHandle.at(0) === "@"
          ? formattedData.instagramHandle.slice(1)
          : formattedData.instagramHandle;

    if (formattedData.tiktokHandle)
      formattedData.tiktokHandle =
        formattedData.tiktokHandle.at(0) === "@"
          ? formattedData.tiktokHandle.slice(1)
          : formattedData.tiktokHandle;

    if (formattedData.youtubeHandle)
      formattedData.youtubeHandle =
        formattedData.youtubeHandle.at(0) === "@"
          ? formattedData.youtubeHandle.slice(1)
          : formattedData.youtubeHandle;

    try {
      setLoading(true);

      trackEvent(
        ANALYTICS_EVENTS.REGISTER_FORM_SUBMITTED,
        mapRegisterFormSubmittedEventProperties(path),
      );

      const newUser = (await handleRegisterUser(formattedData)) ?? null;

      setCreatedUser({
        ...(newUser ? newUser.user : formattedData),
        name: (newUser ? newUser.user : formattedData).name
          .split(" ")[0]
          .trim(),
      } as IUser);
      setCreatedUserAuth(newUser ?? null);

      reset();
      setLoading(false);
      setFinalSubmitted(true);
      setStage(3);
    } catch (error) {
      setLoading(false);
      setStage(1);

      console.error(error);
    }
  };

  const disableNext =
    loading || STEP_FIELDS[stage].some((field) => errors[field]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="shadow-md pb-3"
      >
        <Container Tag="header">
          <motion.figure
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex justify-center md:justify-start"
          >
            <Image
              alt="Logo"
              src="/images/logo.png"
              width={200}
              height={40}
              priority
              onClick={() => navigate.push("/")}
              className="w-50 cursor-pointer"
            />
            <figcaption hidden aria-hidden className="hidden">
              Logo
            </figcaption>
          </motion.figure>
        </Container>

        <RegisterTabs
          stage={stage}
          unlocked2={unlocked2}
          finalSubmitted={finalSubmitted}
          loading={loading}
          setStage={setStage}
        />
      </motion.div>

      <Container Tag="main" className="flex justify-center pt-10 md:pt-20">
        <AnimatePresence mode="wait">
          {stage === 1 || stage === 2 ? (
            <motion.form
              key={`stage-form-${stage}`}
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="flex justify-center w-full h-fit"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <motion.div
                variants={pageTransition}
                initial="hidden"
                animate="show"
                exit="exit"
                className="relative flex flex-col gap-10 shadow-md p-5 border border-primary/30 rounded-xl w-full max-w-md h-full"
              >
                <motion.div variants={fadeUp}>
                  {stage === 1 ? (
                    <div className="flex flex-col gap-2 select-none">
                      <h1 className="font-title text-2xl md:text-3xl">
                        Vamos nos conhecer!
                      </h1>

                      <p className="text-xs md:text-sm">
                        Conte-nos um pouco sobre você e suas redes sociais
                      </p>
                    </div>
                  ) : (
                    <div className="select-none">
                      <div className="flex items-start gap-5 mb-90 sm:mb-65">
                        <div className="flex justify-center items-center gap-2 bg-success/20 rounded-full w-full max-w-10 h-full max-h-10 overflow-hidden">
                          <WiStars className="text-success" size={80} />
                        </div>

                        <h2 className="font-title text-xl">
                          Você está a um passo de se tornar um creator pro 🚀
                        </h2>
                      </div>

                      <div className="top-30 sm:top-23 left-0 absolute flex flex-col gap-4 bg-primary/20 p-5 w-full">
                        <p className="font-title font-bold">
                          Crie sua conta e tenha acesso a recursos de IA e
                          benefícios:
                        </p>

                        <ul className="gap-3 grid grid-cols-2">
                          {planBenefitsExamples.map(
                            ({ id, text, description }) => (
                              <li
                                key={id}
                                className="flex flex-col gap-1 text-sm"
                              >
                                <span className="font-bold">{text}</span>

                                <span className="text-foreground/70 text-xs">
                                  {description}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </motion.div>

                {stage === 1 ? (
                  <motion.div variants={fadeUp} className="flex flex-col gap-2">
                    <Input<IRegister>
                      name="name"
                      label="Nome Completo"
                      placeholder="Como você se chama?"
                      register={register}
                      errors={errors}
                      type="text"
                      required
                      onFocus={handleFirstInteraction}
                    />

                    <Input<IRegister>
                      name="instagramHandle"
                      label="Instagram"
                      placeholder="@seu_usuario"
                      register={register}
                      errors={errors}
                      type="text"
                      required
                      onFocus={handleFirstInteraction}
                    />

                    <Input<IRegister>
                      name="tiktokHandle"
                      label="TikTok"
                      placeholder="@seu_usuario"
                      register={register}
                      errors={errors}
                      type="text"
                      onFocus={handleFirstInteraction}
                    />

                    <Input<IRegister>
                      name="youtubeHandle"
                      label="YouTube"
                      placeholder="@seu_canal"
                      register={register}
                      errors={errors}
                      type="text"
                      onFocus={handleFirstInteraction}
                    />

                    <Textarea
                      name="contentTopic"
                      label="Você cria conteúdo sobre o quê?"
                      placeholder="Ex: Moda e lifestyle, Fitness e saúde, Tecnologia, Humor..."
                      register={register}
                      required
                      errors={errors}
                      onFocus={handleFirstInteraction}
                    />
                  </motion.div>
                ) : (
                  <motion.div variants={fadeUp} className="flex flex-col gap-2">
                    <Input<IRegister>
                      name="email"
                      label="E-mail"
                      placeholder="seu@email.com"
                      register={register}
                      errors={errors}
                      type="email"
                      required
                      onFocus={handleFirstInteraction}
                    />

                    <div className="flex flex-col gap-2">
                      <Input<IRegister>
                        name="phone"
                        label="WhatsApp"
                        placeholder="+55 11 99999-9999"
                        register={register}
                        errors={errors}
                        type="tel"
                        required
                        onFocus={handleFirstInteraction}
                      />

                      <div className="flex items-start gap-2 mb-2 text-xs select-none">
                        <span>💬</span>

                        <span className="text-foreground/70">
                          Usaremos o WhatsApp para enviar oportunidades de
                          recebidos e novidades exclusivas.
                        </span>
                      </div>
                    </div>

                    <Input<IRegister>
                      name="password"
                      label="Senha"
                      placeholder="********"
                      register={register}
                      errors={errors}
                      type="password"
                      required
                      onFocus={handleFirstInteraction}
                    />

                    <Input<IRegister>
                      name="confirmPassword"
                      label="Confirme sua senha"
                      placeholder="********"
                      register={register}
                      errors={errors}
                      type="password"
                      hide={false}
                      required
                      onFocus={handleFirstInteraction}
                    />

                    <div className="flex items-center gap-2 bg-primary/10 p-5 rounded-lg select-none">
                      <span>🔒</span>

                      <span className="text-[11px] text-foreground/70">
                        Seus dados estão seguros conosco e nunca serão
                        compartilhados com terceiros sem sua autorização.
                      </span>
                    </div>
                  </motion.div>
                )}

                <motion.div
                  variants={fadeUp}
                  className="gap-2 grid grid-cols-1 md:grid-cols-3"
                >
                  <motion.button
                    tabIndex={-1}
                    type="button"
                    disabled={loading}
                    onClick={() => {
                      reset();
                      setStage(1);
                      setFinalSubmitted(false);
                      setCreatedUser(null);
                      setUnlocked2(false);
                      setLoading(false);
                      setPaymentMethod("CARD");
                      navigate.push("/");
                    }}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                    className="col-span-1 hover:bg-secondary/8 disabled:opacity-50 p-2 border-2 border-secondary/30 rounded-lg transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {stage === 1 ? "Voltar" : "Cancelar"}
                  </motion.button>

                  <motion.button
                    tabIndex={-1}
                    type="button"
                    disabled={disableNext}
                    onClick={async () => await handleNext()}
                    whileTap={!disableNext ? { scale: 0.98 } : {}}
                    className={[
                      "col-span-1 md:col-span-2 bg-primary/70 hover:bg-primary active:bg-primary/85 disabled:opacity-50 p-2 rounded-lg text-white transition-all duration-300 cursor-pointer disabled:cursor-not-allowed",
                      loading ? "disabled:bg-primary" : "disabled:bg-error",
                    ].join(" ")}
                  >
                    {loading
                      ? "Carregando..."
                      : stage === 1
                        ? "Continuar"
                        : "Criar minha conta"}
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.form>
          ) : (
            allUIPlans && (
              <RegisterCheckout
                reset={reset}
                setStage={setStage}
                setFinalSubmitted={setFinalSubmitted}
                setCreatedUser={setCreatedUser}
                setCreatedUserAuth={setCreatedUserAuth}
                setUnlocked2={setUnlocked2}
                setLoading={setLoading}
                createdUser={createdUser}
                createdUserAuth={createdUserAuth}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            )
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default Client;
