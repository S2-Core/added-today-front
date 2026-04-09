import { useRef, useState } from "react";
import { DatesSetArg } from "@fullcalendar/core/index.js";

import { useCalendar } from "@/contexts";

import { buildCalendarQueryRange } from "../utils/calendarDateRange.utils";

type CalendarCurrentView = "dayGridWeek" | "dayGridMonth";

const useCalendarRange = () => {
  const [currentView, setCurrentView] =
    useState<CalendarCurrentView>("dayGridWeek");

  const lastRangeRef = useRef<{
    start: number;
    end: number;
  } | null>(null);

  const { handleFindAllItems, handleFindDashboard } = useCalendar();

  const refreshCurrentRange = async () => {
    if (!lastRangeRef.current) return;

    const start = new Date(lastRangeRef.current.start).toISOString();
    const end = new Date(lastRangeRef.current.end).toISOString();

    await handleFindAllItems(start, end);
    await handleFindDashboard(start, end);
  };

  const handleDatesSet = async (dateInfo: DatesSetArg) => {
    const { viewStart, viewEnd, start, end } =
      buildCalendarQueryRange(dateInfo);

    setCurrentView(dateInfo.view.type as CalendarCurrentView);

    if (
      lastRangeRef.current &&
      viewStart >= lastRangeRef.current.start &&
      viewEnd <= lastRangeRef.current.end
    ) {
      return;
    }

    lastRangeRef.current = {
      start: start.getTime(),
      end: end.getTime(),
    };

    await handleFindAllItems(start.toISOString(), end.toISOString());
    await handleFindDashboard(start.toISOString(), end.toISOString());
  };

  return {
    currentView,
    handleDatesSet,
    refreshCurrentRange,
  };
};

export default useCalendarRange;
