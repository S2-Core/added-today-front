type CalendarCurrentView = "dayGridWeek" | "dayGridMonth";

interface ICalendarGridDisplayProps {
  currentView: CalendarCurrentView;
  isSmallMobile: boolean;
  isMobile: boolean;
  isTablet: boolean;
}

export const getCalendarGridHeight = ({
  currentView,
}: Omit<
  ICalendarGridDisplayProps,
  "isSmallMobile" | "isMobile" | "isTablet"
>): string => {
  if (currentView === "dayGridWeek") {
    return "auto";
  }

  return "auto";
};

export const getCalendarContentHeight = ({
  currentView,
}: Omit<ICalendarGridDisplayProps, "isSmallMobile" | "isMobile" | "isTablet">):
  | string
  | undefined => {
  if (currentView === "dayGridWeek") {
    return "auto";
  }

  return "auto";
};

export const getCalendarDayMaxEvents = ({
  currentView,
  isSmallMobile,
  isMobile,
  isTablet,
}: ICalendarGridDisplayProps): number => {
  if (currentView === "dayGridMonth") {
    return 2;
  }

  if (isSmallMobile || isMobile) {
    return 1;
  }

  if (isTablet) {
    return 2;
  }

  return 3;
};
