"use client";

import { createContext, useState } from "react";
import toast from "react-hot-toast";

import findAllEvents from "@/services/calendar/findAllEvents.service";
import findDashboard from "@/services/calendar/findDashboard.service";
import findCalendarState from "@/services/calendar/findCalendarState.service";
import reportFirstAccess from "@/services/calendar/reportFirstAccess.service";
import createEvent from "@/services/calendar/createEvent.service";
import deleteEvent from "@/services/calendar/deleteEvent.service";
import updateEvent from "@/services/calendar/updateEvent.service";
import requestAiSuggestion from "@/services/calendar/requestAiSuggestion.service";

import {
  IAISuggestionBody,
  IAISuggestionWithRemaining,
  ICalendarContext,
  ICalendarState,
  ICreateCampaignEvent,
  ICreateContentEvent,
  ICreateEarningEvent,
  IDashboard,
  IEvent,
  IProps,
} from "./interfaces";

export const CalendarContext = createContext({} as ICalendarContext);

const CalendarProvider = ({ children }: IProps) => {
  const [events, setEvents] = useState<IEvent[] | null>(null);
  const [dashboardData, setDashboardData] = useState<IDashboard | null>(null);
  const [calendarState, setCalendarState] = useState<ICalendarState | null>(
    null,
  );
  const [aiSuggestion, setAISuggestion] =
    useState<IAISuggestionWithRemaining | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFindAllEvents = async (
    from: string,
    to: string,
  ): Promise<void> => {
    try {
      const allEvents = await findAllEvents(from, to);

      const formattedEvents = allEvents.map((event) => {
        const eventFormatted = event as IEvent;

        if (event.endsAt) (eventFormatted as any)["end"] = event.endsAt;

        return {
          ...event,
          start: event.startsAt,
          allDay: event.isAllDay,
        };
      });

      setEvents(formattedEvents);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFindDashboard = async (
    from: string,
    to: string,
  ): Promise<void> => {
    try {
      const allDashboardData = await findDashboard(from, to);

      setDashboardData(allDashboardData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFindCalendarState = async (): Promise<void> => {
    try {
      const calendarState = await findCalendarState();

      setCalendarState(calendarState);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCalendarFirstAccess = async (): Promise<void> => {
    try {
      const calendarState = await reportFirstAccess();

      setCalendarState(calendarState);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateEvent = async (
    data: ICreateContentEvent | ICreateCampaignEvent | ICreateEarningEvent,
  ): Promise<void> => {
    try {
      await toast.promise(
        async () => {
          await createEvent(data);
        },
        {
          loading: "Criando evento...",
          success: "Evento criado com sucesso!",
          error: "Ocorreu um erro ao criar o evento!",
        },
        { id: "create-event" },
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEvent = async (eventId: string): Promise<void> => {
    try {
      await toast.promise(
        async () => {
          await deleteEvent(eventId);
        },
        {
          loading: "Deletando evento...",
          success: "Evento deletado com sucesso!",
          error: "Ocorreu um erro ao deletar o evento!",
        },
        { id: "delete-event" },
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateEvent = async (
    eventId: string,
    data: ICreateContentEvent | ICreateCampaignEvent | ICreateEarningEvent,
  ): Promise<void> => {
    try {
      await toast.promise(
        async () => {
          await updateEvent(eventId, data);
        },
        {
          loading: "Atualizando evento...",
          success: "Evento atualizado com sucesso!",
          error: "Ocorreu um erro ao atualizar o evento!",
        },
        { id: "update-event" },
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleAiSuggestion = async (data: IAISuggestionBody): Promise<void> => {
    try {
      setLoading(true);

      const aiSuggestion = await requestAiSuggestion(data);

      setAISuggestion(aiSuggestion);

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        events,
        handleFindAllEvents,
        dashboardData,
        handleFindDashboard,
        calendarState,
        handleFindCalendarState,
        handleCalendarFirstAccess,
        handleCreateEvent,
        handleDeleteEvent,
        handleUpdateEvent,
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
