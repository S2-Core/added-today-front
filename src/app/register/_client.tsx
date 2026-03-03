"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { WiStars } from "react-icons/wi";
import { FaCheckCircle } from "react-icons/fa";
import { FiCreditCard } from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";
import { IoLockClosedOutline } from "react-icons/io5";
import { LuShield } from "react-icons/lu";

import { useAuth } from "@/contexts";

import Container from "@/components/container";
import Input from "@/components/input";
import Textarea from "@/components/textarea";

import { planGains } from "@/constants/register";

import registerSchema from "@/validators/users/register.validator";

import { IRegister } from "@/contexts/auth/interfaces";
import Loading from "@/components/loading";
import { BiSolidLock } from "react-icons/bi";

type Stage = 1 | 2 | 3;

const Client = () => {
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
  const [createdUser, setCreatedUser] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix">("card");

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

  const { handleRegisterUser } = useAuth();

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

  const clear = (stageToGo: Stage = 1): void => {
    reset();
    setUnlocked2(false);
    setFinalSubmitted(false);
    setLoading(false);
    setStage(stageToGo);
  };

  const onSubmit = async (data: IRegister): Promise<void> => {
    setFinalSubmitted(true);

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

      setCreatedUser((newUser ?? formattedData).name.split(" ")[0].trim());
      setLoading(false);
      reset();
      setStage(3);
    } catch (error) {
      clear(1);

      console.error(error);
    }
  };

  return (
    <div>
      <div className="shadow-md pb-3">
        <Container Tag="header">
          <figure className="flex justify-center md:justify-start">
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
          </figure>
        </Container>

        <Container Tag="div" className="grid md:grid-cols-3 !py-0 select-none">
          <div
            className={`hidden flex-col gap-3 col-span-3 md:col-span-1 ${stage === 1 ? "!flex" : "md:flex"}`}
          >
            <div
              className={`hidden md:flex rounded-l h-2 ${unlocked2 ? "bg-primary" : "bg-secondary rounded-r"}`}
            />
            <button
              type="button"
              onClick={() => goToStage(1)}
              disabled={!unlocked2 || stage === 1 || loading || finalSubmitted}
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
                className={
                  stage === 1 ? "text-foreground" : "text-foreground/50"
                }
              >
                Identidade
              </span>
            </button>
          </div>

          <div
            className={`hidden flex-col gap-3 col-span-3 md:col-span-1 ${stage === 2 ? "!flex" : "md:flex"}`}
          >
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
              disabled={!unlocked2 || stage === 2 || loading || finalSubmitted}
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
                    : "bg-transparent border-foreground/50 border-1 text-foreground/50"
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
                className={
                  stage === 2 ? "text-foreground" : "text-foreground/50"
                }
              >
                Conta
              </span>
            </button>
          </div>

          <div
            className={`hidden flex-col gap-3 col-span-3 md:col-span-1 ${stage === 3 ? "!flex" : "md:flex"}`}
          >
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
                    : "bg-transparent border-foreground/50 border-1 text-foreground/50"
                }`}
              >
                3
              </span>
              <span
                className={
                  stage === 3 ? "text-foreground" : "text-foreground/50"
                }
              >
                Checkout
              </span>
            </button>
          </div>
        </Container>
      </div>

      <Container Tag="main" className="flex justify-center py-10 md:py-20">
        {stage === 1 || stage === 2 ? (
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center w-full h-fit"
          >
            <div className="relative flex flex-col gap-10 shadow-md p-5 rounded w-full max-w-md h-full">
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
                stage === 2 && (
                  <>
                    <div className="flex items-start gap-5 mb-65 sm:mb-50 select-none">
                      <div className="flex justify-center items-center gap-2 bg-success/20 rounded-full w-full max-w-10 h-full max-h-10 overflow-hidden">
                        <WiStars className="text-success" size={80} />
                      </div>

                      <div className="flex flex-col gap-2 text-foreground">
                        <h2 className="font-title text-xl">
                          Você está a um passo de se tornar um Criador Fundador
                          🚀
                        </h2>

                        <p className="text-sm">
                          Crie sua conta e tenha acesso a benefícios exclusivos
                        </p>
                      </div>
                    </div>

                    <div className="top-55 sm:top-35 left-0 absolute flex flex-col gap-4 bg-primary/10 p-5 w-full select-none">
                      <p className="font-bold text-sm sm:text-base">
                        O que você ganha como Criador Fundador:
                      </p>

                      <ul className="gap-3 grid grid-cols-2">
                        {planGains.examples.map(({ id, icon, text }) => (
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
                  </>
                )
              )}

              <div
                className={[
                  "flex flex-col gap-2",
                  stage !== 1 ? "hidden" : "",
                ].join(" ")}
              >
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
              </div>

              <div
                className={[
                  "flex flex-col gap-2",
                  stage !== 2 ? "hidden" : "",
                ].join(" ")}
              >
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
                    placeholder="(11) 99999-9999"
                    register={register}
                    errors={errors}
                    type="tel"
                    required
                  />

                  <div className="flex items-start gap-2 mb-2 text-xs select-none">
                    <span>💬</span>

                    <span className="text-foreground/70">
                      Usaremos o WhatsApp para enviar oportunidades de recebidos
                      e novidades exclusivas.
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
              </div>

              <div className="gap-2 grid grid-cols-1 md:grid-cols-3">
                <button
                  tabIndex={-1}
                  type="button"
                  disabled={loading}
                  onClick={() => navigate.push("/")}
                  className="col-span-1 hover:bg-secondary/8 disabled:opacity-50 p-2 border-2 border-secondary/30 rounded-lg transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>

                <button
                  tabIndex={-1}
                  type="button"
                  disabled={
                    loading || STEP_FIELDS[stage].some((field) => errors[field])
                  }
                  onClick={async () => await handleNext()}
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
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="items-start gap-5 grid grid-cols-1 md:grid-cols-7 w-full">
            <div className="flex flex-col gap-5 col-span-1 md:col-span-4">
              <div className="flex items-start gap-5 bg-success-light shadow-md p-10 rounded-xl text-white select-none">
                <div className="w-full max-w-10 h-full max-h-10 overflow-hidden">
                  <WiStars size={40} />
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className="font-title text-2xl">
                    Bem vindo à Added Today, {createdUser}! 🎉
                  </h1>

                  <span className="text-sm">
                    Você está prestes a tranformar sua carreira como criador
                  </span>
                </div>
              </div>

              <div className="shadow-md border border-primary/30 rounded-xl overflow-hidden select-none">
                <div className="flex flex-col gap-1 bg-tertiary px-8 py-5 text-white">
                  <span className="font-title text-xl">
                    Plano Criador Fundador
                  </span>

                  <span className="text-white/50 text-sm">
                    Acesso completo à plataforma
                  </span>
                </div>

                <div className="flex flex-col px-8 py-5">
                  <ul className="flex flex-col gap-2">
                    {planGains.full.map(({ id, icon, text }) => (
                      <li
                        key={id}
                        className="flex items-center gap-2 text-sm/normal"
                      >
                        <FaCheckCircle className="text-success-light" />

                        <span>{icon}</span>

                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-1 mt-5 pt-5 border-primary/30 border-t">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl">R$ 97</span>

                      <span className="text-foreground/30">/ mês</span>
                    </div>

                    <span className="text-foreground/50 text-xs">
                      Cancele quando quiser. Sem fidelidade.
                    </span>
                  </div>

                  <div className="flex items-start gap-2 bg-success-light/10 mt-5 px-8 py-5 border border-success/30 rounded-xl">
                    <span>🎁</span>

                    <div className="flex flex-col gap-1">
                      <span className="font-title font-bold text-xl">
                        Oferta Especial de Fundador
                      </span>

                      <span className="text-foreground/70 text-sm">
                        Preço garantido para sempre. Sem reajustes!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-3 shadow-md border border-primary/30 rounded-xl overflow-hidden select-none">
              <div className="flex flex-col gap-1 bg-primary/10 px-8 py-5 text-foreground">
                <span className="font-title font-bold text-lg">
                  Finalizar Assinatura
                </span>
              </div>

              <div className="px-8 py-5">
                <div className="flex flex-col gap-3">
                  <span className="text-foreground/70">
                    Método de Pagamento
                  </span>

                  <button
                    tabIndex={-1}
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={[
                      "flex justify-between items-center hover:bg-primary/10 px-8 py-5 border rounded-xl w-full transition-all duration-300 cursor-pointer",
                      paymentMethod === "card"
                        ? "border-secondary"
                        : "border-foreground/30",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2">
                      <FiCreditCard size={20} />

                      <span className="text-sm xs:text-base">
                        Cartão de Crédito
                      </span>
                    </div>

                    {paymentMethod === "card" && (
                      <FaCheckCircle size={20} className="text-secondary" />
                    )}
                  </button>

                  <button
                    tabIndex={-1}
                    type="button"
                    onClick={() => setPaymentMethod("pix")}
                    className={[
                      "flex justify-between items-center hover:bg-primary/10 px-8 py-5 border rounded-xl w-full transition-all duration-300 cursor-pointer",
                      paymentMethod === "pix"
                        ? "border-secondary"
                        : "border-foreground/30",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2">
                      <BsQrCode size={20} />

                      <span className="text-lg">Pix</span>
                    </div>

                    {paymentMethod === "pix" && (
                      <FaCheckCircle size={20} className="text-secondary" />
                    )}
                  </button>
                </div>

                <div className="mt-5 pt-2 border-primary/30 border-t">
                  <div className="flex justify-between items-center gap-5">
                    <span className="text-foreground/70">Subtotal</span>

                    <span>R$ 97</span>
                  </div>

                  <div className="flex justify-between items-center gap-5">
                    <span className="text-foreground/70">
                      Desconto Fundador
                    </span>

                    <span className="text-success-light">R$ 0</span>
                  </div>

                  <div className="flex justify-between items-center gap-5 mt-2 pt-2 border-primary/30 border-t text-xl">
                    <span className="font-bold">Total</span>

                    <span>R$ 97</span>
                  </div>
                </div>

                <div className="flex flex-col gap-5 mt-5 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <button
                      tabIndex={-1}
                      disabled
                      onClick={() => {}}
                      className="bg-primary/70 hover:bg-primary active:bg-primary/85 disabled:bg-secondary disabled:opacity-50 p-2 py-5 rounded-lg w-full text-white transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                    >
                      Assinar plano e começar agora
                    </button>

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
                  </div>

                  <button
                    tabIndex={-1}
                    onClick={() => navigate.push("/")}
                    className="hover:bg-secondary/8 p-2 border-2 border-secondary/30 rounded-lg transition-all duration-300 cursor-pointer"
                  >
                    Voltar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Client;
