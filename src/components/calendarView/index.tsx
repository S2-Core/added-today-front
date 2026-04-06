"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { useEffect, useMemo, useState } from "react";

interface IEvent {
  id: string;
  title: string;
  date: string;
  type: "content" | "earning" | "campaign";
  status?: string;
  platform?: string;
  amount?: number;
}

const mockEvents: IEvent[] = [
  {
    id: "1",
    title: "Reels rotina fitness",
    date: "2026-04-30",
    type: "content",
    platform: "Instagram",
    status: "Postado",
  },
  {
    id: "2",
    title: "Adidas",
    date: "2026-05-01",
    type: "campaign",
    status: "Em andamento",
  },
  {
    id: "3",
    title: "Tutorial maquiagem",
    date: "2026-05-03",
    type: "content",
    platform: "TikTok",
    status: "A postar",
  },
  {
    id: "4",
    title: "Nike",
    date: "2026-04-30",
    type: "earning",
    amount: 200,
  },
  {
    id: "4",
    title: "Reels rotina fitness",
    date: "2026-04-30",
    type: "content",
    platform: "Test",
    status: "Postado",
  },
];

const getEventStyles = (event: IEvent) => {
  switch (event.type) {
    case "content":
      return "border-background bg-background";
    case "campaign":
      return "border-background bg-background";
    case "earning":
      return "border-background bg-background";
  }
};

const renderEventContent = (eventInfo: any) => {
  const event = eventInfo.event.extendedProps as IEvent;

  return (
    <div
      className={`p-2 text-xs flex select-none flex-col gap-1 ${getEventStyles(event)}`}
    >
      <span className="font-semibold text-foreground">{event.type}</span>

      {event.type === "content" && (
        <span className="text-foreground">
          {event.platform} • {event.status}
        </span>
      )}

      {event.type === "campaign" && (
        <span className="text-foreground">{event.status}</span>
      )}

      {event.type === "earning" && (
        <span className="font-semibold text-green-600">R$ {event.amount}</span>
      )}
    </div>
  );
};

const CalendarView = () => {
  const [isMobile, setIsMobile] = useState(false);

  const initialView = useMemo(() => {
    return isMobile ? "timeGridWeek" : "dayGridMonth";
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full max-w-full overflow-x-auto select-none calendar-wrapper">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={initialView}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        slotMinTime="00:00:00"
        slotMaxTime="24:00:00"
        eventBorderColor="var(--background)"
        events={mockEvents}
        eventContent={renderEventContent}
        height="55rem"
        locale={ptBrLocale}
        allDayContent={({ text }) => (
          <p className="font-bold text-center">{text}</p>
        )}
        dayMaxEvents={isMobile ? 1 : 2}
      />
    </div>
  );
};

export default CalendarView;
