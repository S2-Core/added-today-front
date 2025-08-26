"use client";

import { createContext, useEffect, useState } from "react";

import { useAuth } from "..";

import findAllInsights from "@/services/insights/findAll.service";

import { IProps, IInsightsContext, IInsight } from "./interfaces";

export const InsightsContext = createContext({} as IInsightsContext);

const InsightsProvider = ({ children }: IProps) => {
  const { token } = useAuth();

  const [tab, setTab] = useState<string>("insightsSettings");
  const [insights, setInsights] = useState<IInsight[] | null>(null);

  useEffect(() => {
    if (token) handleFindAllInsights();
  }, [token, tab]);

  const handleFindAllInsights = async () => {
    try {
      const { insights: allInsights } = await findAllInsights(10);

      setInsights(allInsights);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <InsightsContext.Provider value={{ setTab, tab, insights }}>
      {children}
    </InsightsContext.Provider>
  );
};

export default InsightsProvider;
