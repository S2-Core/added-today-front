"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { TbArrowBackUp } from "react-icons/tb";
import { IoLockClosedOutline } from "react-icons/io5";
import { LuShield } from "react-icons/lu";
import { FiCreditCard } from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";
import { FaArrowLeftLong } from "react-icons/fa6";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import { useAuth, useBillings } from "@/contexts";

import Container from "@/components/container";
import PlanCard from "@/components/planCard";
import Form from "@/components/form";
import Input from "@/components/input";
import Select from "@/components/select";
import Loading from "@/components/loading";

import { encryptCard } from "@/services/billings/encryptCard.service";

import {
  cardCheckoutSchema,
  CheckoutMode,
  checkoutModeItems,
  pixCheckoutSchema,
} from "@/validators/checkouts/checkout.validator";

import { formatCurrency } from "@/utils/number.utils";

import { IPaymentMethod } from "@/app/register/_client";
import {
  ICardCheckout,
  IPixCheckout,
  IStartCheckoutBody,
  IStartCheckoutResponse,
} from "@/contexts/billings/interfaces";

const PlanCheckout = () => {
  const [{ id }, navigate] = [useParams(), useRouter()];

  const { handleFindUserCurrentPlan, userCurrentPlan } = useAuth();
  const { allUIPlans, handleFindAllUIPlans, handleStartCheckout } =
    useBillings();

  const uiPlan = allUIPlans?.find((plan) => plan.code === id);

  const [paymentMethod, setPaymentMethod] = useState<IPaymentMethod>(null);
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
  const [pixResponse, setPixResponse] = useState<IStartCheckoutResponse | null>(
    null,
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(100);

  const {
    register,
    control,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IPixCheckout | ICardCheckout>({
    mode: "onChange",
    resolver: yupResolver(
      paymentMethod === "CARD" ? cardCheckoutSchema : pixCheckoutSchema,
    ),
    shouldUnregister: false,
  });

  useEffect(() => {
    if (!uiPlan || !userCurrentPlan) return;

    if (uiPlan.code === userCurrentPlan.currentPlan.code) {
      toast.error("Você já possui esse plano!", { id: "free-plan" });
      navigate.push("/plans");
    } else if (uiPlan.priceCents === 0) {
      toast.error(
        "Para contratar esse plano, você precisa cancelar o plano atual!",
        { id: "free-plan" },
      );

      navigate.push("/plans");
    }
  }, [uiPlan, userCurrentPlan]);

  useEffect(() => {
    if (!pixResponse || !uiPlan) return;

    let cancelled = false;

    const checkUserPlan = async () => {
      try {
        const response = await handleFindUserCurrentPlan();

        if (cancelled || !response) return;

        const hasActivatedPlan =
          response.currentPlan.code === pixResponse.planCode;

        if (!hasActivatedPlan) return;

        toast.success("Plano contratado com sucesso!", { id: "end-checkout" });

        handleReturnToPlans();
      } catch (err) {
        console.error(err);
      }
    };

    checkUserPlan();

    const interval = setInterval(checkUserPlan, 5000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [pixResponse, uiPlan]);

  useEffect(() => {
    reset();
  }, [paymentMethod]);

  useEffect(() => {
    handleFindAllUIPlans();
  }, [id]);

  useEffect(() => {
    if (!pixResponse?.pixExpiresAt) return;

    const expiresAt = new Date(pixResponse.pixExpiresAt).getTime();
    const startedAt = Date.now();
    const totalTime = expiresAt - startedAt;

    if (totalTime <= 0) {
      setPixResponse(null);
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = expiresAt - now;

      if (remaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        setPercentage(0);
        setPixResponse(null);
        return;
      }

      setTimeLeft(remaining);
      setPercentage((remaining / totalTime) * 100);
    }, 100);

    return () => clearInterval(interval);
  }, [pixResponse, setPixResponse]);

  const onSubmit = async (): Promise<void> => {
    if (!uiPlan) return;

    const data = getValues();

    let cardEncrypted = "";

    try {
      setPaymentLoading(true);

      const { holder, cvv, number, expirationDate, ...rest } =
        data as ICardCheckout;

      if (paymentMethod === "CARD") {
        const response = await encryptCard({
          holder,
          number: number.replace(/\D/g, ""),
          securityCode: cvv,
          expMonth: expirationDate.split("/")[0],
          expYear: expirationDate.split("/")[1],
        });

        if (!response.success) {
          toast.error(response.message, { id: "encrypt-card" });

          return;
        }

        cardEncrypted = response.encryptedCard;
      }

      const formattedData = {
        ...rest,
        planCode: uiPlan.code,
        method: paymentMethod,
        mode: rest.mode ?? CheckoutMode.ONE_TIME,
      } as IStartCheckoutBody;

      if (paymentMethod === "CARD") formattedData.cardEncrypted = cardEncrypted;

      const response = await handleStartCheckout(formattedData);

      if (!response) return;

      if (response.method === "PIX") setPixResponse(response);
      else handleReturnToPlans();
    } catch (err) {
      console.error(err);
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleCopy = async (): Promise<void> => {
    if (!pixResponse?.pixQrCodeText) return;

    await navigator.clipboard.writeText(pixResponse.pixQrCodeText);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleReturnToPlans = async (): Promise<void> => {
    reset();

    await handleFindAllUIPlans();
    await handleFindUserCurrentPlan();

    navigate.push("/plans");
  };

  if (
    !allUIPlans ||
    !uiPlan ||
    !userCurrentPlan ||
    uiPlan.code === userCurrentPlan.currentPlan.code ||
    uiPlan.priceCents === 0
  )
    return null;

  const { introPriceCents, priceCents, currency } = uiPlan;

  return (
    <Container
      Tag="main"
      className="relative flex flex-col gap-6 my-5 select-none"
    >
      <Link
        tabIndex={-1}
        href="/plans"
        title="Voltar para o gerenciamento de planos"
        className="top-5 left-5 z-9 fixed p-2 rounded-full text-foreground hover:text-secondary active:text-primary text-4xl transition-all duration-300 cursor-pointer"
      >
        <TbArrowBackUp />
      </Link>

      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 mt-15">
        <div className="flex flex-col gap-3">
          <span className="font-title font-bold text-xl text-center md:text-start">
            Plano selecionado:
          </span>

          <PlanCard plan={uiPlan} className="list-none" />
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-title font-bold text-xl text-center md:text-start">
            Pagamento:
          </span>

          <div className="px-8 py-5 border border-primary/30 rounded-xl">
            {priceCents !== 0 &&
              (!paymentMethod ? (
                <div className="flex flex-col gap-3 mb-2 pb-5 border-primary/30 border-b">
                  <span className="text-foreground/70">
                    Método de Pagamento
                  </span>

                  <button
                    tabIndex={-1}
                    type="button"
                    onClick={() => setPaymentMethod("CARD")}
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
                    onClick={() => setPaymentMethod("PIX")}
                    className="flex justify-between items-center hover:bg-primary/10 px-8 py-5 border rounded-xl w-full transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <BsQrCode size={20} />

                      <span className="text-lg">Pix</span>
                    </div>
                  </button>
                </div>
              ) : !paymentLoading ? (
                !pixResponse ? (
                  <div className="flex flex-col gap-5 mb-2 pb-5 border-primary/30 border-b">
                    <div className="flex items-center gap-5 w-full">
                      <button
                        tabIndex={-1}
                        type="button"
                        onClick={() => setPaymentMethod(null)}
                        className="flex items-center gap-2 hover:bg-primary/10 p-2 border-2 border-primary/30 rounded-xl text-primary/70 transition-all duration-300 cursor-pointer"
                      >
                        <FaArrowLeftLong size={21} />

                        <span className="text-sm xs:text-base">
                          {paymentMethod === "PIX"
                            ? " Pix"
                            : " Cartão de Crédito"}
                        </span>
                      </button>
                    </div>

                    <Form>
                      {paymentMethod === "CARD" && (
                        <>
                          <Input
                            errors={errors}
                            register={register}
                            name="holder"
                            label="Nome do Titular do Cartão"
                            placeholder="Digite o nome do titular do cartão"
                            required
                          />

                          <Input
                            errors={errors}
                            register={register}
                            name="number"
                            label="Número do Cartão"
                            placeholder="Digite o número do seu cartão"
                            required
                          />

                          <div className="items-start gap-5 grid grid-cols-2">
                            <Input
                              errors={errors}
                              register={register}
                              name="cvv"
                              label="CVV"
                              minLength={3}
                              maxLength={4}
                              placeholder="Digite o CVV do seu cartão"
                              required
                            />

                            <Input
                              errors={errors}
                              register={register}
                              name="expirationDate"
                              maxLength={7}
                              minLength={7}
                              label="Data de Validade"
                              placeholder="Digite a data de validade do cartão"
                              required
                            />
                          </div>
                        </>
                      )}

                      <Input
                        errors={errors}
                        register={register}
                        name="customerTaxId"
                        label="Documento (CPF/CNPJ)"
                        placeholder="Digite seu CPF ou CNPJ"
                        required
                      />

                      {paymentMethod === "CARD" && (
                        <Select
                          label="Modo de Assinatura"
                          items={checkoutModeItems}
                          defaultValue={CheckoutMode.RECURRING}
                          register={register}
                          name="mode"
                          errors={errors}
                          control={control}
                          required
                        />
                      )}
                    </Form>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-5 mb-2 pb-5 border-primary/30 border-b w-full">
                    <div className="w-full">
                      <button
                        tabIndex={-1}
                        type="button"
                        onClick={() => setPixResponse(null)}
                        className="flex items-center gap-2 hover:bg-primary/10 p-2 border-2 border-primary/30 rounded-xl text-primary/70 transition-all duration-300 cursor-pointer"
                      >
                        <FaArrowLeftLong size={21} />

                        <span>Cancelar</span>
                      </button>
                    </div>

                    <figure className="flex justify-center items-center p-3 border-2 border-primary/30 rounded-xl w-50 h-50">
                      <Image
                        src={pixResponse.pixQrCodeImageUrl ?? ""}
                        alt="QRCode"
                        width={200}
                        height={200}
                      />

                      <figcaption className="hidden" aria-hidden hidden>
                        QRCode
                      </figcaption>
                    </figure>

                    <div className="flex flex-col items-center gap-5 w-full">
                      <button
                        tabIndex={-1}
                        type="button"
                        onClick={handleCopy}
                        className={[
                          "px-5 py-2 border-2 w-48 rounded text-primary transition-all duration-300 cursor-pointer",
                          copied
                            ? "bg-success-light/30 border-success/30 text-success"
                            : "border-primary/30 hover:bg-primary/10",
                        ].join(" ")}
                      >
                        {copied ? "Código QR copiado!" : "Copiar código QR"}
                      </button>

                      <div className="flex flex-col gap-5 w-full">
                        <span className="text-primary text-lg/normal text-center">
                          {formatTime(timeLeft)}
                        </span>

                        <div className="flex justify-start items-center bg-primary/30 px-1 rounded-full w-full h-2">
                          <div
                            className="bg-primary rounded-full h-1"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <Loading className="mb-2 pb-5 border-primary/30 border-b h-63.5" />
              ))}

            <div>
              <div className="flex justify-between items-center gap-5">
                <span className="text-foreground/70">Subtotal</span>

                <span>
                  {((introPriceCents ?? priceCents ?? 0) / 100)
                    .toFixed(2)
                    .replace(".", ",")}
                </span>
              </div>

              <div className="flex justify-between items-center gap-5">
                <span className="text-foreground/70">Desconto Fundador</span>

                <span className="text-success-light">
                  {(0).toFixed(2).replace(".", ",")}
                </span>
              </div>

              <div className="flex justify-between items-center gap-5 mt-2 pt-2 border-primary/30 border-t text-xl">
                <span className="font-bold">Total</span>

                <span>
                  {formatCurrency(
                    (introPriceCents ?? priceCents ?? 0) / 100,
                    currency ?? "BRL",
                  )}
                </span>
              </div>
            </div>

            {(priceCents === 0 ||
              paymentMethod === "CARD" ||
              (paymentMethod === "PIX" && !pixResponse)) && (
              <div className="flex flex-col gap-5 mt-5 w-full">
                <div className="flex flex-col gap-3 w-full">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    tabIndex={-1}
                    disabled={
                      paymentLoading ||
                      (paymentMethod === "PIX"
                        ? errors.customerTaxId
                        : errors.customerTaxId ||
                          errors.mode ||
                          (errors as any).holder ||
                          (errors as any).number ||
                          (errors as any).expirationDate ||
                          (errors as any).cvv)
                    }
                    onClick={async () => {
                      if (priceCents === 0) {
                        handleReturnToPlans();

                        return;
                      }

                      if (paymentMethod === "PIX") {
                        await trigger(["customerTaxId", "mode"], {
                          shouldFocus: true,
                        });

                        if (errors.customerTaxId) return;

                        onSubmit();

                        return;
                      } else {
                        await trigger(
                          [
                            "customerTaxId",
                            "mode",
                            "number",
                            "holder",
                            "expirationDate",
                            "cvv",
                          ],
                          {
                            shouldFocus: true,
                          },
                        );

                        if (
                          errors.customerTaxId ||
                          errors.mode ||
                          (errors as any).holder ||
                          (errors as any).number ||
                          (errors as any).expirationDate ||
                          (errors as any).cvv
                        )
                          return;

                        onSubmit();
                      }
                    }}
                    className="bg-primary/70 hover:bg-primary active:bg-primary/85 disabled:bg-secondary disabled:opacity-50 p-2 py-5 rounded-lg w-full text-white transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {paymentMethod === "PIX"
                      ? "Gerar QR Code"
                      : "Assinar plano e começar agora"}
                  </motion.button>

                  {priceCents !== 0 && (
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
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PlanCheckout;
