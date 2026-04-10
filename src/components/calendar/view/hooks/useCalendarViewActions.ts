import { ICalendarItem } from "@/contexts/calendar/interfaces";

type CalendarCreateTriggerSource =
  | "toolbar"
  | "day_header"
  | "day_modal"
  | "date_click"
  | "empty_state"
  | "unknown";

interface IProps {
  currentView: "dayGridWeek" | "dayGridMonth";
  onTrackCreateClicked: (params: {
    triggerSource: CalendarCreateTriggerSource;
    view: "dayGridWeek" | "dayGridMonth";
  }) => void;
  onTrackItemOpened: (params: {
    item: ICalendarItem;
    origin: "calendar_grid" | "day_modal" | "details_modal";
  }) => void;
  handleOpenCreateModalBase: () => void;
  handleAddItemByDateBase: (date: Date | string) => void;
  handleItemClickBase: (item: ICalendarItem) => void;
  handleCloseModal: () => void;
  setIsPlansModalOpen: (value: boolean) => void;
  handleAiSuggestionRequestBase: (openPlansModal: () => void) => Promise<void>;
}

const useCalendarViewActions = ({
  currentView,
  onTrackCreateClicked,
  onTrackItemOpened,
  handleOpenCreateModalBase,
  handleAddItemByDateBase,
  handleItemClickBase,
  handleCloseModal,
  setIsPlansModalOpen,
  handleAiSuggestionRequestBase,
}: IProps) => {
  const handleOpenCreateModal = (
    triggerSource: CalendarCreateTriggerSource = "unknown",
  ) => {
    onTrackCreateClicked({
      triggerSource,
      view: currentView,
    });

    handleOpenCreateModalBase();
  };

  const handleAddItemByDate = (
    date: Date | string,
    triggerSource: "day_header" | "day_modal" | "date_click" = "day_header",
  ) => {
    onTrackCreateClicked({
      triggerSource,
      view: currentView,
    });

    handleAddItemByDateBase(date);
  };

  const handleItemClick = (
    item: ICalendarItem,
    origin: "calendar_grid" | "day_modal" | "details_modal" = "calendar_grid",
  ) => {
    onTrackItemOpened({
      item,
      origin,
    });

    handleItemClickBase(item);
  };

  const handleOpenPlansModal = () => {
    handleCloseModal();
    setIsPlansModalOpen(true);
  };

  const handleAiSuggestionRequest = async () => {
    await handleAiSuggestionRequestBase(handleOpenPlansModal);
  };

  return {
    handleOpenCreateModal,
    handleAddItemByDate,
    handleItemClick,
    handleOpenPlansModal,
    handleAiSuggestionRequest,
  };
};

export default useCalendarViewActions;
