"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, easeOut } from "motion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import { useAnalytics, useAuth, useBillings, useUsers } from "@/contexts";

import Container from "@/components/container";
import NavigationTabs from "@/components/navigationTabs";
import Form from "@/components/form";
import Input from "@/components/input";
import Textarea from "@/components/textarea";
import FixedModal from "@/components/fixedModal";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import {
  mapCancelFlowAbandonedEventProperties,
  mapCancelFlowStartedEventProperties,
} from "@/lib/analytics";

import {
  planEntitlements,
  planIntervals,
  planPeriods,
  planStatus,
} from "@/constants/plans";

import { formatCurrency, formatPhoneNumber } from "@/utils/number.utils";
import { normalizeStr } from "@/utils/string.utils";

import updateProfileSchema from "@/validators/users/updateProfile.validator";

import { IUpdateProfile } from "@/contexts/users/interfaces";
import { cancelCheckoutSchema } from "@/validators/checkouts/cancelCheckout";

const Client = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const stagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const path = usePathname();

  const { trackEvent } = useAnalytics();
  const { userCurrentPlan, loggedUser, handleFindUserCurrentPlan } = useAuth();
  const { allUIPlans, handlePlanSubscriptionStatus } = useBillings();
  const { handleUpdateProfile } = useUsers();

  const userUIPlan = allUIPlans?.find(({ isCurrentPlan }) => isCurrentPlan);

  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IUpdateProfile>({
    mode: "onChange",
    resolver: yupResolver(updateProfileSchema),
  });

  const {
    register: cancelRegister,
    reset: cancelReset,
    handleSubmit: cancelHandleSubmit,
    formState: { errors: cancelErrors },
  } = useForm<{ reason: string }>({
    mode: "onChange",
    resolver: yupResolver(cancelCheckoutSchema),
    shouldUnregister: false,
  });

  const currentPlan = userCurrentPlan?.currentPlan ?? userUIPlan!;
  const subscription = userCurrentPlan?.subscription;

  const isFreePlan = currentPlan?.priceCents === 0;
  const isIntroOffer = !!subscription?.isInIntroOffer;
  const intervalLabel =
    planIntervals[currentPlan?.interval] ?? currentPlan?.interval;

  const basePrice = formatCurrency(
    (subscription?.baseAmountCents ?? 0) / 100,
    currentPlan?.currency,
  );

  const introPrice = formatCurrency(
    (subscription?.introPriceAmountCents ?? 0) / 100,
    currentPlan?.currency,
  );

  const unitPrice = formatCurrency(
    (subscription?.unitAmountCents ?? 0) / 100,
    currentPlan?.currency,
  );

  const isCancelAtPeriodEnd =
    currentPlan?.priceCents !== 0 &&
    !!subscription?.cancelAtPeriodEnd &&
    !!subscription?.canceledAt;

  const isOneTimeEnding =
    currentPlan?.priceCents !== 0 &&
    subscription?.checkoutMode === "ONE_TIME" &&
    !!subscription?.cancelAtPeriodEnd &&
    !!subscription?.currentPeriodEnd;

  const isRecurringRenewal =
    currentPlan?.priceCents !== 0 &&
    subscription?.checkoutMode === "RECURRING" &&
    !subscription?.cancelAtPeriodEnd &&
    !!subscription?.currentPeriodEnd;

  const shouldShowPlanStatus =
    isCancelAtPeriodEnd || isOneTimeEnding || isRecurringRenewal;

  const statusLabel = `Seu plano ${isCancelAtPeriodEnd ? "será cancelado" : isOneTimeEnding ? "se encerra" : isRecurringRenewal ? "será renovado" : ""} em`;

  const statusDate = shouldShowPlanStatus
    ? new Date(
        isCancelAtPeriodEnd
          ? (subscription?.canceledAt as string)
          : subscription?.currentPeriodEnd,
      ).toLocaleDateString("pt-BR", {
        dateStyle: "long",
      })
    : null;

  useEffect(() => {
    if (!userCurrentPlan || !loggedUser) return;

    if (modal)
      trackEvent(
        ANALYTICS_EVENTS.CANCEL_FLOW_STARTED,
        mapCancelFlowStartedEventProperties({
          path,
          user: loggedUser,
          userPlan: {
            currentPlan: currentPlan,
            subscription: subscription ?? undefined,
          },
        }),
      );
  }, [modal, userCurrentPlan, loggedUser]);

  useEffect(() => {
    if (!loggedUser) return;

    onReset();
  }, [loggedUser]);

  const onReset = (): void => {
    if (!loggedUser) return;

    reset({
      name: loggedUser.name ?? "",
      email: loggedUser.email ?? "",
      phone: formatPhoneNumber(loggedUser.phone ?? ""),
      instagramHandle: loggedUser.instagramHandle ?? "",
      tiktokHandle: loggedUser.tiktokHandle ?? "",
      youtubeHandle: loggedUser.youtubeHandle ?? "",
      contentTopic: loggedUser.contentTopic ?? "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const onSubmit = async ({
    currentPassword,
    newPassword,
    confirmNewPassword,
    ...data
  }: IUpdateProfile): Promise<void> => {
    const formattedData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => {
        const currentValue = loggedUser?.[key as keyof typeof loggedUser];

        return (
          normalizeStr(value as string | null | undefined, false) !==
          normalizeStr(currentValue as string | null | undefined, false)
        );
      }),
    );

    const passwordData = Object.fromEntries(
      Object.entries({
        currentPassword,
        newPassword,
        confirmNewPassword,
      }).filter(([_, value]) => !!value?.trim()),
    );

    if (
      !!Object.values(passwordData).length &&
      newPassword !== confirmNewPassword
    ) {
      toast.error("As senhas devem ser iguais!");

      return;
    }

    try {
      await handleUpdateProfile(formattedData, passwordData);
    } catch (err) {
      console.error(err);
    }
  };

  if (!userCurrentPlan || !allUIPlans || !loggedUser || !userUIPlan)
    return null;

  return (
    <>
      <Container Tag="main" className="flex flex-col gap-6 my-5">
        <NavigationTabs subTitle="Gerencie seu perfil, atualize suas informações e mantenha sua conta pronta para novas oportunidades." />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="gap-10 grid grid-cols-1 md:grid-cols-2 select-none"
        >
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 order-2 md:order-1"
          >
            <motion.span variants={fadeUp} className="font-title font-bold">
              Plano atual:
            </motion.span>

            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-4 p-5 border-2 border-secondary/30 rounded-2xl w-full"
            >
              <motion.div
                variants={fadeUp}
                className="flex flex-col gap-2 pb-4 border-primary/20 border-b"
              >
                <span className="font-title font-bold text-xl sm:text-left text-center">
                  {currentPlan.name}
                </span>

                {isFreePlan ? (
                  <span className="font-title sm:text-left text-center">
                    Gratuito
                  </span>
                ) : isIntroOffer ? (
                  <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
                    <span className="font-title text-error line-through">
                      {basePrice} / {intervalLabel}
                    </span>

                    <span>{">"}</span>

                    <span className="font-title">
                      {introPrice} / {intervalLabel}
                    </span>
                  </div>
                ) : (
                  <span className="font-title sm:text-left text-center">
                    {unitPrice} / {intervalLabel}
                  </span>
                )}
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-3">
                  <span>Status:</span>

                  <span className="font-semibold">
                    {userCurrentPlan.subscription?.status
                      ? (planStatus[userCurrentPlan.subscription.status] ??
                        userCurrentPlan.subscription.status)
                      : "Sem assinatura"}
                  </span>
                </div>

                {currentPlan?.priceCents !== 0 && (
                  <div className="flex justify-between items-center gap-3">
                    <span>Metodo de pagamento:</span>

                    <span className="font-semibold">
                      {userCurrentPlan.subscription?.checkoutMode === "ONE_TIME"
                        ? "Único"
                        : "Recorrente"}
                    </span>
                  </div>
                )}

                {shouldShowPlanStatus && (
                  <div
                    className={[
                      "flex justify-between items-center gap-3",
                      isRecurringRenewal ? "text-primary" : "text-error",
                    ].join(" ")}
                  >
                    <span>{statusLabel}:</span>

                    <span className="font-semibold text-right">
                      {statusDate}
                    </span>
                  </div>
                )}
              </motion.div>

              {userCurrentPlan.subscription?.checkoutMode === "RECURRING" &&
                currentPlan?.priceCents !== 0 && (
                  <motion.div
                    variants={fadeUp}
                    className="flex pt-4 border-primary/20 border-t w-full"
                  >
                    <button
                      tabIndex={-1}
                      type="button"
                      disabled={loading}
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        if (!subscription?.cancelAtPeriodEnd) {
                          setModal(true);

                          return;
                        }

                        setLoading(true);

                        await handlePlanSubscriptionStatus("CANCELED");

                        await handleFindUserCurrentPlan();

                        setLoading(false);
                      }}
                      className={[
                        "disabled:hover:bg-transparent disabled:opacity-50 mt-5 py-2 border border-primary/30 disabled:hover:border-primary/30 rounded-lg w-full text-primary disabled:hover:text-primary transition-all duration-300 cursor-pointer disabled:cursor-not-allowed",
                        subscription?.status === "ACTIVE"
                          ? "hover:border-error hover:bg-error/10 hover:text-error"
                          : "hover:border-primary hover:bg-primary/10 hover:text-primary",
                      ].join(" ")}
                    >
                      {!subscription?.cancelAtPeriodEnd
                        ? "Cancelar plano"
                        : "Reativar plano"}
                    </button>
                  </motion.div>
                )}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-4 p-5 border-2 border-secondary/30 rounded-2xl w-full"
            >
              <span className="font-title font-bold text-lg">Uso do plano</span>

              <div className="flex flex-col gap-4">
                {userCurrentPlan.entitlements.map(
                  ({ key, limit, remaining, period }) => {
                    const title = planEntitlements[key] ?? key;

                    const usageText =
                      limit !== null && remaining !== null
                        ? `${remaining} disponíveis de ${limit} por ${planPeriods[period] ?? period}`
                        : "Uso ilimitado";

                    return (
                      <motion.div
                        key={key}
                        variants={fadeUp}
                        className="flex flex-col gap-1 p-4 border border-primary/15 rounded-xl"
                      >
                        <span className="font-title font-bold">{title}:</span>

                        <span
                          className={[
                            "text-sm",
                            limit === null && remaining === null
                              ? "text-primary"
                              : remaining === 0
                                ? "text-error"
                                : remaining === 1
                                  ? "text-warning"
                                  : "",
                          ].join(" ")}
                        >
                          {usageText}
                        </span>
                      </motion.div>
                    );
                  },
                )}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-3 order-1 md:order-2"
          >
            <motion.span variants={fadeUp} className="font-title font-bold">
              Informações pessoais:
            </motion.span>

            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="p-5 border-2 border-secondary/30 rounded-xl"
            >
              <div>
                <Input
                  name="name"
                  label="Nome"
                  placeholder="Digite seu nome"
                  type="text"
                  register={register}
                  errors={errors}
                />

                <Input
                  name="phone"
                  label="Whatsapp"
                  placeholder="Digite seu número de telefone"
                  type="tel"
                  register={register}
                  errors={errors}
                />

                <Input
                  name="email"
                  label="Email"
                  placeholder="Digite seu email"
                  type="email"
                  register={register}
                  errors={errors}
                />

                <Input
                  name="instagramHandle"
                  label="Instagram"
                  placeholder="Digite o @ do seu Instagram"
                  type="text"
                  register={register}
                  errors={errors}
                />

                <Input
                  name="tiktokHandle"
                  label="TikTok"
                  placeholder="Digite o @ do seu TikTok"
                  type="text"
                  register={register}
                  errors={errors}
                />

                <Input
                  name="youtubeHandle"
                  label="Youtube"
                  placeholder="Digite o @ do seu canal do Youtube"
                  type="text"
                  register={register}
                  errors={errors}
                />

                <Textarea
                  name="contentTopic"
                  label="Você cria conteúdo sobre o quê?"
                  placeholder="Digite sobre o quê vocé cria de conteúdo"
                  register={register}
                  errors={errors}
                />

                <Input
                  name="currentPassword"
                  label="Senha atual"
                  placeholder="Digite sua senha atual"
                  type="password"
                  register={register}
                  errors={errors}
                />

                <Input
                  name="newPassword"
                  label="Nova senha"
                  placeholder="Digite uma nova senha"
                  type="password"
                  register={register}
                  errors={errors}
                />

                <Input
                  name="confirmNewPassword"
                  label="Confirme a nova senha"
                  placeholder="Digite novamente a nova senha"
                  type="password"
                  hide={false}
                  register={register}
                  errors={errors}
                />
              </div>

              <motion.div
                className="gap-3 grid grid-cols-1 sm:grid-cols-2 mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button
                  type="submit"
                  disabled={Object.values(errors).some(Boolean)}
                  title="Calcular Preço"
                  tabIndex={-1}
                  className="flex justify-center items-center gap-2 bg-secondary hover:bg-primary disabled:bg-error disabled:opacity-50 p-2 rounded text-light md:text-sm lg:text-base transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                >
                  Alterar informações
                </button>

                <button
                  type="button"
                  title="Limpar campos"
                  tabIndex={-1}
                  onClick={onReset}
                  className="bg-transparent hover:bg-gray-2/30 active:bg-gray-2 p-2 border border-foreground rounded transition-all duration-300 cursor-pointer"
                >
                  Limpar campos
                </button>
              </motion.div>
            </Form>
          </motion.div>
        </motion.div>
      </Container>

      <FixedModal
        isOpen={modal}
        close={() => {
          setModal(false);
          cancelReset();
        }}
      >
        <div className="flex flex-col gap-3">
          <span className="font-title font-bold text-center">
            Deseja cancelar a assinatura?
          </span>

          <Form
            className="flex flex-col gap-5"
            onSubmit={cancelHandleSubmit(async ({ reason }) => {
              setLoading(true);
              setModal(false);
              cancelReset();

              await handlePlanSubscriptionStatus("ACTIVE", reason);

              await handleFindUserCurrentPlan();

              setLoading(false);
            })}
          >
            <Textarea
              name="reason"
              label="Motivo do cancelamento:"
              errors={cancelErrors}
              register={cancelRegister}
              required
            />

            <div className="gap-4 grid grid-cols-2">
              <button
                tabIndex={-1}
                type="submit"
                disabled={!!Object.values(cancelErrors).length}
                className="hover:bg-error/10 disabled:opacity-50 py-2 border border-error/30 hover:border-error disabled:border-error/30 rounded-lg w-full text-error transition-all duration-300 cursor-pointer"
              >
                Cancelar plano
              </button>

              <button
                tabIndex={-1}
                type="button"
                onClick={() => {
                  setModal(false);
                  cancelReset();

                  trackEvent(
                    ANALYTICS_EVENTS.CANCEL_FLOW_ABANDONED,
                    mapCancelFlowAbandonedEventProperties({
                      path,
                      user: loggedUser,
                      userPlan: {
                        currentPlan,
                        subscription: subscription ?? undefined,
                      },
                    }),
                  );
                }}
                className="hover:bg-primary/10 py-2 border border-primary/30 hover:border-primary rounded-lg w-full text-primary transition-all duration-300 cursor-pointer"
              >
                Voltar
              </button>
            </div>
          </Form>
        </div>
      </FixedModal>
    </>
  );
};

export default Client;
