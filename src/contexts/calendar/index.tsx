"use client";

import { createContext, useCallback, useState } from "react";
import toast from "react-hot-toast";

import findAllEvents from "@/services/calendar/findAllEvents.service";
import findDashboard from "@/services/calendar/findDashboard.service";
import findCalendarState from "@/services/calendar/findCalendarState.service";
import reportFirstAccess from "@/services/calendar/reportFirstAccess.service";
import createEvent from "@/services/calendar/createEvent.service";
import deleteEvent from "@/services/calendar/deleteEvent.service";
import updateEvent from "@/services/calendar/updateEvent.service";

import {
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

  const handleFindAllEvents = useCallback(
    async (from: string, to: string): Promise<void> => {
      try {
        const allEvents = await findAllEvents(from, to);

        const formattedEvents = allEvents.map((event) => {
          const eventFormatted = event as IEvent & {
            end?: string | null;
            start?: string;
            allDay?: boolean;
          };

          if (event.endsAt) {
            eventFormatted.end = event.endsAt;
          }

          eventFormatted.start = event.startsAt;
          eventFormatted.allDay = event.isAllDay;

          return eventFormatted;
        });

        setEvents(formattedEvents);
      } catch (err) {
        console.error(err);
      }
    },
    [],
  );

  const handleFindDashboard = useCallback(
    async (from: string, to: string): Promise<void> => {
      try {
        const allDashboardData = await findDashboard(from, to);

        setDashboardData(allDashboardData);
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

  const handleCreateEvent = useCallback(
    async (
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
    },
    [],
  );

  const handleDeleteEvent = useCallback(
    async (eventId: string): Promise<void> => {
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
    },
    [],
  );

  const handleUpdateEvent = useCallback(
    async (
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
    },
    [],
  );

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
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
