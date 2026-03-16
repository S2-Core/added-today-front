"use client";

import { useEffect } from "react";
import { motion, easeOut } from "motion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import { useAuth, useBillings, useUsers } from "@/contexts";

import Container from "@/components/container";
import NavigationTabs from "@/components/navigationTabs";
import Form from "@/components/form";
import Input from "@/components/input";
import Textarea from "@/components/textarea";

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

const Client = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
  };

  const stagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const { userCurrentPlan, loggedUser } = useAuth();
  const { allUIPlans } = useBillings();
  const { handleUpdateProfile } = useUsers();

  const userUIPlan = allUIPlans?.find(({ isCurrentPlan }) => isCurrentPlan);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IUpdateProfile>({
    mode: "onChange",
    resolver: yupResolver(updateProfileSchema),
  });

  const isCancelAtPeriodEnd =
    userCurrentPlan?.currentPlan?.priceCents !== 0 &&
    !!userCurrentPlan?.subscription?.cancelAtPeriodEnd &&
    !!userCurrentPlan?.subscription?.canceledAt;

  const isOneTimeEnding =
    userCurrentPlan?.currentPlan?.priceCents !== 0 &&
    userCurrentPlan?.subscription?.checkoutMode === "ONE_TIME" &&
    !!userCurrentPlan?.subscription?.cancelAtPeriodEnd &&
    !!userCurrentPlan?.subscription?.currentPeriodEnd;

  const isRecurringRenewal =
    userCurrentPlan?.currentPlan?.priceCents !== 0 &&
    userCurrentPlan?.subscription?.checkoutMode === "RECURRING" &&
    !userCurrentPlan?.subscription?.cancelAtPeriodEnd &&
    !!userCurrentPlan?.subscription?.currentPeriodEnd;

  const shouldShowPlanStatus =
    isCancelAtPeriodEnd || isOneTimeEnding || isRecurringRenewal;

  const statusLabel = `Seu plano ${isCancelAtPeriodEnd ? "será cancelado" : isOneTimeEnding ? "se encerra" : isRecurringRenewal ? "será renovado" : ""} em`;

  const statusDate = shouldShowPlanStatus
    ? new Date(
        isCancelAtPeriodEnd
          ? (userCurrentPlan!.subscription!.canceledAt as string)
          : userCurrentPlan!.subscription!.currentPeriodEnd,
      ).toLocaleDateString("pt-BR", {
        dateStyle: "long",
      })
    : null;

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
      Object.entries(data).filter(
        ([key, value]) =>
          normalizeStr(value, false) !==
          normalizeStr(
            loggedUser?.[key as keyof typeof loggedUser] as string,
            false,
          ),
      ),
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

      onReset();
    } catch (err) {
      console.error(err);
    }
  };

  if (!userCurrentPlan || !allUIPlans || !loggedUser || !userUIPlan)
    return null;

  return (
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
                {userCurrentPlan.currentPlan.name}
              </span>

              <span className="font-title text- sm:text-left text-center">
                {userCurrentPlan.currentPlan.priceCents === 0
                  ? "Gratuito"
                  : `${formatCurrency(userCurrentPlan.currentPlan.priceCents / 100, userCurrentPlan.currentPlan.currency)} / ${planIntervals[userCurrentPlan.currentPlan.interval] ?? userCurrentPlan.currentPlan.interval}`}
              </span>
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

              {shouldShowPlanStatus && (
                <div className="flex justify-between items-center gap-3">
                  <span>{statusLabel}:</span>

                  <span className="font-semibold text-right">{statusDate}</span>
                </div>
              )}
            </motion.div>
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
  );
};

export default Client;
