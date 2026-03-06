"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { WiStars } from "react-icons/wi";
import { FiCreditCard } from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";
import { IoLockClosedOutline } from "react-icons/io5";
import { LuShield } from "react-icons/lu";
import { BiSolidLock } from "react-icons/bi";
import { AnimatePresence, motion, easeOut } from "motion/react";
import { FaArrowLeftLong } from "react-icons/fa6";

import { useAuth } from "@/contexts";

import Container from "@/components/container";
import Input from "@/components/input";
import Textarea from "@/components/textarea";
import Loading from "@/components/loading";
import PlansCarousel from "@/components/plansCarousel";

import { formatCurrency } from "@/utils/number.utils";

import { planBenefitsExamples } from "@/constants/plans";

import registerSchema from "@/validators/users/register.validator";

import { IRegister, IUIPlan } from "@/contexts/auth/interfaces";
import { IUser } from "@/contexts/users/interfaces";

type Stage = 1 | 2 | 3;

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

  const STEP_FIELDS: Record<Stage, (keyof IRegister)[]> = {
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

  const navigate = useRouter();

  const [stage, setStage] = useState<Stage>(1);
  const [unlocked2, setUnlocked2] = useState<boolean>(false);
  const [finalSubmitted, setFinalSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [createdUser, setCreatedUser] = useState<IUser | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<IUIPlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix" | null>(
    null,
  );

  const formRef = useRef<HTMLFormElement | null>(null);

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

  const { handleRegisterUser, allUIPlans } = useAuth();

  const validateStep = async (stage: Stage): Promise<boolean> => {
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

  const goToStage = (target: Stage): void => {
    if (target === 1) {
      setStage(1);

      return;
    }

    if (target === 2) {
      if (!unlocked2) return;

      setStage(2);

      return;
    }

    if (target === 3) {
      if (!finalSubmitted) return;

      setStage(3);
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

      const newUser = await handleRegisterUser(formattedData);

      setCreatedUser({
        ...(newUser ?? formattedData),
        name: (newUser ?? formattedData).name.split(" ")[0].trim(),
      } as IUser);

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

        <Container Tag="div" className="grid grid-cols-3 py-0! select-none">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="contents"
          >
            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <div
                className={`hidden md:flex rounded-l h-2 ${unlocked2 ? "bg-primary" : "bg-secondary rounded-r"}`}
              />
              <button
                type="button"
                onClick={() => goToStage(1)}
                disabled={
                  !unlocked2 || stage === 1 || loading || finalSubmitted
                }
                className={`flex justify-center md:justify-start items-center gap-2 mt-5 md:mt-0 font-medium text-foreground ${
                  unlocked2 && stage !== 1 && !loading && !finalSubmitted
                    ? "cursor-pointer"
                    : stage === 1
                      ? "cursor-default"
                      : "cursor-not-allowed"
                }`}
              >
                <span
                  className={`flex justify-center items-center rounded-full w-8 h-8 text-white text-sm/normal ${
                    stage === 1 ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  {loading ? (
                    <Loading className="w-2 h-2 text-white" />
                  ) : finalSubmitted ? (
                    <BiSolidLock />
                  ) : (
                    1
                  )}
                </span>

                <span
                  className={`hidden sm:flex ${stage === 1 ? "text-foreground" : "text-foreground/50"}`}
                >
                  Identidade
                </span>
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <div
                className={[
                  "hidden md:flex h-2",
                  finalSubmitted
                    ? "bg-primary"
                    : unlocked2
                      ? "bg-secondary"
                      : "bg-transparent",
                  !finalSubmitted ? "rounded-r" : "",
                ].join(" ")}
              />
              <button
                type="button"
                onClick={() => goToStage(2)}
                disabled={
                  !unlocked2 || stage === 2 || loading || finalSubmitted
                }
                className={`flex justify-center md:justify-start items-center gap-2 mt-5 md:mt-0 font-medium text-foreground ${
                  unlocked2 && stage !== 2 && !loading && !finalSubmitted
                    ? "cursor-pointer"
                    : stage === 2
                      ? "cursor-default"
                      : "cursor-not-allowed"
                }`}
              >
                <span
                  className={`flex justify-center items-center rounded-full w-8 h-8 text-sm/normal ${
                    unlocked2
                      ? `text-white ${stage === 2 ? "bg-primary" : "bg-secondary"}`
                      : "bg-transparent border-foreground/50 border text-foreground/50"
                  }`}
                >
                  {loading ? (
                    <Loading className="w-2 h-2 text-white" />
                  ) : finalSubmitted ? (
                    <BiSolidLock />
                  ) : (
                    2
                  )}
                </span>

                <span
                  className={`hidden sm:flex ${stage === 2 ? "text-foreground" : "text-foreground/50"}`}
                >
                  Conta
                </span>
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <div
                className={`hidden md:flex h-2 ${finalSubmitted ? "bg-secondary" : "bg-transparent"} rounded-r`}
              />
              <button
                type="button"
                onClick={() => goToStage(3)}
                disabled={!finalSubmitted || stage === 3}
                className={`flex justify-center md:justify-start items-center gap-2 mt-5 md:mt-0 font-medium text-foreground ${
                  finalSubmitted && stage !== 3
                    ? "cursor-pointer"
                    : stage === 3
                      ? "cursor-default"
                      : "cursor-not-allowed"
                }`}
              >
                <span
                  className={`flex justify-center items-center rounded-full w-8 h-8 text-sm/normal ${
                    finalSubmitted
                      ? `text-white ${stage === 3 ? "bg-primary" : "bg-secondary"}`
                      : "bg-transparent border-foreground/50 border text-foreground/50"
                  }`}
                >
                  3
                </span>

                <span
                  className={`hidden sm:flex ${stage === 3 ? "text-foreground" : "text-foreground/50"}`}
                >
                  Checkout
                </span>
              </button>
            </motion.div>
          </motion.div>
        </Container>
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
                      <div className="flex items-start gap-5 mb-65 sm:mb-50">
                        <div className="flex justify-center items-center gap-2 bg-success/20 rounded-full w-full max-w-10 h-full max-h-10 overflow-hidden">
                          <WiStars className="text-success" size={80} />
                        </div>

                        <div className="flex flex-col gap-2 text-foreground">
                          <h2 className="font-title text-xl">
                            Você está a um passo de se tornar um Criador
                            Fundador 🚀
                          </h2>

                          <p className="text-sm">
                            Crie sua conta e tenha acesso a benefícios
                            exclusivos
                          </p>
                        </div>
                      </div>

                      <div className="top-55 sm:top-35 left-0 absolute flex flex-col gap-4 bg-primary/10 p-5 w-full">
                        <p className="font-bold text-sm sm:text-base">
                          O que você ganha como Criador Fundador:
                        </p>
                        <ul className="gap-3 grid grid-cols-2">
                          {planBenefitsExamples.map(({ id, icon, text }) => (
                            <li
                              key={id}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span>{icon}</span>
                              <span className="text-foreground/70">{text}</span>
                            </li>
                          ))}
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
                    />

                    <Input<IRegister>
                      name="instagramHandle"
                      label="Instagram"
                      placeholder="@seu_usuario"
                      register={register}
                      errors={errors}
                      type="text"
                      required
                    />

                    <Input<IRegister>
                      name="tiktokHandle"
                      label="TikTok"
                      placeholder="@seu_usuario"
                      register={register}
                      errors={errors}
                      type="text"
                    />

                    <Input<IRegister>
                      name="youtubeHandle"
                      label="YouTube"
                      placeholder="@seu_canal"
                      register={register}
                      errors={errors}
                      type="text"
                    />

                    <Textarea
                      name="contentTopic"
                      label="Você cria conteúdo sobre o quê?"
                      placeholder="Ex: Moda e lifestyle, Fitness e saúde, Tecnologia, Humor..."
                      register={register}
                      required
                      errors={errors}
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
                      setPaymentMethod("card");
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
              <motion.div
                key="stage-checkout"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="items-start gap-5 grid grid-cols-1 md:grid-cols-7 w-full"
              >
                <motion.div
                  variants={fadeUp}
                  className="flex flex-col gap-5 order-2 md:order-1 col-span-1 md:col-span-4"
                >
                  <motion.div
                    variants={pageTransition}
                    className="hidden md:flex justify-center items-start gap-5 bg-success-light shadow-md p-10 rounded-xl text-white select-none"
                  >
                    <div className="w-full max-w-10 h-full max-h-10 overflow-hidden">
                      <WiStars size={40} />
                    </div>

                    <div className="flex flex-col gap-2">
                      <h1 className="font-title text-2xl">
                        Bem vindo à Added Today, {createdUser?.name}! 🎉
                      </h1>

                      <span className="text-sm">
                        Você está prestes a tranformar sua carreira como criador
                      </span>
                    </div>
                  </motion.div>

                  <PlansCarousel
                    setSelectedPlan={setSelectedPlan}
                    allUIPlans={allUIPlans}
                  />
                </motion.div>

                <div className="flex flex-col gap-5 order-1 md:order-1 col-span-1 md:col-span-3">
                  <motion.div
                    variants={pageTransition}
                    className="md:hidden flex justify-center items-start gap-5 bg-success-light shadow-md p-10 rounded-xl text-white select-none"
                  >
                    <div className="w-full max-w-10 h-full max-h-10 overflow-hidden">
                      <WiStars size={40} />
                    </div>

                    <div className="flex flex-col gap-2">
                      <h1 className="font-title text-2xl">
                        Bem vindo à Added Today, {createdUser?.name}! 🎉
                      </h1>

                      <span className="text-sm">
                        Você está prestes a tranformar sua carreira como criador
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={fadeUp}
                    className="shadow-md border border-primary/30 rounded-xl overflow-hidden select-none"
                  >
                    <div className="flex flex-col gap-1 bg-primary/10 px-8 py-5 text-foreground">
                      <span className="font-title font-bold text-lg">
                        Finalize a sua assinatura
                      </span>
                    </div>

                    <div className="px-8 py-5">
                      {selectedPlan?.priceCents !== 0 && !paymentMethod ? (
                        <div className="flex flex-col gap-3 mb-2 pb-5 border-primary/30 border-b">
                          <span className="text-foreground/70">
                            Método de Pagamento
                          </span>

                          <button
                            tabIndex={-1}
                            type="button"
                            onClick={() => setPaymentMethod("card")}
                            className="flex justify-between items-center hover:bg-primary/10 px-8 py-5 border rounded-xl w-full transition-all duration-300 cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <FiCreditCard size={20} />

                              <span className="text-sm xs:text-base">
                                Cartão de Crédito
                              </span>
                            </div>
                          </button>

                          <button
                            tabIndex={-1}
                            type="button"
                            onClick={() => setPaymentMethod("pix")}
                            className="flex justify-between items-center hover:bg-primary/10 px-8 py-5 border rounded-xl w-full transition-all duration-300 cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <BsQrCode size={20} />

                              <span className="text-lg">Pix</span>
                            </div>
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-5 mb-5">
                          <div className="flex items-start w-full">
                            <button
                              tabIndex={-1}
                              type="button"
                              onClick={() => setPaymentMethod(null)}
                              className="hover:bg-primary/10 p-2 border-2 border-primary/30 rounded-xl text-primary/70 transition-all duration-300 cursor-pointer"
                            >
                              <FaArrowLeftLong size={21} />
                            </button>
                          </div>

                          <div></div>
                        </div>
                      )}

                      <div>
                        <div className="flex justify-between items-center gap-5">
                          <span className="text-foreground/70">Subtotal</span>

                          <span>
                            {(
                              (selectedPlan?.introPriceCents ??
                                selectedPlan?.priceCents ??
                                0) / 100
                            )
                              .toFixed(2)
                              .replace(".", ",")}
                          </span>
                        </div>

                        <div className="flex justify-between items-center gap-5">
                          <span className="text-foreground/70">
                            Desconto Fundador
                          </span>

                          <span className="text-success-light">
                            {(0).toFixed(2).replace(".", ",")}
                          </span>
                        </div>

                        <div className="flex justify-between items-center gap-5 mt-2 pt-2 border-primary/30 border-t text-xl">
                          <span className="font-bold">Total</span>

                          <span>
                            {formatCurrency(
                              (selectedPlan?.introPriceCents ??
                                selectedPlan?.priceCents ??
                                0) / 100,
                              selectedPlan?.currency ?? "BRL",
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-5 mt-5 w-full">
                        <div className="flex flex-col gap-3 w-full">
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            tabIndex={-1}
                            onClick={() => {
                              if (selectedPlan?.priceCents !== 0) return;

                              reset();
                              setStage(1);
                              setFinalSubmitted(false);
                              setCreatedUser(null);
                              setUnlocked2(false);
                              setLoading(false);
                              setPaymentMethod("card");
                              navigate.push("/");
                            }}
                            className="bg-primary/70 hover:bg-primary active:bg-primary/85 disabled:bg-secondary disabled:opacity-50 p-2 py-5 rounded-lg w-full text-white transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                          >
                            Assinar plano e começar agora
                          </motion.button>

                          {selectedPlan?.priceCents !== 0 && (
                            <>
                              <div className="flex items-center gap-2 text-foreground/70 text-sm/normal">
                                <IoLockClosedOutline size={18} />

                                <span className="text-xs md:text-xs xs:text-sm lg:text-sm">
                                  Pagamento seguro e criptografado
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-foreground/70 text-sm/normal">
                                <LuShield size={18} />

                                <span>Seus dados estão protegidos</span>
                              </div>
                            </>
                          )}
                        </div>

                        {selectedPlan?.priceCents !== 0 && (
                          <motion.button
                            tabIndex={-1}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              reset();
                              setStage(1);
                              setFinalSubmitted(false);
                              setCreatedUser(null);
                              setUnlocked2(false);
                              setLoading(false);
                              setPaymentMethod("card");
                              navigate.push("/");
                            }}
                            className="hover:bg-secondary/8 p-2 border-2 border-secondary/30 rounded-lg transition-all duration-300 cursor-pointer"
                          >
                            Voltar para o login
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default Client;
