"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TbArrowBackUp } from "react-icons/tb";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useOpportunities } from "@/contexts";

import Container from "@/components/container";
import Form from "@/components/form";
import Input from "@/components/input";
import Select from "@/components/select";
import InputTags from "@/components/inputTags";

import updateOpportunitySchema from "@/validators/opportunities/update.validator";

import {
  opportunitiesCurrencyItems,
  opportunitiesStatusItems,
  opportunitiesTypeItems,
} from "@/constants/opportunities";

import { safeCast } from "@/types";
import {
  IOpportunity,
  IUpdateOpportunity,
} from "@/contexts/opportunities/interfaces";
import { formatInputNumber } from "@/utils/number.utils";

const EditOpportunity = () => {
  const { id } = useParams();

  const { opportunities, handleUpdateOpportunity } = useOpportunities();

  const [opportunity, setOpportunity] = useState<IOpportunity | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<IUpdateOpportunity>({
    mode: "onChange",
    resolver: yupResolver(updateOpportunitySchema),
  });

  useEffect(() => {
    if (opportunities) {
      const foundedOpportunity = opportunities.find(
        (opportunity) => opportunity.id === id
      );

      if (foundedOpportunity) setOpportunity(foundedOpportunity);
    }
  }, [opportunities]);

  useEffect(() => {
    handleInitialValues();
  }, [opportunity]);

  const handleInitialValues = () => {
    if (opportunity) {
      setValue(
        "deadline",
        new Date(opportunity.deadline).toISOString().split("T")[0]
      );
      setValue("title", opportunity.title);
      setValue("brand", opportunity.brand);
      setValue("platform", opportunity.platform);
      setValue("sourceUrl", opportunity.sourceUrl);
      setValue(
        "compensationMin",
        safeCast<number>(formatInputNumber(Number(opportunity.compensationMin)))
      );
      setValue(
        "compensationMax",
        safeCast<number>(formatInputNumber(Number(opportunity.compensationMax)))
      );
      setValue("nicheTags", opportunity.nicheTags);
      setValue("audienceRange", opportunity.audienceRange);
      setValue("requirements", opportunity.requirements);
      setValue("location", opportunity.location);
      setValue("type", opportunity.type);
      setValue("status", opportunity.status);
      setValue("currency", opportunity.currency);
      setValue("highlight", opportunity.highlight);
    }
  };

  const handleUpdate = async ({
    deadline,
    compensationMin,
    compensationMax,
    ...data
  }: IUpdateOpportunity): Promise<void> => {
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

    const filteredData = safeCast<IUpdateOpportunity>(
      Object.fromEntries(
        Object.entries(formattedData).filter(([_, value]) => !!value)
      )
    );

    const newData: Partial<IUpdateOpportunity> = {};

    for (const key of Object.keys(
      filteredData
    ) as (keyof IUpdateOpportunity)[]) {
      const newValue = filteredData[key];
      const oldValue = opportunity![key];

      if (Array.isArray(newValue) && Array.isArray(oldValue)) {
        const equalTags =
          newValue.length === oldValue.length &&
          newValue.every((tag, i) => tag === oldValue[i]);

        if (!equalTags) {
          (newData as any)[key] = newValue;
        }
      } else if (newValue !== oldValue) {
        (newData as any)[key] = newValue;
      }
    }

    await handleUpdateOpportunity(newData, opportunity!.id);
  };

  if (!opportunity) return null;

  return (
    <Container Tag={"main"} className="gap-10 grid grid-cols-1 mt-15">
      <Link
        href="/opportunities"
        title="Voltar para gerenciamentos de oportunidades"
        tabIndex={-1}
        className="top-5 left-5 z-9 fixed p-2 rounded-full text-foreground hover:text-tertiary active:text-primary text-4xl transition-all duration-300 cursor-pointer"
      >
        <TbArrowBackUp />
      </Link>

      <Form
        onSubmit={handleSubmit(handleUpdate)}
        className="flex flex-col md:gap-10"
      >
        <div className="flex flex-col gap-5">
          <div className="items-center gap-5 grid md:grid-cols-3">
            <Input
              name="title"
              label="Nome da Oportunidade"
              placeholder="Digite o nome da Oportunidade"
              register={register}
              errors={errors}
              required
            />

            <Input
              name="deadline"
              label="Prazo Final da Oportunidade"
              placeholder="Digite o prazo final da Oportunidade"
              type="date"
              register={register}
              errors={errors}
              required
            />

            <Input
              name="brand"
              label="Marca Associada da Oportunidade"
              placeholder="Digite a marca associada da Oportunidade"
              register={register}
              errors={errors}
            />

            <Input
              name="platform"
              label="Plataforma da Oportunidade"
              placeholder="Digite a plataforma da Oportunidade"
              register={register}
              errors={errors}
            />

            <Input
              name="sourceUrl"
              label="Link Original da Oportunidade"
              placeholder="Digite o link original da Oportunidade"
              register={register}
              errors={errors}
            />

            <Input
              name="compensationMin"
              label="Compensação Minima da Oportunidade"
              placeholder="Digite a compensação minima da Oportunidade"
              type="number"
              register={register}
              errors={errors}
            />

            <Input
              name="compensationMax"
              label="Compensação Maxima da Oportunidade"
              placeholder="Digite a compensação maxima da Oportunidade"
              type="number"
              register={register}
              errors={errors}
            />

            <Input
              name="audienceRange"
              label="Público-alvo da Oportunidade"
              placeholder="Digite o público-alvo da Oportunidade"
              register={register}
              errors={errors}
            />

            <Input
              name="requirements"
              label="Requisitos da Oportunidade"
              placeholder="Digite os requisitos da Oportunidade"
              register={register}
              errors={errors}
            />

            <Input
              name="location"
              label="Local da Oportunidade"
              placeholder="Digite o local da Oportunidade"
              register={register}
              errors={errors}
            />

            <Select
              name="type"
              items={opportunitiesTypeItems}
              label="Tipo da Oportunidade"
              register={register}
              control={control}
              errors={errors}
              required
            />

            <Select
              name="status"
              items={opportunitiesStatusItems}
              label="Status da Oportunidade"
              control={control}
              register={register}
              errors={errors}
            />

            <Select
              name="currency"
              items={opportunitiesCurrencyItems}
              label="Moeda da Oportunidade"
              control={control}
              register={register}
              errors={errors}
            />
          </div>

          <div className="flex flex-col gap-5">
            <InputTags
              name="nicheTags"
              label="Nichos da Oportunidade"
              placeholder="Insira os nichos da Oportunidade"
              control={control}
              errors={errors}
            />

            <Input
              name="highlight"
              label="Destaque da Oportunidade"
              type="checkbox"
              register={register}
              errors={errors}
            />
          </div>
        </div>

        <div className="flex md:flex-row flex-col md:justify-end gap-5 w-full">
          <button
            type="submit"
            title="Salvar edição"
            tabIndex={-1}
            disabled={!!Object.keys(errors).length}
            className="bg-tertiary hover:bg-primary active:bg-primary/70 disabled:bg-error disabled:opacity-50 mt-5 px-7 py-2 rounded w-full md:w-fit text-light transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
          >
            Salvar edição
          </button>

          <button
            type="button"
            title="Cancelar alterações"
            tabIndex={-1}
            onClick={handleInitialValues}
            className="hover:bg-gray-3 active:bg-gray-3/50 mt-5 px-7 py-2 border-1 rounded w-full md:w-fit text-foreground transition-all duration-300 cursor-pointer"
          >
            Cancelar alterações
          </button>
        </div>
      </Form>
    </Container>
  );
};

export default EditOpportunity;
