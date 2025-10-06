"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "motion/react";
import { LuNewspaper } from "react-icons/lu";
import { IoBulbSharp, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineContentPaste, MdOutlineDateRange } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

import { useAuth, useInsights } from "@/contexts";

import Container from "@/components/container";
import NavigationTabs from "@/components/navigationTabs";
import Form from "@/components/form";
import Select from "@/components/select";
import Loading from "@/components/loading";
import EmptyList from "@/components/emptyList";
import FixedModal from "@/components/fixedModal";

import setInsightSettingsSchema from "@/validators/insights/set.validator";

import {
  insightSettingsSelects,
  insightTerritoryIcons,
} from "@/constants/insights";

import { formatDate } from "@/utils/date.utils";

import { IInsight, IInsightSettings } from "@/contexts/insights/interfaces";

const Client = () => {
  const { loggedUser } = useAuth();
  const { handleSetInsightSettings, insights, insightsSettings } =
    useInsights();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<Partial<IInsightSettings>>({
    mode: "onChange",
    resolver: yupResolver(setInsightSettingsSchema),
  });

  const [_, setNow] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [selectedInsight, setSelectedInsight] = useState<IInsight | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDefaultValues();
  }, [insightsSettings]);

  const setDefaultValues = () => {
    if (insightsSettings) {
      reset(insightsSettings);
    } else {
      reset();
    }
  };

  const handleCreate = async (data: Partial<IInsightSettings>) => {
    await handleSetInsightSettings(data);

    reset();
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInsight(null);
  };

  if (!loggedUser) return null;

  return (
    <>
      <Container Tag="main" className="flex flex-col gap-6 my-5">
        <NavigationTabs />

        <motion.section
          className="gap-6 md:gap-10 grid grid-cols-1 md:grid-cols-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Form
            onSubmit={handleSubmit(handleCreate)}
            title="Configurações de Insights"
            className={`flex flex-col gap-6 order-first md:order-last p-6 border-2 border-secondary/30 rounded-xl h-fit min-h-139 ${!insightsSettings ? "justify-center items-center" : ""}`}
          >
            {insightsSettings ? (
              <>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-3 select-none"
                >
                  <IoSettingsOutline size={20} className="text-foreground" />
                  <h4 className="font-title font-bold text-foreground text-lg">
                    Configurações de Insights
                  </h4>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } },
                  }}
                  className="flex flex-col gap-4"
                >
                  {Object.values(insightSettingsSelects).map(
                    ({ name, items, label, required, multiple }, i) => (
                      <motion.div
                        key={`insight-select-${name}-${label}-${required}-${multiple}-${i}`}
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <Select<Partial<IInsightSettings>>
                          name={name as keyof Partial<IInsightSettings>}
                          items={items}
                          label={label}
                          register={register}
                          control={control}
                          errors={errors}
                          required={required}
                          multiple={!!multiple}
                        />
                      </motion.div>
                    )
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="gap-3 grid grid-cols-1 md:grid-cols-2"
                >
                  <button
                    type="submit"
                    disabled={Object.values(errors).some(Boolean)}
                    title="Salvar alterações"
                    tabIndex={-1}
                    className="flex lg:flex-row md:flex-col justify-center items-center gap-2 bg-secondary hover:bg-primary disabled:bg-error disabled:opacity-50 p-2 rounded text-light transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <LuNewspaper className="text-light" />
                    <span>Salvar alterações</span>
                  </button>
                  <button
                    type="reset"
                    title="Cancelar alterações"
                    tabIndex={-1}
                    onClick={setDefaultValues}
                    className="bg-transparent hover:bg-gray-2/30 active:bg-gray-2 p-2 border border-foreground rounded transition-all duration-300 cursor-pointer"
                  >
                    Cancelar alterações
                  </button>
                </motion.div>
              </>
            ) : (
              <Loading />
            )}
          </Form>

          <div
            className="flex flex-col gap-6 order-last md:order-first p-6 border-2 border-secondary/30 rounded-xl"
            title="Insights Personalizados"
          >
            <motion.div
              className="flex flex-col gap-2 select-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <LuNewspaper size={20} className="text-primary" />
                <h2 className="font-title font-bold text-foreground xs:text-xl sm:text-2xl">
                  Insights Personalizados
                </h2>
              </div>
              <span className="text-foreground/60 sm:text-md text-xs">
                Tendências e notícias relevantes para o seu nincho
              </span>
            </motion.div>

            <div
              className={
                !insights
                  ? "flex justify-center items-center h-full"
                  : "flex flex-col gap-6"
              }
            >
              {insights ? (
                !!insights.length ? (
                  insights.map((insight) => {
                    const { id, hashtags, sentAt, territory, title, source } =
                      insight;

                    const Icon = insightTerritoryIcons.find(
                      ({ title }) => title === territory
                    )?.Icon;

                    return (
                      <motion.div
                        key={id}
                        className="flex flex-col gap-2 p-6 border-2 border-secondary/30 rounded-xl cursor-pointer select-none"
                        title={title}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                        onClick={() => {
                          setOpen(true);
                          setSelectedInsight(insight);
                        }}
                      >
                        <motion.div
                          className="flex justify-between items-center"
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          <div className="flex items-center gap-2">
                            {!!Icon && <Icon size={18} />}

                            <span
                              className="px-2 py-1 border-2 border-secondary/30 rounded-full font-bold text-xs/normal"
                              title={territory}
                            >
                              {territory}
                            </span>
                          </div>

                          <div
                            className="flex items-center gap-2 text-foreground/60 text-xs/normal"
                            title={formatDate(new Date(sentAt), {
                              getHours: true,
                              getMinutes: true,
                            })}
                          >
                            <MdOutlineDateRange className="hidden xs:flex" />

                            <span>
                              {formatDate(new Date(sentAt), {
                                getHours: true,
                                getMinutes: true,
                              })}
                            </span>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex flex-col gap-4"
                          initial="hidden"
                          animate="visible"
                          viewport={{ once: true, amount: 0.3 }}
                          variants={{
                            hidden: {},
                            visible: {
                              transition: { staggerChildren: 0.15 },
                            },
                          }}
                        >
                          <motion.b
                            className="mt-2 sm:mt-0 font-title font-bold text-md sm:text-xl text-center sm:text-start"
                            variants={{
                              hidden: { opacity: 0, y: 15 },
                              visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.4 }}
                          >
                            {title}
                          </motion.b>

                          <motion.ul
                            className="flex flex-wrap justify-center sm:justify-start gap-2 mt-5 sm:mt-0 text-[10px] sm:text-xs"
                            initial="hidden"
                            animate="visible"
                            viewport={{ once: true }}
                            variants={{
                              hidden: {},
                              visible: {
                                transition: { staggerChildren: 0.05 },
                              },
                            }}
                          >
                            {hashtags.map((hashtag) => (
                              <motion.li
                                key={`${id}-${hashtag}`}
                                title={hashtag}
                                className="bg-secondary/30 px-3 py-1 rounded-full text-primary"
                                variants={{
                                  hidden: { opacity: 0, scale: 0.9 },
                                  visible: { opacity: 1, scale: 1 },
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <span>{hashtag}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </motion.div>

                        <motion.div
                          className="flex justify-between items-center mt-6"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          <span
                            className="text-[10px] text-foreground/60 sm:text-xs text-justify"
                            title={`Fonte: ${source}`}
                          >
                            Fonte: {source}
                          </span>
                        </motion.div>

                        <motion.div
                          className="flex justify-end items-center gap-2 font-bold text-xs sm:text-sm"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                        >
                          <FiExternalLink />

                          <span>Ler mais</span>
                        </motion.div>
                      </motion.div>
                    );
                  })
                ) : (
                  <EmptyList title="Nenhum insight encontrado" />
                )
              ) : (
                <Loading size={30} />
              )}
            </div>
          </div>
        </motion.section>
      </Container>

      {!!selectedInsight && (
        <FixedModal isOpen={open} close={handleClose} size="50rem">
          <div
            title={selectedInsight.title}
            className="flex flex-col gap-6 px-6 pb-6"
          >
            <div className="flex flex-col items-center">
              <span className="font-title font-bold text-foreground text-2xl">
                {selectedInsight.title}
              </span>

              <div className="flex flex-wrap gap-4">
                <span>Área: {selectedInsight.territory}</span>
                <span>Nicho: {selectedInsight.topic}</span>
              </div>

              <span className="text-foreground/60">
                Criado: {formatDate(new Date(selectedInsight.sentAt))}
              </span>
            </div>

            <div className="flex flex-col gap-6">
              <div title="Resumo" className="flex flex-col gap-4 select-none">
                <div className="flex items-center gap-2 font-title font-bold text-xl">
                  <LuNewspaper className="text-primary" />

                  <span>Resumo</span>
                </div>

                <article className="text-md text-justify indent-6 leading-relaxed">
                  <ReactMarkdown>{selectedInsight.summary}</ReactMarkdown>
                </article>
              </div>

              <div
                title="Dica"
                className="flex flex-col gap-4 bg-secondary/30 p-6 rounded-2xl text-primary"
              >
                <div className="flex items-center gap-2 font-title font-bold text-foreground text-xl">
                  <IoBulbSharp className="text-warning" />

                  <span>Dica</span>
                </div>

                <article className="text-md text-justify indent-6 leading-relaxed">
                  <ReactMarkdown>{selectedInsight.tip}</ReactMarkdown>
                </article>
              </div>

              <div
                title="Ideias de conteúdo"
                className="flex flex-col gap-4 p-6 border border-foreground/60 rounded-2xl text-primary"
              >
                <div className="flex items-center gap-2 font-title font-bold text-foreground text-xl">
                  <MdOutlineContentPaste className="text-error" />

                  <span>Ideias de conteúdo</span>
                </div>

                <ul className="pl-10 text-foreground/60">
                  {selectedInsight.contentIdeas.map((idea) => (
                    <li
                      key={idea}
                      className="text-md text-justify italic list-disc"
                    >
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FixedModal>
      )}
    </>
  );
};

export default Client;
