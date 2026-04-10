import { useState } from "react";

import { ICalendarItem } from "@/contexts/calendar/interfaces";

import {
  getCalendarItemsByDate,
  ICalendarDayItemsModalState,
} from "../utils/calendarDayItems.utils";

interface IProps {
  items: ICalendarItem[] | null;
  isMobile: boolean;
  currentView: "dayGridWeek" | "dayGridMonth";
  onAddItemByDate: (date: Date | string) => void;
  onItemClick: (item: ICalendarItem) => void;
}

const useCalendarDayItems = ({
  items,
  isMobile,
  currentView,
  onAddItemByDate,
  onItemClick,
}: IProps) => {
  const [dayItemsModalState, setDayItemsModalState] =
    useState<ICalendarDayItemsModalState | null>(null);

  const handleOpenDayItemsModal = (date: Date): boolean => {
    const matchedItems = getCalendarItemsByDate(items ?? [], date);

    if (!matchedItems.length) {
      return false;
    }

    setDayItemsModalState({
      date,
      items: matchedItems,
    });

    return true;
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
      setDayItemsModalState({
        date,
        items: matchedItems,
      });
      return;
    }

    onAddItemByDate(date);
  };

  const handleSelectDayItem = (item: ICalendarItem) => {
    setDayItemsModalState(null);
    onItemClick(item);
  };

  const handleCreateItemForDay = (date: Date) => {
    setDayItemsModalState(null);
    onAddItemByDate(date);
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
