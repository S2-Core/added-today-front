"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { DatesSetArg, EventContentArg } from "@fullcalendar/core/index.js";

import { useCalendar } from "@/contexts";

import FixedModal from "../fixedModal";
import Form from "../form";

import { formatCurrency } from "@/utils/number.utils";

import { IEvent } from "@/contexts/calendar/interfaces";

const CalendarView = () => {
  const [modal, setModal] = useState<"create" | IEvent | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const lastFetchedYearRef = useRef<number | null>(null);

  const initialView = useMemo(() => {
    return isMobile ? "timeGridWeek" : "dayGridMonth";
  }, [isMobile]);

  const { events, handleFindAllEvents, handleFindDashboard } = useCalendar();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDatesSet = async (dateInfo: DatesSetArg) => {
    const currentYear = dateInfo.view.currentStart.getFullYear();

    if (lastFetchedYearRef.current === currentYear) return;

    lastFetchedYearRef.current = currentYear;

    const startOfYear = new Date(currentYear, 0, 1, 0, 0, 0, 0);
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

    await handleFindAllEvents(
      startOfYear.toISOString(),
      endOfYear.toISOString(),
    );

    await handleFindDashboard(
      startOfYear.toISOString(),
      endOfYear.toISOString(),
    );
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    const event = eventInfo.event.extendedProps as IEvent;

    return (
      <div className="flex flex-col gap-1 p-2 overflow-hidden text-xs select-none">
        <span className="font-semibold text-foreground">{event.type}</span>

        {event.type === "CONTENT" && (
          <span className="w-full overflow-hidden text-foreground text-ellipsis">
            {event.platform} • {event.status}
          </span>
        )}

        {event.type === "CAMPAIGN" && (
          <span className="w-full overflow-hidden text-foreground text-ellipsis">
            {event.status}
          </span>
        )}

        {event.type === "EARNING" && (
          <span className="w-full overflow-hidden font-semibold text-success text-ellipsis">
            {formatCurrency(event.amountCents, event.currency)}
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="w-full max-w-full overflow-x-auto select-none calendar-wrapper">
        <div className="flex justify-end mb-5 w-full">
          <button
            tabIndex={-1}
            type="button"
            onClick={() => setModal("create")}
            className="bg-primary/70 hover:bg-primary active:bg-primary/70 px-4 py-2 rounded text-light transition-all duration-300 cursor-pointer"
          >
            Criar evento
          </button>
        </div>

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
          eventClassNames="cursor-pointer hover:bg-secondary/80!"
          eventColor="rgba(171, 151, 203, 0.50)"
          eventClick={({ event: { extendedProps } }) =>
            setModal(extendedProps as IEvent)
          }
          slotMinTime="00:00:00"
          slotMaxTime="24:00:00"
          events={events ?? []}
          eventContent={renderEventContent}
          height="55rem"
          locale={ptBrLocale}
          allDayContent={({ text }) => (
            <p className="font-bold text-center">{text}</p>
          )}
          dayMaxEvents={isMobile ? 1 : 2}
          datesSet={handleDatesSet}
        />
      </div>

      <FixedModal isOpen={!!modal} close={() => setModal(null)}>
        <Form>
          <></>
        </Form>
      </FixedModal>
    </>
  );
};

export default CalendarView;
