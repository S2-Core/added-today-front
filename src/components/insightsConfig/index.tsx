"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useInsights } from "@/contexts";

import Container from "../container";
import Form from "../form";
import Input from "../input";
import Select from "../select";

import createInsightSchema from "@/validators/insights/create.validator";

import { IInsightPreferences } from "@/contexts/insights/interfaces";
import InputTags from "../inputTags";

const InsightsConfig = () => {
  const { insights } = useInsights();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<IInsightPreferences>({
    mode: "onChange",
    resolver: yupResolver(createInsightSchema),
  });

  useEffect(() => {
    handleInitialValues();
  }, []);

  const handleInitialValues = () => {};

  //   const handleUpdate = async (data: IUpdateOpportunity): Promise<void> => {
  //     const formattedDeadline = (data.deadline as Date).toISOString();
  //     const formattedCompensationMin = Number(data.compensationMin) ?? null;
  //     const formattedCompensationMax = Number(data.compensationMax) ?? null;

  //     const formattedData = {
  //       ...data,
  //       deadline: formattedDeadline,
  //       compensationMin: formattedCompensationMin,
  //       compensationMax: formattedCompensationMax,
  //     };

  //     const filteredData = safeCast<IUpdateOpportunity>(
  //       Object.fromEntries(
  //         Object.entries(formattedData).filter(([_, value]) => !!value)
  //       )
  //     );

  //     const newData: Partial<IUpdateOpportunity> = {};

  //     for (const key of Object.keys(
  //       filteredData
  //     ) as (keyof IUpdateOpportunity)[]) {
  //       const newValue = filteredData[key];
  //       const oldValue = opportunity![key];

  //       if (Array.isArray(newValue) && Array.isArray(oldValue)) {
  //         const equalTags =
  //           newValue.length === oldValue.length &&
  //           newValue.every((tag, i) => tag === oldValue[i]);

  //         if (!equalTags) {
  //           (newData as any)[key] = newValue;
  //         }
  //       } else if (newValue !== oldValue) {
  //         (newData as any)[key] = newValue;
  //       }
  //     }

  //     await handleUpdateOpportunity(newData, opportunity!.id);
  //   };

  const handleCreate = async (data: IInsightPreferences): Promise<void> => {
    console.log(data);
  };

  if (!insights) return null;

  return (
    <Container Tag={"main"} className="gap-10 grid grid-cols-1 mt-15">
      <Form
        onSubmit={handleSubmit(handleCreate)}
        className="flex flex-col md:gap-10"
      >
        <div className="flex flex-col gap-5">
          <div className="items-center gap-5 grid md:grid-cols-3">
            {/* <Select
              name="frequency"
              items={opportunitiesTypeItems}
              label="Tipo da Oportunidade"
              register={register}
              errors={errors}
              required
            />

            <Select
              name="type"
              items={opportunitiesTypeItems}
              label="Tipo da Oportunidade"
              register={register}
              errors={errors}
              required
            /> */}
          </div>
        </div>

        <div className="flex md:flex-row flex-col md:justify-end gap-5 w-full">
          <button
            type="submit"
            tabIndex={-1}
            disabled={!!Object.keys(errors).length}
            className="bg-tertiary hover:bg-primary active:bg-primary/70 disabled:bg-error disabled:opacity-50 mt-5 px-7 py-2 rounded w-full md:w-fit text-light transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
          >
            Salvar Edição
          </button>

          <button
            type="button"
            tabIndex={-1}
            onClick={handleInitialValues}
            className="hover:bg-gray-3 active:bg-gray-3/50 mt-5 px-7 py-2 border-1 rounded w-full md:w-fit text-foreground transition-all duration-300 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </Form>
    </Container>
  );
};

export default InsightsConfig;
