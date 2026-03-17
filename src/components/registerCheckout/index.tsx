"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useForm, UseFormReset } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion, easeOut } from "motion/react";
import { WiStars } from "react-icons/wi";
import { FiCreditCard } from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";
import { IoLockClosedOutline } from "react-icons/io5";
import { LuShield } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

import { useAnalytics, useAuth, useBillings } from "@/contexts";

import PlansCarousel from "@/components/plansCarousel";
import Form from "../form";
import Input from "../input";
import Select from "../select";
import Loading from "../loading";

import { encryptCard } from "@/services/billings/encryptCard.service";

import {
  cardCheckoutSchema,
  CheckoutMode,
  checkoutModeItems,
  pixCheckoutSchema,
} from "@/validators/checkouts/checkout.validator";

import { formatCurrency } from "@/utils/number.utils";
import { toDaysFromMs } from "@/utils/date.utils";

import { IPaymentMethod, IStage } from "@/app/register/_client";
import { IUser } from "@/contexts/users/interfaces";
import { ILoginResponse, IRegister } from "@/contexts/auth/interfaces";
import {
  ICardCheckout,
  IPixCheckout,
  IStartCheckoutBody,
  IStartCheckoutResponse,
  IUIPlan,
} from "@/contexts/billings/interfaces";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { mapCheckoutStartedEventProperties } from "@/lib/analytics";

interface IProps {
  createdUser: IUser | null;
  createdUserAuth: ILoginResponse | null;
  paymentMethod: IPaymentMethod;
  setPaymentMethod: Dispatch<SetStateAction<IPaymentMethod>>;
  reset: UseFormReset<IRegister>;
  setStage: Dispatch<SetStateAction<IStage>>;
  setFinalSubmitted: Dispatch<SetStateAction<boolean>>;
  setCreatedUser: Dispatch<SetStateAction<IUser | null>>;
  setCreatedUserAuth: Dispatch<SetStateAction<ILoginResponse | null>>;
  setUnlocked2: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const RegisterCheckout = ({
  createdUser,
  createdUserAuth,
  paymentMethod,
  setPaymentMethod,
  reset,
  setStage,
  setFinalSubmitted,
  setCreatedUser,
  setCreatedUserAuth,
  setUnlocked2,
  setLoading,
}: IProps) => {
  const [path, navigate] = [usePathname(), useRouter()];

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

  const { trackEvent } = useAnalytics();
  const { setToken, userCurrentPlan, loggedUser } = useAuth();
  const {
    allUIPlans,
    handleFindAllUIPlans,
    handleStartCheckout,
    handleFindCheckoutStatus,
  } = useBillings();

  const [selectedPlan, setSelectedPlan] = useState<IUIPlan | null>(null);
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
  const [paymentResponse, setPaymentResponse] =
    useState<IStartCheckoutResponse | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(100);

  const {
    register,
    control,
    trigger,
    getValues,
    reset: resetForm,
    formState: { errors },
  } = useForm<IPixCheckout | ICardCheckout>({
    mode: "onChange",
    resolver: yupResolver(
      paymentMethod === "CARD" ? cardCheckoutSchema : pixCheckoutSchema,
    ),
    shouldUnregister: false,
  });

  useEffect(() => {
    if (!paymentResponse?.paymentId || !selectedPlan) return;

    let cancelled = false;
    let isChecking = false;
    let timeoutId: NodeJS.Timeout | null = null;

    const scheduleNextCheck = () => {
      if (cancelled) return;
      timeoutId = setTimeout(checkCheckoutStatus, 5000);
    };

    const checkCheckoutStatus = async (): Promise<void> => {
      if (cancelled || isChecking) return;

      isChecking = true;

      try {
        const response = await handleFindCheckoutStatus(
          paymentResponse.paymentId as string,
          createdUserAuth?.token,
        );

        if (cancelled || !response) return;

        const { status, isTerminal } = response;

        if (status === "PENDING" && !isTerminal && paymentMethod === "CARD") {
          toast.loading("Estamos confirmando seu pagamento...", {
            id: "end-checkout",
          });

          scheduleNextCheck();

          return;
        }

        if (status === "PAID" && isTerminal) {
          toast.success("Plano contratado com sucesso!", {
            id: "end-checkout",
          });

          handleReturnToPlataform();

          return;
        }

        if ((status === "FAILED" || status === "REFUNDED") && isTerminal) {
          toast.error(
            `Não foi possível confirmar seu pagamento!${status === "REFUNDED" ? " O pagamento será reembolsado." : ""}`,
            {
              id: "end-checkout",
            },
          );

          setPaymentResponse(null);

          return;
        }

        scheduleNextCheck();
      } catch (err) {
        console.error(err);

        if (!cancelled) scheduleNextCheck();
      } finally {
        isChecking = false;
      }
    };

    checkCheckoutStatus();

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [paymentResponse?.paymentId, selectedPlan]);

  useEffect(() => {
    if (selectedPlan?.priceCents !== 0) return;

    setPaymentMethod(null);
    setPaymentResponse(null);
    resetForm();
    setTimeLeft(0);
    setPercentage(100);
    setPaymentLoading(false);
  }, [selectedPlan]);

  useEffect(() => {
    resetForm();
  }, [paymentMethod]);

  useEffect(() => {
    if (!createdUserAuth) return;

    handleFindAllUIPlans();
  }, [createdUserAuth]);

  useEffect(() => {
    if (!paymentResponse?.pixExpiresAt) return;

    const expiresAt = new Date(paymentResponse.pixExpiresAt).getTime();
    const startedAt = Date.now();
    const totalTime = expiresAt - startedAt;

    if (totalTime <= 0) {
      setPaymentResponse(null);
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = expiresAt - now;

      if (remaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        setPercentage(0);
        setPaymentResponse(null);
        return;
      }

      setTimeLeft(remaining);
      setPercentage((remaining / totalTime) * 100);
    }, 100);

    return () => clearInterval(interval);
  }, [paymentResponse, setPaymentResponse]);

  const onSubmit = async (): Promise<void> => {
    if (!selectedPlan) return;

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
          securityCode: cvv.replace(/\D/g, ""),
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
        planCode: selectedPlan.code,
        method: paymentMethod,
        mode: rest.mode ?? CheckoutMode.ONE_TIME,
      } as IStartCheckoutBody;

      if (paymentMethod === "CARD") formattedData.cardEncrypted = cardEncrypted;

      const response = await handleStartCheckout(
        formattedData,
        createdUserAuth?.token ?? "",
      );

      if (!response) return;

      trackEvent(
        ANALYTICS_EVENTS.CHECKOUT_STARTED,
        mapCheckoutStartedEventProperties({
          path,
          user: loggedUser,
          currentPlanCode: userCurrentPlan?.currentPlan?.code ?? null,
          planCode: response?.planCode ?? formattedData.planCode ?? null,
          provider: response?.provider ?? null,
          mode: response?.mode ?? formattedData.mode ?? null,
          method:
            (response?.method as IPaymentMethod) ??
            (formattedData.method as IPaymentMethod) ??
            null,
          subscriptionId: response?.subscriptionId ?? null,
          paymentId: response?.paymentId ?? null,
          providerOrderId: response?.providerOrderId ?? null,
          hasPaymentUrl: Boolean(response?.paymentUrl),
          hasPixQrCode: Boolean(
            response?.pixQrCodeImageUrl || response?.pixQrCodeText,
          ),
          surface: "public_pricing",
        }),
      );

      setPaymentResponse(response);
    } catch (err) {
      console.error(err);
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleCopy = async (): Promise<void> => {
    if (!paymentResponse?.pixQrCodeText) return;

    await navigator.clipboard.writeText(paymentResponse.pixQrCodeText);

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

  const handleReturnToPlataform = (): void => {
    reset();
    setStage(1);
    setFinalSubmitted(false);
    setCreatedUser(null);
    setCreatedUserAuth(null);
    setUnlocked2(false);
    setLoading(false);
    setPaymentMethod("CARD");
    setPaymentLoading(false);
    setPaymentResponse(null);
    setTimeLeft(0);
    setPercentage(100);
    resetForm();

    if (!createdUserAuth) {
      navigate.push("/");

      return;
    }

    const { token, tokenExpiresIn, refreshToken, refreshTokenExpiresIn } =
      createdUserAuth;

    Cookies.set("token", token, {
      expires: toDaysFromMs(tokenExpiresIn),
    });

    Cookies.set("refreshToken", refreshToken, {
      expires: toDaysFromMs(refreshTokenExpiresIn),
    });

    setToken(token);

    navigate.push("/campaigns");
  };

  if (!allUIPlans) return;

  return (
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
              Bem vindo à Added Today
              {createdUser?.name ? `, ${createdUser?.name}` : ""}! 🎉
            </h1>

            <span className="text-sm">
              Você está prestes a tranformar sua carreira como criador
            </span>
          </div>
        </motion.div>

        <PlansCarousel
          loggedUser={createdUser}
          userCurrentPlan={userCurrentPlan}
          trackEvent={trackEvent}
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
              Bem vindo à Added Today
              {createdUser?.name ? `, ${createdUser?.name}` : ""}! 🎉
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
          <div className="flex flex-col gap-1 bg-primary/20 px-8 py-5 text-foreground">
            <span className="font-title font-bold text-lg">
              Finalize a sua assinatura
            </span>
          </div>

          <div className="px-8 py-5">
            {selectedPlan?.priceCents !== 0 &&
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
                !paymentResponse ? (
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
                ) : paymentMethod === "PIX" ? (
                  <div className="flex flex-col items-center gap-5 mb-2 pb-5 border-primary/30 border-b w-full">
                    <div className="w-full">
                      <button
                        tabIndex={-1}
                        type="button"
                        onClick={() => setPaymentResponse(null)}
                        className="flex items-center gap-2 hover:bg-primary/10 p-2 border-2 border-primary/30 rounded-xl text-primary/70 transition-all duration-300 cursor-pointer"
                      >
                        <FaArrowLeftLong size={21} />

                        <span>Cancelar</span>
                      </button>
                    </div>

                    <figure className="flex justify-center items-center p-3 border-2 border-primary/30 rounded-xl w-50 h-50">
                      <Image
                        src={paymentResponse.pixQrCodeImageUrl ?? ""}
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
                ) : (
                  <Loading className="mb-2 pb-5 border-primary/30 border-b h-63.5" />
                )
              ) : (
                <Loading className="mb-2 pb-5 border-primary/30 border-b h-63.5" />
              ))}

            <div>
              <div className="flex justify-between items-center gap-5">
                <span className="text-foreground/70">Subtotal</span>

                <span>
                  {((selectedPlan?.priceCents ?? 0) / 100)
                    .toFixed(2)
                    .replace(".", ",")}
                </span>
              </div>

              <div className="flex justify-between items-center gap-5">
                <span className="text-foreground/70">Desconto Fundador</span>

                <span className="text-success-light">
                  {(selectedPlan?.introPriceCents
                    ? (selectedPlan?.priceCents -
                        (selectedPlan?.introPriceCents ?? 0)) /
                      100
                    : 0
                  )
                    .toFixed(2)
                    .replace(".", ",")}
                </span>
              </div>

              <div className="flex justify-between items-center gap-5 mt-2 pt-2 border-primary/30 border-t text-xl">
                <span className="font-bold">Total</span>

                <span>
                  {formatCurrency(
                    ((selectedPlan?.introPriceEligible
                      ? selectedPlan?.introPriceCents
                      : selectedPlan?.priceCents) ?? 0) / 100,
                    selectedPlan?.currency ?? "BRL",
                  )}
                </span>
              </div>
            </div>

            {(selectedPlan?.priceCents === 0 ||
              (!paymentResponse && paymentMethod)) && (
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
                      if (selectedPlan?.priceCents === 0) {
                        handleReturnToPlataform();

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
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RegisterCheckout;
