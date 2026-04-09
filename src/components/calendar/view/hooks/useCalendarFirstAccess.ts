import { useEffect, useState } from "react";

import { useCalendar } from "@/contexts";

const useCalendarFirstAccess = () => {
  const [hasHandledFirstAccess, setHasHandledFirstAccess] = useState(false);

  const { handleFindCalendarState, calendarState, handleCalendarFirstAccess } =
    useCalendar();

  useEffect(() => {
    handleFindCalendarState();
  }, [handleFindCalendarState]);

  useEffect(() => {
    if (!calendarState) return;
    if (hasHandledFirstAccess) return;

    const shouldHandleFirstAccess =
      !calendarState.demoInsertedAt &&
      !calendarState.hasAnyRealItems &&
      !calendarState.hasCreatedFirstRealItem;

    if (!shouldHandleFirstAccess) return;

    setHasHandledFirstAccess(true);
    handleCalendarFirstAccess();
  }, [calendarState, handleCalendarFirstAccess, hasHandledFirstAccess]);

  return {
    calendarState,
  };
};

export default useCalendarFirstAccess;
