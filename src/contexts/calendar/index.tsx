"use client";

import { createContext, useState } from "react";

import findAllEvents from "@/services/calendar/findAllEvents.service";

import { ICalendarContext, IDashboard, IEvent, IProps } from "./interfaces";
import findDashboard from "@/services/calendar/findDashboard.service";

export const CalendarContext = createContext({} as ICalendarContext);

const CalendarProvider = ({ children }: IProps) => {
  const [events, setEvents] = useState<IEvent[] | null>(null);
  const [dashboardData, setDashboardData] = useState<IDashboard | null>(null);

  const handleFindAllEvents = async (
    from: string,
    to: string,
  ): Promise<void> => {
    try {
      const allEvents = await findAllEvents(from, to);

      const formattedEvents = allEvents.map((event) => {
        const eventFormatted = event as IEvent;

        const end = event.endsAt ? new Date(event.endsAt) : undefined;

        if (end)
          (eventFormatted as any)["end"] = event.isAllDay
            ? new Date(end.setDate(end.getDate() + 1)).toISOString()
            : end.toISOString();

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

  return (
    <CalendarContext.Provider
      value={{
        events,
        handleFindAllEvents,
        dashboardData,
        handleFindDashboard,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
