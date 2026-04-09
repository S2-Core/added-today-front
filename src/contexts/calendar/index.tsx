"use client";

import { createContext, useCallback, useState } from "react";
import toast from "react-hot-toast";

import findAllCalendarItems from "@/services/calendar/findAllCalendarItems.service";
import findDashboard from "@/services/calendar/findDashboard.service";
import findCalendarState from "@/services/calendar/findCalendarState.service";
import reportFirstAccess from "@/services/calendar/reportFirstAccess.service";
import createCalendarItem from "@/services/calendar/createCalendarItem.service";
import deleteCalendarItem from "@/services/calendar/deleteCalendarItem.service";
import updateCalendarItem from "@/services/calendar/updateCalendarItem.service";
import requestAiSuggestion from "@/services/calendar/requestAiSuggestion.service";

import {
  IAISuggestionBody,
  IAISuggestionWithRemaining,
  ICalendarContext,
  ICalendarItem,
  ICalendarState,
  ICreateCalendarItem,
  IDashboard,
  IProps,
} from "./interfaces";

export const CalendarContext = createContext({} as ICalendarContext);

const CalendarProvider = ({ children }: IProps) => {
  const [items, setItems] = useState<ICalendarItem[] | null>(null);
  const [dashboardData, setDashboardData] = useState<IDashboard | null>(null);
  const [calendarState, setCalendarState] = useState<ICalendarState | null>(
    null,
  );
  const [aiSuggestion, setCalendarAiSuggestion] =
    useState<IAISuggestionWithRemaining | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFindAllItems = useCallback(
    async (from: string, to: string): Promise<void> => {
      try {
        const allItems = await findAllCalendarItems(from, to);

        const formattedItems = allItems.map((item) => {
          const calendarItem = item as ICalendarItem & {
            end?: string | null;
            start?: string;
            allDay?: boolean;
          };

          if (item.endsAt) {
            calendarItem.end = item.endsAt;
          }

          calendarItem.start = item.startsAt;
          calendarItem.allDay = item.isAllDay;

          return calendarItem;
        });

        setItems(formattedItems);
      } catch (err) {
        console.error(err);
      }
    },
    [],
  );

  const handleFindDashboard = useCallback(
    async (from: string, to: string): Promise<void> => {
      try {
        const nextDashboardData = await findDashboard(from, to);

        setDashboardData(nextDashboardData);
      } catch (err) {
        console.error(err);
      }
    },
    [],
  );

  const handleFindCalendarState = useCallback(async (): Promise<void> => {
    try {
      const nextCalendarState = await findCalendarState();

      setCalendarState(nextCalendarState);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleCalendarFirstAccess = useCallback(async (): Promise<void> => {
    try {
      const nextCalendarState = await reportFirstAccess();

      setCalendarState(nextCalendarState);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleCreateItem = useCallback(
    async (data: ICreateCalendarItem): Promise<void> => {
      try {
        await toast.promise(
          async () => {
            await createCalendarItem(data);
          },
          {
            loading: "Criando item...",
            success: "Item criado com sucesso!",
            error: "Ocorreu um erro ao criar o item!",
          },
          { id: "create-calendar-item" },
        );
      } catch (err) {
        console.error(err);
      }
    },
    [],
  );

  const handleDeleteItem = useCallback(
    async (itemId: string): Promise<void> => {
      try {
        await toast.promise(
          async () => {
            await deleteCalendarItem(itemId);
          },
          {
            loading: "Deletando item...",
            success: "Item deletado com sucesso!",
            error: "Ocorreu um erro ao deletar o item!",
          },
          { id: "delete-calendar-item" },
        );
      } catch (err) {
        console.error(err);
      }
    },
    [],
  );

  const handleUpdateItem = useCallback(
    async (itemId: string, data: ICreateCalendarItem): Promise<void> => {
      try {
        await toast.promise(
          async () => {
            await updateCalendarItem(itemId, data);
          },
          {
            loading: "Atualizando item...",
            success: "Item atualizado com sucesso!",
            error: "Ocorreu um erro ao atualizar o item!",
          },
          { id: "update-calendar-item" },
        );
      } catch (err) {
        console.error(err);
      }
    },
    [],
  );

  const handleAiSuggestion = useCallback(
    async (data: IAISuggestionBody): Promise<void> => {
      try {
        setLoading(true);

        const nextAiSuggestion = await requestAiSuggestion(data);

        setCalendarAiSuggestion(nextAiSuggestion);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <CalendarContext.Provider
      value={{
        items,
        handleFindAllItems,
        dashboardData,
        handleFindDashboard,
        calendarState,
        handleFindCalendarState,
        handleCalendarFirstAccess,
        handleCreateItem,
        handleDeleteItem,
        handleUpdateItem,
        aiSuggestion,
        handleAiSuggestion,
        loading,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
