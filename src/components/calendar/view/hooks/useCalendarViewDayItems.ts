import { ICalendarItem } from "@/contexts/calendar/interfaces";

import useCalendarDayItems from "./useCalendarDayItems";

interface IProps {
  items: ICalendarItem[] | null;
  isMobile: boolean;
  currentView: "dayGridWeek" | "dayGridMonth";
  onAddItemByDate: (
    date: Date | string,
    triggerSource?: "day_header" | "day_modal" | "date_click",
  ) => void;
  onItemClick: (item: ICalendarItem) => void;
  onDayModalOpened?: (payload: {
    date: Date;
    items: ICalendarItem[];
    origin: "date_click" | "more_link";
  }) => void;
  onDayItemSelected?: (item: ICalendarItem) => void;
  onDayCreateClicked?: (date: Date) => void;
}

const useCalendarViewDayItems = ({
  items,
  isMobile,
  currentView,
  onAddItemByDate,
  onItemClick,
  onDayModalOpened,
  onDayItemSelected,
  onDayCreateClicked,
}: IProps) => {
  const {
    dayItemsModalState,
    handleOpenDayItemsModal,
    handleCloseDayItemsModal,
    handleCalendarDateInteraction,
    handleSelectDayItem,
    handleCreateItemForDay,
  } = useCalendarDayItems({
    items,
    isMobile,
    currentView,
    onAddItemByDate,
    onItemClick,
    onDayModalOpened,
    onDayItemSelected,
    onDayCreateClicked,
  });

  return {
    dayItemsModalState,
    handleOpenDayItemsModal,
    handleCloseDayItemsModal,
    handleCalendarDateInteraction,
    handleSelectDayItem,
    handleCreateItemForDay,
  };
};

export default useCalendarViewDayItems;
