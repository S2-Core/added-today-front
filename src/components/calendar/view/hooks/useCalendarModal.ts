import { Dispatch, SetStateAction } from "react";
import { UseFormReset, UseFormWatch } from "react-hook-form";

import { ICalendarItem } from "@/contexts/calendar/interfaces";
import {
  formatCalendarDateForInput,
  normalizeCalendarDateForForm,
} from "@/components/calendar/domain/date.utils";
import {
  CalendarFormValues,
  createEmptyCalendarFormValues,
  mapCalendarItemToFormValues,
} from "@/components/calendar/domain/form.mapper";

interface IProps {
  modal: "create" | ICalendarItem | null;
  setModal: Dispatch<SetStateAction<"create" | ICalendarItem | null>>;
  type?: CalendarFormValues["type"];
  reset: UseFormReset<CalendarFormValues>;
  watch: UseFormWatch<CalendarFormValues>;
  loading: boolean;
}

const useCalendarModal = ({
  modal,
  setModal,
  type,
  reset,
  watch,
  loading,
}: IProps) => {
  const editingItem = modal && modal !== "create" ? modal : null;

  const handleOpenCreateModal = (dateValue?: string) => {
    const initialDate =
      normalizeCalendarDateForForm(
        dateValue || formatCalendarDateForInput(new Date()),
      ) || formatCalendarDateForInput(new Date());

    setModal("create");
    reset(createEmptyCalendarFormValues("CONTENT", initialDate));
  };

  const handleAddItemByDate = (dateValue: string | Date) => {
    const normalizedDate = normalizeCalendarDateForForm(dateValue);

    handleOpenCreateModal(normalizedDate);
  };

  const handleItemClick = (item: ICalendarItem) => {
    setModal(item);
    reset(mapCalendarItemToFormValues(item));
  };

  const handleCloseModal = () => {
    if (loading) return;

    setModal(null);
    reset(createEmptyCalendarFormValues(type || "CONTENT"));
  };

  const handleTypeChange = (nextType: CalendarFormValues["type"]) => {
    const currentStartsAt = normalizeCalendarDateForForm(watch("startsAt"));

    if (editingItem && editingItem.type === nextType) {
      reset(mapCalendarItemToFormValues(editingItem));
      return;
    }

    reset(
      createEmptyCalendarFormValues(
        nextType,
        currentStartsAt ||
          (editingItem?.startsAt
            ? formatCalendarDateForInput(editingItem.startsAt)
            : formatCalendarDateForInput(new Date())),
      ),
    );
  };

  const handleSecondaryAction = () => {
    handleTypeChange(type || "CONTENT");
  };

  return {
    editingItem,
    handleOpenCreateModal,
    handleAddItemByDate,
    handleItemClick,
    handleCloseModal,
    handleTypeChange,
    handleSecondaryAction,
  };
};

export default useCalendarModal;
