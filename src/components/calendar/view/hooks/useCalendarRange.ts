import { useRef, useState } from "react";
import { DatesSetArg } from "@fullcalendar/core/index.js";

import { useCalendar } from "@/contexts";

import { buildCalendarQueryRange } from "../utils/calendarDateRange.utils";

type CalendarCurrentView = "dayGridWeek" | "dayGridMonth";

interface IDateRangeRef {
  start: number;
  end: number;
}

const useCalendarRange = () => {
  const [currentView, setCurrentView] =
    useState<CalendarCurrentView>("dayGridWeek");

  const currentRangeRef = useRef<IDateRangeRef | null>(null);

  const { handleFindAllItems, handleFindDashboard } = useCalendar();

  const refreshCurrentRange = async () => {
    if (!currentRangeRef.current) return;

    const from = new Date(currentRangeRef.current.start).toISOString();
    const to = new Date(currentRangeRef.current.end).toISOString();

    await Promise.all([
      handleFindAllItems(from, to),
      handleFindDashboard(from, to),
    ]);
  };

  const handleDatesSet = async (dateInfo: DatesSetArg) => {
    const { dashboardStart, dashboardEnd } = buildCalendarQueryRange(dateInfo);

    setCurrentView(dateInfo.view.type as CalendarCurrentView);

    const nextRange = {
      start: dashboardStart.getTime(),
      end: dashboardEnd.getTime(),
    };

    const shouldFetch =
      !currentRangeRef.current ||
      currentRangeRef.current.start !== nextRange.start ||
      currentRangeRef.current.end !== nextRange.end;

    currentRangeRef.current = nextRange;

    if (!shouldFetch) return;

    const from = dashboardStart.toISOString();
    const to = dashboardEnd.toISOString();

    await Promise.all([
      handleFindAllItems(from, to),
      handleFindDashboard(from, to),
    ]);
  };

  return {
    currentView,
    handleDatesSet,
    refreshCurrentRange,
  };
};

export default useCalendarRange;
