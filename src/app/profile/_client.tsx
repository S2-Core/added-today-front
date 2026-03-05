"use client";

import { useAuth } from "@/contexts";
import { FaCheckCircle } from "react-icons/fa";
import { motion, easeOut } from "motion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Container from "@/components/container";
import NavigationTabs from "@/components/navigationTabs";
import Form from "@/components/form";
import Input from "@/components/input";

import {
  planEntitlements,
  planIcons,
  planIntervals,
  planPeriods,
  planProviders,
  planStatus,
} from "@/constants/plans";

import { formatCurrency } from "@/utils/number.utils";

import updateProfileSchema from "@/validators/users/updateProfile.validator";

import { IUpdateProfile } from "@/contexts/auth/interfaces";
import Textarea from "@/components/textarea";

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

  const listStagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  const listItem = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
  };

  const { allUIPlans, userCurrentPlan, loggedUser } = useAuth();

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

  if (!userCurrentPlan || !allUIPlans || !loggedUser || !userUIPlan)
    return null;

  const onSubmit = async (data: IUpdateProfile) => {
    console.log(data);
  };

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
          className="flex-col gap-3 order-2 md:order-1flex"
        >
          <motion.span variants={fadeUp} className="font-title font-bold">
            Meu plano atual:
          </motion.span>

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-5 p-5 border-2 border-secondary/30 rounded-xl w-full"
          >
            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <span className="font-title font-bold text-2xl text-center">
                {userCurrentPlan.currentPlan.name}
              </span>

              <span className="font-normal text-center">
                {userCurrentPlan.currentPlan.description}
              </span>
            </motion.div>

            <motion.div variants={fadeIn}>
              {userUIPlan.sections.map(({ title, items }, i) => (
                <motion.div
                  variants={fadeUp}
                  key={`${i}-${title}`}
                  className="flex flex-col gap-3"
                >
                  <span className="font-title font-bold sm:text-left text-center">
                    {title}
                  </span>

                  <motion.ul
                    variants={listStagger}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col gap-2 sm:ml-5"
                  >
                    {items.map(
                      ({ key, icon, title, description, displayLimit }, y) => (
                        <motion.li
                          key={`${i}-${y}-${title}`}
                          variants={listItem}
                          className="flex items-start gap-2 text-sm/normal"
                        >
                          {key && (
                            <FaCheckCircle className="w-full max-w-5.25 h-full max-h-5.25 text-success-light" />
                          )}

                          <span className="w-full max-w-5.25 h-full max-h-5.25">
                            {planIcons[icon as keyof typeof planIcons] ?? icon}
                          </span>

                          <div className="flex flex-col">
                            <span className="font-title font-bold text-base/normal">
                              {title}
                            </span>

                            <span className="text-sm/normal">
                              {description}

                              {displayLimit && (
                                <span className="font-bold">{` (${displayLimit})`}</span>
                              )}
                            </span>
                          </div>
                        </motion.li>
                      ),
                    )}
                  </motion.ul>

                  {userUIPlan.sections.length - 1 !== i && (
                    <hr className="mt-2 mb-5 border-primary/30 border-dashed" />
                  )}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-3 pt-5 border-primary/30 border-t"
            >
              <span className="font-title font-bold">
                Informações do plano:
              </span>

              <motion.ul
                variants={listStagger}
                initial="hidden"
                animate="show"
                className="ml-5"
              >
                <motion.li variants={listItem} className="flex gap-1">
                  <span className="font-bold">Valor:</span>

                  <span>
                    {userCurrentPlan.currentPlan.priceCents === 0
                      ? "Gratuito"
                      : `${(formatCurrency(userCurrentPlan.currentPlan.priceCents / 100), userCurrentPlan.currentPlan.currency)} por ${planIntervals[userCurrentPlan.currentPlan.interval] ?? userCurrentPlan.currentPlan.interval}`}
                  </span>
                </motion.li>

                {userCurrentPlan.subscription && (
                  <>
                    <motion.li variants={listItem} className="flex gap-1">
                      <span className="font-bold">Status:</span>

                      <span>
                        {planStatus[userCurrentPlan.subscription.status] ??
                          userCurrentPlan.subscription.status}
                      </span>
                    </motion.li>

                    <motion.li variants={listItem} className="flex gap-1">
                      <span className="font-bold">Provedor do pagamento:</span>

                      <span>
                        {userCurrentPlan.subscription.provider
                          ? (planProviders[
                              userCurrentPlan.subscription.provider
                            ] ?? userCurrentPlan.subscription.provider)
                          : "Nenhum"}
                      </span>
                    </motion.li>

                    <motion.li variants={listItem} className="flex gap-1">
                      <span className="font-bold">
                        Cancelar plano quando vencer:
                      </span>

                      <span>
                        {userCurrentPlan.subscription.cancelAtPeriodEnd
                          ? "Sim"
                          : "Nao"}
                      </span>
                    </motion.li>

                    {userCurrentPlan.subscription.currentPeriodStart && (
                      <motion.li variants={listItem} className="flex gap-1">
                        <span className="font-bold">Data de início:</span>

                        <span>
                          {new Date(
                            userCurrentPlan.subscription.currentPeriodStart,
                          ).toLocaleDateString("pt-BR", {
                            dateStyle: "medium",
                          })}
                        </span>
                      </motion.li>
                    )}

                    {userCurrentPlan.subscription.currentPeriodEnd && (
                      <motion.li variants={listItem} className="flex gap-1">
                        <span className="font-bold">Data de vencimento:</span>

                        <span>
                          {new Date(
                            userCurrentPlan.subscription.currentPeriodEnd,
                          ).toLocaleDateString("pt-BR", {
                            dateStyle: "medium",
                          })}
                        </span>
                      </motion.li>
                    )}

                    {userCurrentPlan.subscription.canceledAt && (
                      <motion.li variants={listItem} className="flex gap-1">
                        <span className="font-bold">Data de cancelamento:</span>

                        <span>
                          {new Date(
                            userCurrentPlan.subscription.canceledAt,
                          ).toLocaleDateString("pt-BR", {
                            dateStyle: "medium",
                          })}
                        </span>
                      </motion.li>
                    )}

                    {userCurrentPlan.subscription.cancelReason && (
                      <motion.li variants={listItem} className="flex gap-1">
                        <span className="font-bold">
                          Motivo do cancelamento:
                        </span>

                        <span>{userCurrentPlan.subscription.cancelReason}</span>
                      </motion.li>
                    )}
                  </>
                )}

                {userCurrentPlan.entitlements.map(
                  ({ key, isEnabled, limit, remaining, period }) => (
                    <motion.li
                      key={key}
                      variants={listItem}
                      className={[
                        "flex gap-1",
                        isEnabled ? "opacity-100" : "opacity-50",
                      ].join(" ")}
                    >
                      <span className="font-bold">
                        {planEntitlements[key] ?? key}:
                      </span>

                      <span
                        className={
                          limit !== null && remaining !== null
                            ? limit > remaining!
                              ? remaining === 2
                                ? "text-warning"
                                : remaining === 1
                                  ? "text-danger"
                                  : ""
                              : ""
                            : ""
                        }
                      >
                        {remaining !== null && limit !== null
                          ? `${remaining} / ${limit} por ${planPeriods[period] ?? period}`
                          : "Ilimitado"}
                      </span>
                    </motion.li>
                  ),
                )}
              </motion.ul>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-3 order-1 md:order-2"
        >
          <motion.span variants={fadeUp} className="font-title font-bold">
            Informações pessoais:
          </motion.span>

          <Form onSubmit={handleSubmit(onSubmit)}>
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
                className="flex justify-center items-center gap-2 bg-secondary hover:bg-primary disabled:bg-error disabled:opacity-50 p-2 rounded text-light transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
              >
                Alterar informações
              </button>

              <button
                type="reset"
                title="Limpar campos"
                tabIndex={-1}
                onClick={() => reset()}
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
