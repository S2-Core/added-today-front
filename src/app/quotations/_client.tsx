"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IoBulbSharp,
  IoCalculatorOutline,
  IoChevronBack,
  IoChevronForward,
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
import useEmblaCarousel from "embla-carousel-react";

import { useAuth, useQuotations } from "@/contexts";

import Container from "@/components/container";
import NavigationTabs from "@/components/navigationTabs";
import Input from "@/components/input";
import Form from "@/components/form";
import EmptyList from "@/components/emptyList";
import Loading from "@/components/loading";

import { captalize } from "@/utils/string.utils";
import { formatDate } from "@/utils/date.utils";

import createQuotationSchema from "@/validators/quotations/create.validator";

import { createInputs } from "@/constants/quotations";

import { ICreateQuotation, IQuotation } from "@/contexts/quotations/interfaces";

const QuotationCarousel = ({ quotations }: { quotations: IQuotation[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!quotations.length) return;
    setSelectedIndex(0);
    if (emblaApi) emblaApi.scrollTo(0);
  }, [quotations, emblaApi]);

  return (
    <div className="relative flex flex-col p-6 h-full">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {quotations.map((quotation, i) => (
            <div
              key={`quotation-slide-${i}`}
              className="flex flex-col flex-shrink-0 justify-between w-full h-full overflow-hidden"
            >
              <div className="flex-1 mb-18 2xl:mb-18 xl:mb-20 px-1 pr-2 overflow-y-auto">
                <ul className="flex flex-col gap-5">
                  <li className="flex flex-col gap-2 pb-5 border-secondary/30 border-b-2 text-foreground/70">
                    <div className="flex sm:flex-row lg:flex-row flex-col sm:justify-between sm:gap-3">
                      <p>
                        <span className="font-bold whitespace-nowrap">
                          Foi criado
                        </span>
                        :
                      </p>
                      <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        {formatDate(new Date(quotation.createdAt), {
                          getHours: true,
                          getMinutes: true,
                        })}
                      </span>
                    </div>

                    <div className="flex sm:flex-row lg:flex-row flex-col sm:justify-between sm:gap-3">
                      <p>
                        <span className="font-bold whitespace-nowrap">
                          Nicho
                        </span>
                        :
                      </p>
                      <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        {captalize(quotation.data.niche)}
                      </span>
                    </div>

                    <div className="flex sm:flex-row lg:flex-row flex-col sm:justify-between sm:gap-3">
                      <p>
                        <span className="font-bold whitespace-nowrap">
                          Taxa de Engajamento
                        </span>
                        :
                      </p>
                      <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        {((quotation.data.engagementRate ?? 0) * 100)
                          .toFixed(2)
                          .replace(".", ",")}
                        %
                      </span>
                    </div>

                    {!!quotation.data.instagramFollowers && (
                      <div className="flex sm:flex-row lg:flex-row flex-col sm:justify-between sm:gap-3">
                        <p>
                          <span className="font-bold whitespace-nowrap">
                            Seguidores do Instagram
                          </span>
                          :
                        </p>
                        <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                          {quotation.data.instagramFollowers} seguidores
                        </span>
                      </div>
                    )}

                    {!!quotation.data.tiktokFollowers && (
                      <div className="flex sm:flex-row lg:flex-row flex-col sm:justify-between sm:gap-3">
                        <p>
                          <span className="font-bold whitespace-nowrap">
                            Seguidores do TikTok
                          </span>
                          :
                        </p>
                        <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                          {quotation.data.tiktokFollowers} seguidores
                        </span>
                      </div>
                    )}

                    {!!quotation.data.youtubeSubscribers && (
                      <div className="flex sm:flex-row lg:flex-row flex-col sm:justify-between sm:gap-3">
                        <p>
                          <span className="font-bold whitespace-nowrap">
                            Inscrições no Youtube
                          </span>
                          :
                        </p>
                        <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                          {quotation.data.youtubeSubscribers} inscritos
                        </span>
                      </div>
                    )}
                  </li>

                  <li className="gap-2 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 text-center">
                    {[
                      ["Vídeo TikTok", quotation.data.includesTiktokVideo],
                      ["Reels/Stories", quotation.data.includesReelsCombo],
                      [
                        "Impulsionar Conteúdo",
                        quotation.data.includesBoostRights,
                      ],
                      ["Uso da Imagem", quotation.data.includesImageRights],
                      ["Evento Presencial", quotation.data.includesEvent],
                    ].map(([label, condition], i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        title={String(label)}
                        className={`flex items-center text-sm p-1 lg:p-2 xl:px-0 xl:text-xs rounded-md gap-2 justify-center ${
                          condition
                            ? "text-success bg-success/30"
                            : "text-error bg-error/30"
                        }`}
                      >
                        <div className="flex justify-center items-center gap-2 w-41">
                          {condition ? <FaCheck /> : <IoClose />}
                          <span className="whitespace-nowrap">{label}</span>
                        </div>
                      </motion.div>
                    ))}
                  </li>

                  <li className="flex flex-col flex-grow items-center gap-5 mt-5 w-full">
                    <h5 className="flex items-center gap-2 font-title font-semibold text-foreground/70 text-md select-none">
                      Resumo da Precificação
                    </h5>

                    <article className="mt-1 p-4 border-1 border-primary rounded-xl text-primary text-sm leading-relaxed whitespace-pre-line prose">
                      <ReactMarkdown>
                        {captalize(quotation.openAiResponse)}
                      </ReactMarkdown>
                    </article>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollPrev}
        disabled={!emblaApi || !emblaApi.canScrollPrev()}
        className="top-1/2 left-2 absolute bg-secondary/30 hover:bg-secondary disabled:bg-gray-7/60 p-2 rounded-full text-foreground disabled:text-gray-7 transition-all -translate-y-1/2 cursor-pointer disabled:cursor-default"
        title="Anterior"
      >
        <IoChevronBack />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        disabled={!emblaApi || !emblaApi.canScrollNext()}
        className="top-1/2 right-2 absolute bg-secondary/30 hover:bg-secondary disabled:bg-gray-7/60 p-2 rounded-full text-foreground disabled:text-gray-7 transition-all -translate-y-1/2 cursor-pointer disabled:cursor-default"
        title="Próximo"
      >
        <IoChevronForward />
      </button>

      <div className="flex justify-center gap-2 mt-2">
        {quotations.map((_, i) => (
          <button
            key={`dot-${i}`}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === selectedIndex ? "bg-primary" : "bg-secondary/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Client = () => {
  const { quotations, quotationsRemaining, handleCreateQuotation } =
    useQuotations();
  const { loggedUser } = useAuth();

  const quotationsRef = useRef<HTMLDivElement | null>(null);

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
    quotationsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!loggedUser) return null;

  return (
    <Container Tag="main" className="flex flex-col gap-6 my-5">
      <NavigationTabs />

      <motion.section
        className="flex flex-col gap-6 p-6 border-2 border-secondary/30 rounded-xl"
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

        <div className="gap-6 md:gap-10 grid grid-cols-1 lg:grid-cols-2">
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
                    key={`quotation-input-${name}-${label}-${type}-${i}`}
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
              className="gap-3 grid grid-cols-1 sm:grid-cols-2 mt-10"
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
                title={
                  quotationsRemaining === 0
                    ? "Limite de Precificações Diárias Atingida"
                    : "Calcular Preço"
                }
                tabIndex={-1}
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
                title="Limpar campos"
                tabIndex={-1}
                onClick={() => reset()}
                className="bg-transparent hover:bg-gray-2/30 active:bg-gray-2 p-2 border border-foreground rounded transition-all duration-300 cursor-pointer"
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
              className="flex flex-col gap-4 px-6 py-4 border-2 border-secondary/30 rounded-xl"
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
              className="flex flex-col gap-6 px-6 py-4 border-2 border-secondary/30 rounded-xl"
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
              className="flex flex-col gap-4 px-6 py-4 border-2 border-secondary/30 rounded-xl"
              title={`${quotationsRemaining ? `${quotationsRemaining} ` : ""}Precificações Restantes Hoje`}
            >
              {quotationsRemaining !== null ? (
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
              ref={quotationsRef}
              className="flex flex-col bg-secondary/10 border-2 border-secondary/30 rounded-xl h-150 overflow-hidden select-none"
              title="Ultimas Precificações"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center sm:justify-start items-center gap-3 p-6 border-secondary/30 border-b-2">
                <FaDollarSign size={20} className="text-green-500" />
                <h3 className="font-title font-bold text-foreground text-lg">
                  Ultimas Precificações
                </h3>
              </div>

              {quotations && quotations.length ? (
                <QuotationCarousel quotations={quotations} />
              ) : (
                <EmptyList title="Nenhuma precificação encontrada. Crie uma nova precificação" />
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </Container>
  );
};

export default Client;
