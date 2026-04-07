"use client";

import { createContext, useEffect, useState } from "react";

import findAllEvents from "@/services/calendar/findAllEvents.service";

import { ICalendarContext, IEvent, IProps } from "./interfaces";

export const CalendarContext = createContext({} as ICalendarContext);

const CalendarProvider = ({ children }: IProps) => {
  const [events, setEvents] = useState<IEvent[] | null>(null);

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

  return (
    <CalendarContext.Provider value={{ events, handleFindAllEvents }}>
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
