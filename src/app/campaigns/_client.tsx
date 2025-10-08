"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion, easeOut, AnimatePresence } from "motion/react";
import { FaRegStar } from "react-icons/fa";
import {
  FiClock,
  FiDollarSign,
  FiExternalLink,
  FiFilter,
  FiMapPin,
  FiSearch,
} from "react-icons/fi";
import { LuUsersRound } from "react-icons/lu";
import { MdOutlineCreate } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

import { useAuth, useOpportunities } from "@/contexts";

import Container from "@/components/container";
import NavigationTabs from "@/components/navigationTabs";
import Form from "@/components/form";
import FixedModal from "@/components/fixedModal";
import Loading from "@/components/loading";
import EmptyList from "@/components/emptyList";
import Input from "@/components/input";
import Select from "@/components/select";
import InputTags from "@/components/inputTags";

import createOpportunitySchema from "@/validators/opportunities/create.validator";

import { captalize } from "@/utils/string.utils";

import {
  createInputs,
  createSelects,
  createTagsInputs,
  opportunitiesTypeItems,
  OpportunityStatus,
} from "@/constants/opportunities";

import { formatCurrency } from "@/utils/number.utils";
import { formatDate } from "@/utils/date.utils";

import { safeCast } from "@/types";

import { ICreateOpportunity } from "@/contexts/opportunities/interfaces";

const Client = () => {
  const navigate = useRouter();

  const {
    handleCreateOpportunity,
    setFilters,
    filters,
    opportunities,
    handleDeactivateOpportunity,
  } = useOpportunities();
  const { loggedUser } = useAuth();

  const isAdmin = loggedUser && loggedUser.role === "ADMIN";

  const container = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
  };

  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: { errors },
  } = useForm<ICreateOpportunity>({
    mode: "onChange",
    resolver: yupResolver(createOpportunitySchema),
  });

  const inputFilterRef = useRef<HTMLInputElement | null>(null);
  const selectFilterRef = useRef<HTMLSelectElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<
    string | null
  >(null);
  const [search, setSearch] = useState<string>("");
  const [hide, setHide] = useState<boolean>(true);
  const [_, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleChange("q", search);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const handleCreate = async ({
    deadline,
    compensationMin,
    compensationMax,
    ...data
  }: ICreateOpportunity): Promise<void> => {
    const formattedDeadline = (deadline as Date).toISOString();
    const formattedCompensationMin =
      compensationMin !== undefined && compensationMin !== null
        ? Number(compensationMin)
        : null;
    const formattedCompensationMax =
      compensationMax !== undefined && compensationMax !== null
        ? Number(compensationMax)
        : null;

    const formattedData = {
      ...data,
      deadline: formattedDeadline,
      compensationMin: formattedCompensationMin,
      compensationMax: formattedCompensationMax,
    };

    const filteredData = safeCast<ICreateOpportunity>(
      Object.fromEntries(
        Object.entries(formattedData).filter(
          ([_, value]) => value !== null && value !== ""
        )
      )
    );

    await handleCreateOpportunity(filteredData).then(() => {
      reset();
    });
  };

  const handleChange = (field: string, value: any) => {
    setFilters((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Container Tag="main" className="flex flex-col gap-6 my-5">
        <NavigationTabs subTitle="Descubra oportunidades nas principais plataformas brasileiras" />

        {isAdmin && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex flex-col gap-6 p-6 border-2 border-secondary/30 rounded-xl"
          >
            <div
              tabIndex={-1}
              onClick={() => setHide(!hide)}
              title={`${hide ? "Mostrar" : "Ocultar"} formulário`}
              className="top-0 left-0 absolute w-full h-20 cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-between items-center text-foreground text-md xs:text-2xl select-none"
            >
              <div
                title="Criar campanha"
                tabIndex={-1}
                onClick={() => setHide(!hide)}
                className="z-9 flex items-center gap-2 font-title font-bold cursor-pointer"
              >
                <MdOutlineCreate />
                <span>Criar campanha</span>
              </div>

              <button
                tabIndex={-1}
                className={`p-2 transition-all duration-300 ${hide ? "rotate-180" : ""}`}
              >
                <IoIosArrowDown size={20} />
              </button>
            </motion.div>

            <AnimatePresence initial={false}>
              {!hide && (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <Form onSubmit={handleSubmit(handleCreate)}>
                    <motion.div
                      className="items-center gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: {
                          transition: { staggerChildren: 0.08 },
                        },
                      }}
                    >
                      {createInputs
                        .filter(({ type }) => type !== "checkbox")
                        .map(
                          (
                            {
                              label,
                              name,
                              required,
                              className,
                              placeholder,
                              type,
                            },
                            i
                          ) => (
                            <motion.div
                              key={`campaign-input-${name}-${label}-${type}-${i}`}
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
                                className={className}
                                errors={errors}
                              />
                            </motion.div>
                          )
                        )}

                      {createSelects.map(
                        ({ label, name, required, className, items }, i) => (
                          <motion.div
                            key={`campaign-select-${name}-${label}--${i}`}
                            variants={{
                              hidden: { opacity: 0, y: 15 },
                              visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          >
                            <Select
                              register={register}
                              items={items}
                              name={name}
                              label={label}
                              control={control}
                              required={required}
                              className={className}
                              errors={errors}
                            />
                          </motion.div>
                        )
                      )}

                      {createInputs
                        .filter(({ type }) => type === "checkbox")
                        .map(
                          (
                            {
                              label,
                              name,
                              required,
                              className,
                              placeholder,
                              type,
                            },
                            i
                          ) => (
                            <motion.div
                              key={`campaign-input-${name}-${label}-${type}-${i}`}
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
                                className={className}
                                errors={errors}
                              />
                            </motion.div>
                          )
                        )}
                    </motion.div>

                    {!!createTagsInputs?.length &&
                      createTagsInputs.map(
                        (
                          { name, label, placeholder, className, required },
                          i
                        ) => (
                          <motion.div
                            key={`campaign-input-${name}-${label}-${placeholder}-${required}-${i}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
                          >
                            <InputTags
                              name={name}
                              label={label}
                              placeholder={placeholder}
                              control={control}
                              errors={errors}
                              className={className}
                              required={required}
                            />
                          </motion.div>
                        )
                      )}

                    <motion.div
                      className="gap-3 grid grid-cols-1 sm:grid-cols-2 mt-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <button
                        type="submit"
                        disabled={Object.values(errors).some(Boolean)}
                        title="Criar campanha"
                        tabIndex={-1}
                        className="flex justify-center items-center gap-2 bg-secondary hover:bg-primary disabled:bg-error disabled:opacity-50 p-2 rounded text-light transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                      >
                        Criar campanha
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
              )}
            </AnimatePresence>
          </motion.section>
        )}

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
            <div className="flex justify-center sm:justify-start items-center gap-2">
              <FaRegStar size={20} className="text-primary" />
              <h2 className="font-title font-bold text-foreground text-md/normal sm:text-2xl">
                Campanhas Abertas em Tempo Real
              </h2>
            </div>
            <span className="text-foreground/60 sm:text-md text-xs text-center sm:text-start">
              Descubra oportunidades de parcerias com marcas que combinanm com
              seu nicho
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex md:flex-row flex-col items-center sm:items-start md:items-center gap-2 w-full"
          >
            <div
              className="flex items-center gap-3 p-2 border-2 border-secondary/30 rounded-md w-full text-md/normal cursor-text select-none"
              onClick={() => inputFilterRef.current?.focus()}
            >
              <FiSearch className="text-secondary" size={20} />

              <input
                ref={inputFilterRef}
                type="text"
                placeholder="Buscar por nome, marca ou plataforma da campanha..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded outline-none w-full placeholder:text-secondary"
              />
            </div>

            <div
              className="flex items-center gap-3 p-2 border-2 border-secondary/30 rounded-md w-fit md:w-[20%] text-md/normal cursor-pointer select-none"
              onMouseDown={(e) => {
                e.preventDefault();
                selectFilterRef.current?.showPicker?.();
                selectFilterRef.current?.focus();
              }}
            >
              <FiFilter size={22} />

              <select
                ref={selectFilterRef}
                value={filters.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="outline-none w-full cursor-pointer"
              >
                <option value="">Todas</option>

                {Object.values(opportunitiesTypeItems).map(
                  ({ label, value }) => (
                    <option
                      key={label}
                      value={value}
                      className="cursor-pointer"
                    >
                      {label}
                    </option>
                  )
                )}
              </select>
            </div>
          </motion.div>

          <div
            className={`gap-6 lg:gap-10 grid grid-cols-1 ${!!opportunities && !!opportunities.length ? "lg:grid-cols-2" : "h-81"}`}
          >
            {!!opportunities ? (
              !!opportunities.length ? (
                opportunities.map(
                  ({
                    id,
                    title,
                    type,
                    brand,
                    platform,
                    requirements,
                    nicheTags,
                    compensationMin,
                    compensationMax,
                    currency,
                    audienceRange,
                    location,
                    highlight,
                    status,
                    sourceUrl,
                    deadline,
                  }) => (
                    <motion.div
                      key={id}
                      title={captalize(title)}
                      variants={container}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      className={`relative justify-center flex flex-col p-6 pt-8 border-2 rounded-xl select-none ${
                        highlight
                          ? "border-primary bg-secondary/5"
                          : "border-secondary/30"
                      }`}
                    >
                      <motion.div
                        variants={item}
                        title={
                          status === OpportunityStatus.DRAFT
                            ? "Rascunho"
                            : status === OpportunityStatus.PUBLISHED
                              ? "Publicada"
                              : "Arquivada"
                        }
                        className={`top-3 left-3 absolute flex gap-2 rounded-full w-2.5 h-2.5 shadow-md ${
                          status === OpportunityStatus.DRAFT
                            ? "bg-warning animate-pulse"
                            : status === OpportunityStatus.PUBLISHED
                              ? "bg-success-light"
                              : "bg-error"
                        }`}
                      />

                      <motion.div
                        variants={item}
                        className="flex sm:flex-row flex-col-reverse justify-center sm:justify-between items-center gap-5"
                      >
                        <motion.b
                          variants={item}
                          className="max-w-full sm:overflow-hidden font-title font-bold text-2xl text-center sm:text-start sm:text-ellipsis sm:whitespace-nowrap"
                        >
                          {`${brand} | ${captalize(title)}`}
                        </motion.b>

                        <motion.span
                          variants={item}
                          title={`Tipo: ${type}`}
                          className="flex justify-center items-center bg-secondary/30 p-1 px-3 rounded-full w-fit h-fit font-bold text-primary text-sm"
                        >
                          {captalize(type.toLowerCase())}
                        </motion.span>
                      </motion.div>

                      <motion.div
                        variants={item}
                        className="flex flex-col items-center sm:items-start gap-3"
                      >
                        <motion.b
                          variants={item}
                          title={`Plataforma: ${platform}`}
                          className="font-bold text-primary"
                        >
                          {platform}
                        </motion.b>

                        <motion.div
                          variants={item}
                          className="flex flex-col items-center sm:items-start gap-3"
                        >
                          <motion.span
                            variants={item}
                            className="text-foreground/60 text-center sm:text-start"
                            title="Requesitos"
                          >
                            Requesitos: {captalize(requirements)}
                          </motion.span>

                          <motion.ul
                            variants={item}
                            title="Nichos"
                            className="flex flex-wrap gap-2 font-bold text-xs"
                          >
                            {nicheTags.map((tag) => (
                              <motion.li
                                key={`campaign-niche-tag-${tag}`}
                                variants={item}
                                className="p-1 px-3 border-2 border-secondary/30 rounded-full"
                                title="#tech"
                              >
                                <span>
                                  {tag.charAt(0) !== "#"
                                    ? `#${tag.toLowerCase()}`
                                    : tag.toLowerCase()}
                                </span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </motion.div>
                      </motion.div>

                      {(compensationMin || compensationMax) && (
                        <motion.div
                          variants={item}
                          title={`Valor: ${formatCurrency(
                            compensationMax && compensationMin
                              ? compensationMin
                              : (compensationMax ?? compensationMin),
                            currency ?? "BRL"
                          )}${
                            compensationMax
                              ? ` - ${formatCurrency(compensationMax, currency ?? "BRL")}`
                              : ""
                          }`}
                          className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-start items-center gap-2 mt-5 font-bold text-xl"
                        >
                          <FiDollarSign className="text-success" />
                          <span>
                            {formatCurrency(
                              compensationMax && compensationMin
                                ? compensationMin
                                : (compensationMax ?? compensationMin),
                              currency ?? "BRL"
                            )}
                            {!!compensationMax &&
                              ` - ${formatCurrency(compensationMax, currency ?? "BRL")}`}
                          </span>
                        </motion.div>
                      )}

                      <motion.ul
                        variants={item}
                        className="flex flex-wrap justify-center sm:justify-between gap-5 mt-5"
                      >
                        {audienceRange && (
                          <motion.li
                            variants={item}
                            title={`Público alvo: ${audienceRange}`}
                            className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-start items-center gap-2"
                          >
                            <LuUsersRound className="text-primary" />
                            <span>{audienceRange}</span>
                          </motion.li>
                        )}

                        {location && (
                          <motion.li
                            variants={item}
                            title={`Localização: ${location}`}
                            className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-start items-center gap-2"
                          >
                            <FiMapPin className="text-error" />
                            <span>{location}</span>
                          </motion.li>
                        )}

                        <motion.li
                          variants={item}
                          className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-start items-center gap-2"
                          title={`Data de encerramento: ${formatDate(new Date(deadline))}`}
                        >
                          <FiClock className="text-warning" />
                          <span>{formatDate(new Date(deadline))}</span>
                        </motion.li>
                      </motion.ul>

                      {(sourceUrl || isAdmin) && (
                        <motion.div
                          variants={item}
                          className={`grid mt-10 w-full gap-3 grid-cols-1 ${
                            sourceUrl ? "sm:grid-cols-3" : "sm:grid-cols-2"
                          }`}
                        >
                          {isAdmin ? (
                            <>
                              <motion.div variants={item}>
                                <button
                                  type="button"
                                  title="Editar"
                                  tabIndex={-1}
                                  onClick={() =>
                                    navigate.push(`/campaigns/${id}`)
                                  }
                                  className="bg-primary/70 hover:bg-primary active:bg-primary/70 p-2 rounded w-full text-light transition-all duration-300 cursor-pointer"
                                >
                                  Editar
                                </button>
                              </motion.div>

                              <motion.div variants={item}>
                                <button
                                  type="button"
                                  title="Desativar"
                                  tabIndex={-1}
                                  onClick={() => {
                                    setOpen(true);
                                    setSelectedOpportunityId(id);
                                  }}
                                  className="bg-transparent hover:bg-gray-2/30 p-2 border border-foreground rounded w-full transition-all duration-300 cursor-pointer"
                                >
                                  Desativar
                                </button>
                              </motion.div>
                            </>
                          ) : (
                            <>
                              <div />
                              <div />
                            </>
                          )}

                          {sourceUrl && (
                            <motion.div variants={item}>
                              <Link
                                href={sourceUrl}
                                target="_blank"
                                title="Candidatar-se"
                                tabIndex={-1}
                                className="flex justify-self-center sm:justify-self-end items-center gap-2 order-first sm:order-last w-fit hover:text-primary hover:underline"
                              >
                                <FiExternalLink className="lg:hidden xl:flex" />
                                Candidatar-se
                              </Link>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  )
                )
              ) : (
                <EmptyList title="Nenhuma campanha encontrada" />
              )
            ) : (
              <Loading />
            )}
          </div>
        </motion.section>
      </Container>

      {selectedOpportunityId && (
        <FixedModal
          isOpen={open}
          close={() => {
            setOpen(false);
            setSelectedOpportunityId(null);
          }}
        >
          <p className="text-sm text-justify">
            {"Deseja realmente "}
            <span className="font-bold text-error">{"DESATIVAR "}</span>
            {
              "a campanha? Caso sim, não poderá alterar os dados desse item, e também"
            }
            <span className="font-bold text-error">{" NÃO "}</span>
            {"será possivel "}
            <span className="font-bold text-tertiary">{"REATIVÁ-LO"}</span>.
          </p>

          <div className="flex sm:flex-row flex-col justify-center gap-5 w-full">
            <button
              type="button"
              title="Desativar campanha"
              onClick={() => {
                handleDeactivateOpportunity(selectedOpportunityId).finally(
                  () => {
                    setOpen(false);
                    setSelectedOpportunityId(null);
                  }
                );
              }}
              className="bg-transparent hover:bg-gray-2/30 active:bg-gray-2 px-4 py-2 border border-foreground rounded w-full font-bold text-xs transition-all duration-300 cursor-pointer"
            >
              Desativar campanha
            </button>

            <button
              type="button"
              title="Cancelar"
              onClick={() => {
                setOpen(false);
                setSelectedOpportunityId(null);
              }}
              className="bg-primary/70 hover:bg-primary active:bg-primary/70 px-4 py-2 rounded w-full font-bold text-light text-xs transition-all duration-300 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </FixedModal>
      )}
    </>
  );
};

export default Client;
