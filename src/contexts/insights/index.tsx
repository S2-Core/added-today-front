"use client";

import { createContext, useEffect, useState } from "react";

import { useAuth } from "..";

import findAllInsights from "@/services/insights/findAll.service";
import findAllInsightsSettings from "@/services/insights/findAllInsightsSettings";
import setNewInsightsSettings from "@/services/insights/setNewInsightsStettings.service";

import {
  IProps,
  IInsightsContext,
  IInsight,
  IInsightSettings,
} from "./interfaces";
import toast from "react-hot-toast";

export const InsightsContext = createContext({} as IInsightsContext);

const InsightsProvider = ({ children }: IProps) => {
  const { token, loggedUser } = useAuth();

  const [insights, setInsights] = useState<IInsight[] | null>(null);
  const [insightsSettings, setInsightsSettings] =
    useState<IInsightSettings | null>(null);

  useEffect(() => {
    if (token && loggedUser) {
      handleFindAllInsights();
      handleFindAllInsightsSettings();
    } else {
      setInsights(null);
      setInsightsSettings(null);
    }
  }, [token, loggedUser]);

  const handleFindAllInsights = async () => {
    try {
      const { insights: allInsights } = await findAllInsights(10);

      setInsights(allInsights);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFindAllInsightsSettings = async () => {
    try {
      const allInsightsSettings = await findAllInsightsSettings();

      setInsightsSettings(allInsightsSettings);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetInsightSettings = async (data: Partial<IInsightSettings>) => {
    try {
      await toast.promise(
        async () => {
          await setNewInsightsSettings(data);

          await handleFindAllInsightsSettings();
        },
        {
          loading: "Atualizando configurações de Insights...",
          success: "Configurações de Insights atualizadas com sucesso!",
          error: "Ocorreu um erro ao atualizar as configurações de Insights!",
        },
        { id: "update-insights-settings" }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <InsightsContext.Provider
      value={{
        insights,
        insightsSettings,
        handleSetInsightSettings,
      }}
    >
      {children}
    </InsightsContext.Provider>
  );
};

export default InsightsProvider;
