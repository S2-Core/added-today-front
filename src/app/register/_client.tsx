"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Container from "@/components/container";
import { IRegister } from "@/contexts/auth/interfaces";
import registerSchema from "@/validators/users/register.validator";
import Input from "@/components/input";
import Textarea from "@/components/textarea";

type Stage = 1 | 2 | 3;

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

const Client = () => {
  const navigate = useRouter();

  const [stage, setStage] = useState<Stage>(1);

  // libera o clique no step 2 somente depois de "submeter" o step 1 com sucesso
  const [unlocked2, setUnlocked2] = useState(false);

  // só fica true quando o usuário FINALIZA o formulário (submit no stage 3)
  const [finalSubmitted, setFinalSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitted },
  } = useForm<IRegister>({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
    shouldUnregister: false,
  });

  const step1Ok = useMemo(
    () => STEP_FIELDS[1].every((field) => !errors[field]),
    [errors],
  );

  const step2Ok = useMemo(
    () => STEP_FIELDS[2].every((field) => !errors[field]),
    [errors],
  );

  // REGRAS
  // - números só clicáveis depois do primeiro submit
  const numbersClickable = isSubmitted;

  // - step2 clicável só depois do submit do step1 + step1 válido
  const canClickStep2 = numbersClickable && unlocked2;

  // - step3 NUNCA clicável até o submit final (no stage 3)
  const canClickStep3 = numbersClickable && finalSubmitted;

  const validateStep = async (s: Stage) => {
    const fields = STEP_FIELDS[s];
    return fields.length ? trigger(fields, { shouldFocus: true }) : true;
  };

  // botão "Continuar" (não é submit)
  const handleNext = async () => {
    // IMPORTANTÍSSIMO:
    // você quer que "só depois de submeter pela primeira vez" ele cheque erros.
    // O trigger faz a validação e coloca erros, mas "isSubmitted" só fica true em submit.
    // Então aqui nós forçamos um submit do step atual (sem ir pro onSubmit final).
    const ok = await validateStep(stage);
    if (!ok) return;

    if (stage === 1) {
      setUnlocked2(true);
      setStage(2);
      return;
    }

    if (stage === 2) {
      setStage(3);
      return;
    }
  };

  // Submit "intermediário" só pra marcar isSubmitted e popular errors no primeiro clique
  const markSubmitted = handleSubmit(() => {
    // não faz nada, serve apenas para "isSubmitted" virar true
    // e o RHF passar a exibir/gerenciar os erros como você quer
  });

  const goToStage = (target: Stage) => {
    if (!numbersClickable) return; // antes do primeiro submit, trava tudo

    if (target === 1) {
      // voltar pro 1 sempre permitido após o first submit
      setStage(1);
      return;
    }

    if (target === 2) {
      if (!canClickStep2) return;
      setStage(2);
      return;
    }

    if (target === 3) {
      if (!canClickStep3) return;
      setStage(3);
    }
  };

  const onFinalSubmit = (data: IRegister) => {
    // aqui é o submit REAL (stage 3)
    setFinalSubmitted(true);
    console.log("SUBMIT FINAL:", data);
  };

  return (
    <div>
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

      {/* STEPPER */}
      <Container Tag="div" className="grid md:grid-cols-3 !py-0 select-none">
        {/* 1 */}
        <div
          className={`hidden flex-col gap-3 col-span-3 md:col-span-1 ${stage === 1 ? "!flex" : "md:flex"}`}
        >
          <div
            className={`hidden md:flex rounded-l h-2 ${
              step1Ok ? "bg-primary" : "bg-secondary"
            } ${stage === 1 && !step1Ok ? "rounded-r" : ""}`}
          />
          <button
            type="button"
            onClick={() => goToStage(1)}
            disabled={!numbersClickable}
            className={`flex justify-center md:justify-start items-center gap-2 mt-5 md:mt-0 font-medium text-foreground ${
              numbersClickable
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-60"
            }`}
          >
            <span
              className={`flex justify-center items-center rounded-full w-8 h-8 text-white text-sm/normal ${
                stage === 1 ? "bg-primary" : "bg-secondary"
              }`}
            >
              1
            </span>
            <span
              className={stage === 1 ? "text-foreground" : "text-foreground/50"}
            >
              Identidade
            </span>
          </button>
        </div>

        {/* 2 */}
        <div
          className={`hidden flex-col gap-3 col-span-3 md:col-span-1 ${stage === 2 ? "!flex" : "md:flex"}`}
        >
          <div
            className={[
              "hidden md:flex h-2",
              step2Ok
                ? "bg-primary"
                : unlocked2
                  ? "bg-secondary"
                  : "bg-transparent",
              stage === 2 ? "rounded-r" : "",
            ].join(" ")}
          />

          <button
            type="button"
            onClick={() => goToStage(2)}
            disabled={!canClickStep2}
            className={`flex justify-center md:justify-start items-center gap-2 mt-5 md:mt-0 font-medium text-foreground ${
              canClickStep2 ? "cursor-pointer" : "cursor-not-allowed opacity-60"
            }`}
          >
            <span
              className={`flex justify-center items-center rounded-full w-8 h-8 text-sm/normal ${
                stage > 1
                  ? `text-white ${stage === 2 ? "bg-primary" : "bg-secondary"}`
                  : "bg-transparent border-foreground/50 border-1 text-foreground/50"
              }`}
            >
              2
            </span>
            <span
              className={stage === 2 ? "text-foreground" : "text-foreground/50"}
            >
              Conta
            </span>
          </button>
        </div>

        {/* 3 */}
        <div
          className={`hidden flex-col gap-3 col-span-3 md:col-span-1 ${stage === 3 ? "!flex" : "md:flex"}`}
        >
          <div
            className={`hidden md:flex h-2 ${finalSubmitted ? "bg-primary" : "bg-transparent"} rounded-r`}
          />

          <button
            type="button"
            onClick={() => goToStage(3)}
            disabled={!canClickStep3}
            className={`flex justify-center md:justify-start items-center gap-2 mt-5 md:mt-0 font-medium text-foreground ${
              canClickStep3 ? "cursor-pointer" : "cursor-not-allowed opacity-60"
            }`}
          >
            <span
              className={`flex justify-center items-center rounded-full w-8 h-8 text-sm/normal ${
                stage > 2
                  ? `text-white ${stage === 3 ? "bg-primary" : "bg-secondary"}`
                  : "bg-transparent border-foreground/50 border-1 text-foreground/50"
              }`}
            >
              3
            </span>
            <span
              className={stage === 3 ? "text-foreground" : "text-foreground/50"}
            >
              Checkout
            </span>
          </button>
        </div>
      </Container>

      {/* FORM */}
      <Container Tag="main" className="flex justify-center">
        <form
          className="flex justify-center w-full"
          onSubmit={handleSubmit(onFinalSubmit)}
        >
          {stage === 1 && (
            <div className="flex flex-col gap-10 shadow-md mt-5 p-5 rounded w-full max-w-md h-full">
              <div className="flex flex-col gap-2 select-none">
                <h1 className="font-title text-2xl md:text-3xl">
                  Vamos nos conhecer!
                </h1>
                <p className="text-xs md:text-sm">
                  Conte-nos um pouco sobre você e suas redes sociais
                </p>
              </div>

              <div className="flex flex-col gap-2">
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

              <div className="gap-2 grid grid-cols-1 md:grid-cols-3">
                <button
                  type="button"
                  onClick={() => navigate.push("/")}
                  className="col-span-1 hover:bg-secondary/8 p-2 border-2 border-secondary/30 rounded-lg transition-all duration-300 cursor-pointer"
                >
                  Voltar
                </button>

                {/* 1º clique: faz um submit "vazio" pra liberar números e setar erros.
                    depois disso, o handleNext valida e avança */}
                <button
                  type="button"
                  onClick={async () => {
                    if (!isSubmitted) {
                      await markSubmitted(); // marca isSubmitted e popula erros
                      return;
                    }
                    await handleNext();
                  }}
                  className="col-span-1 md:col-span-2 bg-primary/70 hover:bg-primary active:bg-primary/85 disabled:bg-primary disabled:opacity-50 p-2 rounded-lg text-white transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {stage === 2 && (
            <div className="flex flex-col gap-10 shadow-md mt-5 p-5 rounded w-full max-w-md h-full">
              {/* Coloque seus Inputs do step2 aqui (phone/email/password/confirmPassword) */}

              <div className="gap-2 grid grid-cols-1 md:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setStage(1)}
                  className="col-span-1 hover:bg-secondary/8 p-2 border-2 border-secondary/30 rounded-lg transition-all duration-300 cursor-pointer"
                >
                  Voltar
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="col-span-1 md:col-span-2 bg-primary/70 hover:bg-primary active:bg-primary/85 p-2 rounded-lg text-white transition-all duration-300 cursor-pointer"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {stage === 3 && (
            <div className="flex flex-col gap-10 shadow-md mt-5 p-5 rounded w-full max-w-md h-full">
              {/* Checkout */}

              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 p-2 rounded-lg text-white"
              >
                Finalizar
              </button>
            </div>
          )}
        </form>
      </Container>
    </div>
  );
};

export default Client;
