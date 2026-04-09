import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { DatesSetArg } from "@fullcalendar/core/index.js";
import { RefObject } from "react";

import CalendarItemContent from "../itemContent";
import CalendarDayHeader from "./calendarDayHeader";

import { ICalendarItem } from "@/contexts/calendar/interfaces";

interface IProps {
  calendarRef: RefObject<FullCalendar | null>;
  currentView: "dayGridWeek" | "dayGridMonth";
  isMobile: boolean;
  items: ICalendarItem[] | null;
  onDatesSet: (dateInfo: DatesSetArg) => Promise<void>;
  onItemClick: (item: ICalendarItem) => void;
  onAddItemByDate: (date: Date) => void;
}

const CalendarGrid = ({
  calendarRef,
  currentView,
  isMobile,
  items,
  onDatesSet,
  onItemClick,
  onAddItemByDate,
}: IProps) => {
  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridWeek"
      headerToolbar={false}
      firstDay={1}
      eventClassNames="cursor-pointer"
      eventColor="transparent"
      displayEventTime={false}
      eventClick={({ event }) => {
        onItemClick({
          ...(event.extendedProps as ICalendarItem),
          id: event.id,
          title: event.title,
        });
      }}
      dateClick={({ date }) => {
        onAddItemByDate(date);
      }}
      dayHeaderContent={(headerInfo) => (
        <CalendarDayHeader
          date={headerInfo.date}
          currentView={currentView}
          onAddItemByDate={onAddItemByDate}
        />
      )}
      timeZone="UTC"
      events={items ?? []}
      eventContent={(eventInfo) => (
        <CalendarItemContent eventInfo={eventInfo} />
      )}
      height="55rem"
      locale={ptBrLocale}
      dayMaxEvents={isMobile ? 2 : 3}
      datesSet={onDatesSet}
    />
  );
};

export default CalendarGrid;
