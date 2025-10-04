"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IoBulbSharp,
  IoCalculatorOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { FiTrendingUp } from "react-icons/fi";
import { PiChartLineDuotone } from "react-icons/pi";
import { TbTargetArrow } from "react-icons/tb";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { FaCheck, FaDollarSign } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { motion } from "motion/react";

import { useQuotations } from "@/contexts";

import Container from "@/components/container";
import NavigationTabs from "@/components/navigationTabs";
import Input from "@/components/input";
import Form from "@/components/form";
import Loading from "@/components/loading";

import createQuotationSchema from "@/validators/quotations/create.validator";
import { captalize } from "@/utils/string.utils";
import { formatDate } from "@/utils/date.utils";
import { createInputs } from "@/constants/quotations";
import { ICreateQuotation } from "@/contexts/quotations/interfaces";

const Client = () => {
  const { quotations, quotationsRemaining, handleCreateQuotation } =
    useQuotations();
  const lastQuotation = quotations?.[0];
  const lastQuotationRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<ICreateQuotation>({
    mode: "onChange",
    resolver: yupResolver(createQuotationSchema),
  });

  const [_, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCreate = async (data: ICreateQuotation): Promise<void> => {
    const formattedData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value)
    ) as ICreateQuotation;

    if (!quotationsRemaining)
      toast.error("Limite de Precificações por dia atingido!", {
        id: "register-quotation",
      });
    else await handleCreateQuotation(formattedData);

    reset();
    lastQuotationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container Tag="main" className="flex flex-col gap-6 my-5">
      <NavigationTabs />

      <motion.section
        className="flex flex-col gap-6 p-6 border border-secondary/30 rounded-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="flex flex-col gap-2 select-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <IoCalculatorOutline size={20} className="text-primary" />
            <h2 className="font-title font-bold text-foreground text-2xl">
              Calculadora de Precificação
            </h2>
          </div>
          <span className="text-foreground/60 text-justify">
            Calcule o valor justo do seu conteúdo baseado em métricas e
            engajamento
          </span>
        </motion.div>

        <div className="gap-6 md:gap-10 grid grid-cols-1 md:grid-cols-2">
          <Form
            onSubmit={handleSubmit(handleCreate)}
            className="order-last md:order-first"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="flex flex-col gap-4"
            >
              {createInputs.map(
                ({ name, label, placeholder, type, required }, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Input
                      name={name}
                      register={register}
                      label={label}
                      placeholder={placeholder}
                      type={type}
                      required={required}
                      errors={errors}
                    />
                  </motion.div>
                )
              )}
            </motion.div>

            <motion.div
              className="gap-3 grid grid-cols-1 md:grid-cols-2 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                type="submit"
                disabled={
                  Object.values(errors).some(Boolean) ||
                  quotationsRemaining === 0
                }
                className="flex justify-center items-center gap-2 bg-secondary hover:bg-primary disabled:bg-error disabled:opacity-50 p-2 rounded text-light transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
              >
                {quotationsRemaining === 0 ? (
                  <span>Limite de Precificações Diárias Atingida</span>
                ) : (
                  <>
                    <IoCalculatorOutline className="text-light" />
                    <span>Calcular Preço</span>
                  </>
                )}
              </button>
              <button
                type="reset"
                className="bg-transparent hover:bg-gray-2/30 p-2 border border-foreground rounded transition-all duration-300 cursor-pointer"
              >
                Limpar campos
              </button>
            </motion.div>
          </Form>

          <motion.div
            className="flex flex-col gap-6 order-first md:order-last select-none"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4 px-6 py-4 border border-secondary/30 rounded-xl"
              title="Tutorial de Taxa de Engajamento"
            >
              <div className="flex items-center gap-3">
                <HiOutlineReceiptTax size={20} className="text-foreground" />
                <h4 className="font-title font-bold text-foreground text-lg">
                  Tutorial de Taxa de Engajamento
                </h4>
              </div>
              <p className="flex flex-col gap-1 text-center">
                <span className="text-primary">
                  Taxa = (Curtidas + Comentários + Compartilhamentos) ÷
                  Seguidores
                </span>
                <span className="text-primary">
                  Taxa (em porcentagem) = Taxa x 100
                </span>
                <span className="mt-3 text-foreground/60 text-xs">
                  Ex: ( 2.000 + 100 ) ÷ 50.000 = 0.042 x 100 = 4.2%
                </span>
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6 px-6 py-4 border border-secondary/30 rounded-xl"
              title="Dicas de Precificação"
            >
              <div className="flex items-center gap-3">
                <FiTrendingUp size={20} className="text-foreground" />
                <h4 className="font-title font-bold text-foreground text-lg">
                  Dicas de Precificação
                </h4>
              </div>
              <motion.ul
                className="flex flex-col gap-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.15 } },
                }}
              >
                <motion.li
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="flex flex-col bg-error/10 p-3 rounded-xl text-error"
                  title="Engajamento Alto"
                >
                  <p className="flex items-center gap-2">
                    <IoBulbSharp className="text-warning" />
                    <span className="font-bold">Engajamento Alto</span>
                  </p>
                  <span title="Taxa acima de 5% pode justificar preços 30-50% maiores">
                    Taxa acima de 5% pode justificar preços 30-50% maiores
                  </span>
                </motion.li>
                <motion.li
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="flex flex-col bg-success/10 p-3 rounded-xl text-success"
                  title="Nicho Específico"
                >
                  <p className="flex items-center gap-2">
                    <PiChartLineDuotone className="text-primary" />
                    <span className="font-bold">Nicho Específico</span>
                  </p>
                  <span title="Audiência muito específica pode aumentar o valor em até 40%">
                    Audiência muito específica pode aumentar o valor em até 40%
                  </span>
                </motion.li>
                <motion.li
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="flex flex-col bg-primary/10 p-3 rounded-xl text-primary"
                  title="Qualidade do Conteúdo"
                >
                  <p className="flex items-center gap-2">
                    <TbTargetArrow className="text-error" />
                    <span className="font-bold">Qualidade do Conteúdo</span>
                  </p>
                  <span title="Histórico de alta qualidade permite cobrar preços premium">
                    Histórico de alta qualidade permite cobrar preços premium
                  </span>
                </motion.li>
              </motion.ul>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4 px-6 py-4 border border-secondary/30 rounded-xl"
              title={`${quotationsRemaining ? `${quotationsRemaining} ` : ""}Precificações Restantes Hoje`}
            >
              {quotationsRemaining ? (
                <h4 className="flex justify-center items-center gap-2 font-title font-bold text-foreground text-lg">
                  <span
                    className={`text-${quotationsRemaining > 2 ? "primary" : quotationsRemaining > 0 ? "warning" : "error"}`}
                  >
                    {quotationsRemaining}
                  </span>
                  <span>Precificações Restantes Hoje</span>
                </h4>
              ) : (
                <Loading size={16} />
              )}
            </motion.div>

            <motion.div
              ref={lastQuotationRef}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6 bg-secondary/10 px-6 py-4 border border-secondary/30 rounded-xl h-full max-h-120 overflow-y-auto custom-scrollbar"
              title="Última Precificação"
            >
              <div className="flex lg:flex-row flex-col justify-between items-center gap-2">
                <div className="flex items-center gap-3">
                  <FaDollarSign size={20} className="text-green-500" />
                  <h3 className="font-title font-bold text-foreground text-lg">
                    Última Precificação
                  </h3>
                </div>
                {lastQuotation && (
                  <span
                    className="flex items-center gap-2 text-foreground/60"
                    title={`Criado em: ${formatDate(
                      new Date(lastQuotation.createdAt),
                      {
                        getHours: true,
                        getMinutes: true,
                      }
                    )}`}
                  >
                    <IoTimeOutline />
                    {formatDate(new Date(lastQuotation.createdAt), {
                      getHours: true,
                      getMinutes: true,
                    })}
                  </span>
                )}
              </div>
              <ul className="flex flex-col gap-5">
                {lastQuotation ? (
                  <>
                    <li className="flex flex-col gap-2 pb-5 border-secondary/30 border-b-1 text-foreground/70">
                      <div
                        className="flex sm:flex-row lg:flex-row flex-col md:flex-col sm:justify-between"
                        title={`Nicho: ${captalize(lastQuotation.data.niche)}`}
                      >
                        <p>
                          <span className="font-bold">Nicho</span>:
                        </p>
                        <span>{captalize(lastQuotation.data.niche)}</span>
                      </div>
                      <div
                        className="flex sm:flex-row lg:flex-row flex-col md:flex-col sm:justify-between"
                        title={`Taxa de Engajamento: ${((lastQuotation.data.engagementRate ?? 0) * 100).toFixed(2).replace(".", ",")}%`}
                      >
                        <p>
                          <span className="font-bold">Taxa de Engajamento</span>
                          :
                        </p>
                        <span>
                          {((lastQuotation.data.engagementRate ?? 0) * 100)
                            .toFixed(2)
                            .replace(".", ",")}
                          %
                        </span>
                      </div>
                      <div
                        className="flex sm:flex-row lg:flex-row flex-col md:flex-col sm:justify-between"
                        title={`Seguidores do Instagram: ${lastQuotation.data.instagramFollowers} seguidores`}
                      >
                        <p>
                          <span className="font-bold">
                            Seguidores do Instagram
                          </span>
                          :
                        </p>
                        <span>
                          {lastQuotation.data.instagramFollowers} seguidores
                        </span>
                      </div>
                      <div
                        className="flex sm:flex-row lg:flex-row flex-col md:flex-col sm:justify-between"
                        title={`Seguidores do TikTok: ${lastQuotation.data.tiktokFollowers} seguidores`}
                      >
                        <p>
                          <span className="font-bold">
                            Seguidores do TikTok
                          </span>
                          :
                        </p>
                        <span>
                          {lastQuotation.data.tiktokFollowers} seguidores
                        </span>
                      </div>
                      <div
                        className="flex sm:flex-row lg:flex-row flex-col md:flex-col sm:justify-between"
                        title={`Inscrições no Youtube: ${lastQuotation.data.youtubeSubscribers} inscritos`}
                      >
                        <p>
                          <span className="font-bold">
                            Inscrições no Youtube
                          </span>
                          :
                        </p>
                        <span>
                          {lastQuotation.data.youtubeSubscribers} inscritos
                        </span>
                      </div>
                      <div
                        className="flex sm:flex-row lg:flex-row flex-col md:flex-col sm:justify-between"
                        title={`Visualizações Médias no TikTok: ${lastQuotation.data.youtubeSubscribers} inscritos`}
                      >
                        <p>
                          <span className="font-bold">
                            Visualizações Médias no TikTok
                          </span>
                          :
                        </p>
                        <span>
                          {lastQuotation.data.youtubeSubscribers} inscritos
                        </span>
                      </div>
                    </li>
                    <li className="gap-2 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 text-center">
                      {[
                        [
                          "Vídeo TikTok",
                          lastQuotation.data.includesTiktokVideo,
                        ],
                        [
                          "Reels/Stories",
                          lastQuotation.data.includesReelsCombo,
                        ],
                        [
                          "Impulsionar Conteúdo",
                          lastQuotation.data.includesBoostRights,
                        ],
                        [
                          "Uso da Imagem",
                          lastQuotation.data.includesImageRights,
                        ],
                        ["Evento Presencial", lastQuotation.data.includesEvent],
                      ].map(([label, condition], i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          title={String(label)}
                          className={`flex items-center text-sm p-1 px-4 xl:px-0 rounded-md gap-2 justify-center ${condition ? "text-success bg-success/30" : "text-error bg-error/30"}`}
                        >
                          <div className="flex items-center gap-2 w-41">
                            {condition ? (
                              <FaCheck className="text-success" />
                            ) : (
                              <IoClose className="text-error" />
                            )}
                            <span>{label}</span>
                          </div>
                        </motion.div>
                      ))}
                    </li>
                    <li className="flex flex-col items-center gap-5 mt-5">
                      <h5 className="flex items-center gap-2 font-title font-semibold text-foreground/70 text-md select-none">
                        Resumo da Precificação
                      </h5>

                      <article className="mt-1 p-4 border-1 border-primary rounded-xl text-primary text-sm leading-relaxed whitespace-pre-line select-text prose">
                        <ReactMarkdown>
                          {captalize(lastQuotation.openAiResponse)}
                        </ReactMarkdown>
                      </article>
                    </li>
                  </>
                ) : (
                  <Loading className="h-143.5" />
                )}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </Container>
  );
};

export default Client;
