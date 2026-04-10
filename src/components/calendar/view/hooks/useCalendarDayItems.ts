import { useState } from "react";

import { ICalendarItem } from "@/contexts/calendar/interfaces";

import {
  getCalendarItemsByDate,
  ICalendarDayItemsModalState,
} from "../utils/calendarDayItems.utils";

type CalendarDayModalOrigin = "date_click" | "more_link";
type CalendarCreateTriggerSource = "date_click" | "day_modal";

interface IProps {
  items: ICalendarItem[] | null;
  isMobile: boolean;
  currentView: "dayGridWeek" | "dayGridMonth";
  onAddItemByDate: (
    date: Date | string,
    triggerSource?: CalendarCreateTriggerSource,
  ) => void;
  onItemClick: (item: ICalendarItem) => void;
  onDayModalOpened?: (payload: {
    date: Date;
    items: ICalendarItem[];
    origin: CalendarDayModalOrigin;
  }) => void;
  onDayItemSelected?: (item: ICalendarItem) => void;
  onDayCreateClicked?: (date: Date) => void;
}

const useCalendarDayItems = ({
  items,
  isMobile,
  currentView,
  onAddItemByDate,
  onItemClick,
  onDayModalOpened,
  onDayItemSelected,
  onDayCreateClicked,
}: IProps) => {
  const [dayItemsModalState, setDayItemsModalState] =
    useState<ICalendarDayItemsModalState | null>(null);

  const openDayItemsModal = (
    date: Date,
    origin: CalendarDayModalOrigin,
  ): boolean => {
    const matchedItems = getCalendarItemsByDate(items ?? [], date);

    if (!matchedItems.length) {
      return false;
    }

    setDayItemsModalState({
      date,
      items: matchedItems,
    });

    onDayModalOpened?.({
      date,
      items: matchedItems,
      origin,
    });

    return true;
  };

  const handleOpenDayItemsModal = (date: Date): boolean => {
    return openDayItemsModal(date, "more_link");
  };

  const handleCloseDayItemsModal = () => {
    setDayItemsModalState(null);
  };

  const handleCalendarDateInteraction = (date: Date) => {
    const matchedItems = getCalendarItemsByDate(items ?? [], date);

    const shouldOpenDayModal =
      (currentView === "dayGridMonth" && matchedItems.length > 0) ||
      (isMobile && matchedItems.length > 1);

    if (shouldOpenDayModal) {
      openDayItemsModal(date, "date_click");
      return;
    }

    onAddItemByDate(date, "date_click");
  };

  const handleSelectDayItem = (item: ICalendarItem) => {
    setDayItemsModalState(null);
    onDayItemSelected?.(item);
    onItemClick(item);
  };

  const handleCreateItemForDay = (date: Date) => {
    setDayItemsModalState(null);
    onDayCreateClicked?.(date);
    onAddItemByDate(date, "day_modal");
  };

  return {
    dayItemsModalState,
    handleOpenDayItemsModal,
    handleCloseDayItemsModal,
    handleCalendarDateInteraction,
    handleSelectDayItem,
    handleCreateItemForDay,
  };
};

export default useCalendarDayItems;
