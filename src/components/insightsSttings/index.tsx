"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth, useInsights } from "@/contexts";

import Container from "../container";
import Form from "../form";
import Select from "../select";

import setInsightSettingsSchema from "@/validators/insights/set.validator";

import {
  insightFrequencyItems,
  insightHourItems,
  insightTerritoryItems,
  insightTopicsItems,
} from "@/constants/insights";

import { IInsightSettings } from "@/contexts/insights/interfaces";

const InsightsSettings = () => {
  const { loggedUser } = useAuth();

  const { insights, insightsSettings, handleSetInsightSettings } =
    useInsights();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<Partial<IInsightSettings>>({
    mode: "onChange",
    resolver: yupResolver(setInsightSettingsSchema),
  });

  useEffect(() => {
    handleInitialValues();
  }, [insightsSettings]);

  const handleInitialValues = (): void => {
    if (insightsSettings) {
      setValue("topics", insightsSettings.topics);
      setValue("territory", insightsSettings.territory);
      setValue("frequency", insightsSettings.frequency);
      setValue("hour", insightsSettings.hour);
    } else reset();
  };

  const handleCreate = async (
    data: Partial<IInsightSettings>
  ): Promise<void> => {
    await handleSetInsightSettings({
      ...data,
      userId: loggedUser!.id,
    } as Partial<IInsightSettings>);
  };

  if (!insights || !loggedUser) return null;

  return (
    <Container Tag={"main"} className="gap-10 grid grid-cols-1 mt-15">
      <Form
        onSubmit={handleSubmit(handleCreate)}
        className="flex flex-col md:gap-10"
      >
        <div className="flex flex-col gap-5">
          <div className="items-center gap-5 grid md:grid-cols-2">
            <Select
              name="topics"
              items={insightTopicsItems}
              label="Nichos dos Insights"
              register={register}
              control={control}
              errors={errors}
              required
              multiple
            />

            <Select
              name="territory"
              items={insightTerritoryItems}
              label="Área dos Insights"
              register={register}
              control={control}
              errors={errors}
              required
            />

            <Select
              name="frequency"
              items={insightFrequencyItems}
              label="Frequência dos Insights"
              register={register}
              control={control}
              errors={errors}
              required
            />

            <Select
              name="hour"
              items={insightHourItems}
              label="Horário de Envio dos Insights"
              register={register}
              control={control}
              errors={errors}
              required
            />
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

export default InsightsSettings;
