"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

import { useAuth, useBillings } from "@/contexts";

import PlansCarousel from "@/components/plansCarousel";
import Form from "../form";
import Input from "../input";
import Select from "../select";

import {
  cardCheckoutSchema,
  CheckoutMode,
  checkoutModeItems,
  pixCheckoutSchema,
} from "@/validators/checkouts/checkout.validator";

import { formatCurrency } from "@/utils/number.utils";
import { encriptValue } from "@/utils/encryption.utils";
import { toDaysFromMs } from "@/utils/date.utils";

import { IPaymentMethod, IStage } from "@/app/register/_client";
import { IUser } from "@/contexts/users/interfaces";
import { ILoginResponse, IRegister } from "@/contexts/auth/interfaces";
import {
  ICardCheckout,
  IPixCheckout,
  IUIPlan,
} from "@/contexts/billings/interfaces";

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
  const navigate = useRouter();

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

  const { setToken } = useAuth();
  const { allUIPlans, handleFindAllUIPlans } = useBillings();

  const [selectedPlan, setSelectedPlan] = useState<IUIPlan | null>(null);
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedPlan?.priceCents !== 0) return;

    setPaymentMethod(null);
  }, [selectedPlan]);

  useEffect(() => {
    resetForm();
  }, [paymentMethod]);

  useEffect(() => {
    if (!createdUserAuth) return;

    handleFindAllUIPlans();
  }, [createdUserAuth]);

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
      paymentMethod === "card" ? cardCheckoutSchema : pixCheckoutSchema,
    ),
    shouldUnregister: false,
  });

  const onSubmit = async (): Promise<void> => {
    const data = getValues();

    console.log(data);
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
                <div className="flex flex-col gap-5 mb-2 pb-5 border-primary/30 border-b">
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

                  <Form>
                    {paymentMethod === "card" && (
                      <Input
                        errors={errors}
                        register={register}
                        name="cardEncrypted"
                        label="Número do Cartão"
                        placeholder="Digite o número do seu cartão"
                        required
                      />
                    )}

                    <Input
                      errors={errors}
                      register={register}
                      name="customerTaxId"
                      label="Documento (CPF/CNPJ)"
                      placeholder="Digite seu CPF ou CNPJ"
                      required
                    />

                    <Select
                      label="Modo de Assinatura"
                      items={checkoutModeItems}
                      defaultValue={CheckoutMode.ONE_TIME}
                      register={register}
                      name="mode"
                      errors={errors}
                      control={control}
                      required
                    />
                  </Form>
                </div>
              ))}

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
                <span className="text-foreground/70">Desconto Fundador</span>

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

            {(selectedPlan?.priceCents === 0 || !!paymentMethod) && (
              <div className="flex flex-col gap-5 mt-5 w-full">
                <div className="flex flex-col gap-3 w-full">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    tabIndex={-1}
                    disabled={
                      paymentLoading || paymentMethod === "pix"
                        ? errors.customerTaxId || errors.mode
                        : errors.customerTaxId ||
                          errors.mode ||
                          (errors as any).cardEncrypted
                    }
                    onClick={async () => {
                      if (paymentMethod === "pix") {
                        await trigger(["customerTaxId", "mode"], {
                          shouldFocus: true,
                        });

                        if (errors.customerTaxId || errors.mode) return;

                        onSubmit();

                        return;
                      } else {
                        await trigger(
                          ["customerTaxId", "mode", "cardEncrypted"],
                          {
                            shouldFocus: true,
                          },
                        );

                        if (
                          errors.customerTaxId ||
                          errors.mode ||
                          (errors as any).cardEncrypted
                        )
                          return;

                        onSubmit();
                      }

                      // reset();
                      // setStage(1);
                      // setFinalSubmitted(false);
                      // setCreatedUser(null);
                      // setCreatedUserAuth(null);
                      // setUnlocked2(false);
                      // setLoading(false);
                      // setPaymentMethod("card");

                      // if (!createdUserAuth) {
                      //   navigate.push("/");

                      //   return;
                      // }

                      // const {
                      //   token,
                      //   tokenExpiresIn,
                      //   refreshToken,
                      //   refreshTokenExpiresIn,
                      // } = createdUserAuth;

                      // Cookies.set("token", encriptValue(token), {
                      //   expires: toDaysFromMs(tokenExpiresIn),
                      // });

                      // Cookies.set("refreshToken", encriptValue(refreshToken), {
                      //   expires: toDaysFromMs(refreshTokenExpiresIn),
                      // });

                      // setToken(token);

                      // navigate.push("/campaigns");
                    }}
                    className="bg-primary/70 hover:bg-primary active:bg-primary/85 disabled:bg-secondary disabled:opacity-50 p-2 py-5 rounded-lg w-full text-white transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {paymentMethod === "pix"
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
