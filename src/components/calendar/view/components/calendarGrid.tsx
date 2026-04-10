import { RefObject } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { DatesSetArg } from "@fullcalendar/core/index.js";

import { ICalendarItem } from "@/contexts/calendar/interfaces";

import CalendarItemContent from "../itemContent";
import {
  getCalendarContentHeight,
  getCalendarDayMaxEvents,
  getCalendarGridHeight,
} from "../utils/calendarGridDisplay.utils";
import { handleCalendarMoreLinkClick } from "../utils/calendarGridMoreLink.utils";
import CalendarDayHeader from "./calendarDayHeader";

type CalendarAnimationDirection = "next" | "prev" | "view" | null;

interface IProps {
  calendarRef: RefObject<FullCalendar | null>;
  currentView: "dayGridWeek" | "dayGridMonth";
  isSmallMobile: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isWeekCompact: boolean;
  isAnimating: boolean;
  animationDirection: CalendarAnimationDirection;
  items: ICalendarItem[] | null;
  onDatesSet: (dateInfo: DatesSetArg) => Promise<void>;
  onItemClick: (item: ICalendarItem) => void;
  onAddItemByDate: (date: Date) => void;
  onDateCellClick: (date: Date) => void;
  onOpenDayItemsModal: (date: Date) => boolean;
}

const getAnimationClassName = (
  isAnimating: boolean,
  direction: CalendarAnimationDirection,
): string => {
  if (!isAnimating || !direction) {
    return "translate-x-0 opacity-100";
  }

  if (direction === "next") {
    return "-translate-x-8 opacity-0";
  }

  if (direction === "prev") {
    return "translate-x-8 opacity-0";
  }

  return "translate-x-4 opacity-0";
};

const CalendarGrid = ({
  calendarRef,
  currentView,
  isSmallMobile,
  isMobile,
  isTablet,
  isWeekCompact,
  isAnimating,
  animationDirection,
  items,
  onDatesSet,
  onItemClick,
  onAddItemByDate,
  onDateCellClick,
  onOpenDayItemsModal,
}: IProps) => {
  const resolvedHeight = getCalendarGridHeight({
    currentView,
  });

  const resolvedContentHeight = getCalendarContentHeight({
    currentView,
  });

  const resolvedDayMaxEvents = getCalendarDayMaxEvents({
    currentView,
    isSmallMobile,
    isMobile,
    isTablet,
  });

  return (
    <div className="calendar-grid-shell overflow-hidden rounded-[20px] border border-foreground/10 bg-light">
      <div
        className={[
          "transform transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
          getAnimationClassName(isAnimating, animationDirection),
        ].join(" ")}
      >
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridWeek"
          headerToolbar={false}
          firstDay={1}
          fixedWeekCount={false}
          showNonCurrentDates
          eventClassNames="cursor-pointer"
          eventColor="transparent"
          displayEventTime={false}
          dayCellClassNames="cursor-pointer"
          moreLinkClassNames="cursor-pointer"
          eventClick={({ event }) => {
            onItemClick({
              ...(event.extendedProps as ICalendarItem),
              id: event.id,
              title: event.title,
            });
          }}
          dateClick={({ date }) => {
            onDateCellClick(date);
          }}
          dayHeaderContent={(headerInfo) => (
            <CalendarDayHeader
              date={headerInfo.date}
              currentView={currentView}
              isMobile={isMobile}
              isTablet={isTablet}
              onAddItemByDate={onAddItemByDate}
            />
          )}
          timeZone="UTC"
          events={items ?? []}
          eventContent={(eventInfo) => (
            <CalendarItemContent
              eventInfo={eventInfo}
              currentView={currentView}
              isSmallMobile={isSmallMobile}
              isMobile={isMobile}
              isWeekCompact={isWeekCompact}
            />
          )}
          height={resolvedHeight}
          contentHeight={resolvedContentHeight}
          locale={ptBrLocale}
          dayMaxEvents={resolvedDayMaxEvents}
          moreLinkClick={(info) =>
            handleCalendarMoreLinkClick({
              date: info.date,
              jsEvent: info.jsEvent,
              onOpenDayItemsModal,
            })
          }
          datesSet={onDatesSet}
        />
      </div>
    </div>
  );
};

export default CalendarGrid;
