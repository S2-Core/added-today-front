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

export type CalendarModalState =
  | null
  | {
      mode: "create";
      initialDate?: string;
    }
  | {
      mode: "details";
      item: ICalendarItem;
    }
  | {
      mode: "edit";
      item: ICalendarItem;
    }
  | {
      mode: "delete";
      item: ICalendarItem;
    };

interface IProps {
  modal: CalendarModalState;
  setModal: Dispatch<SetStateAction<CalendarModalState>>;
  type?: CalendarFormValues["type"];
  reset: UseFormReset<CalendarFormValues>;
  watch: UseFormWatch<CalendarFormValues>;
  loading: boolean;
}

const getDefaultCalendarDate = (): string =>
  formatCalendarDateForInput(new Date());

const getSafeCalendarDate = (dateValue?: string | Date | null): string =>
  normalizeCalendarDateForForm(dateValue) || getDefaultCalendarDate();

const useCalendarModal = ({
  modal,
  setModal,
  type,
  reset,
  watch,
  loading,
}: IProps) => {
  const selectedItem = modal && "item" in modal ? modal.item : null;
  const editingItem = modal?.mode === "edit" ? modal.item : null;

  const resetToEmptyForm = (nextType?: CalendarFormValues["type"]) => {
    reset(createEmptyCalendarFormValues(nextType || type || "CONTENT"));
  };

  const resolveTargetItem = (item?: ICalendarItem): ICalendarItem | null =>
    item || selectedItem || null;

  const openDetailsModal = (item: ICalendarItem) => {
    setModal({
      mode: "details",
      item,
    });
  };

  const handleOpenCreateModal = (dateValue?: string) => {
    const initialDate = getSafeCalendarDate(
      dateValue || getDefaultCalendarDate(),
    );

    setModal({
      mode: "create",
      initialDate,
    });

    reset(createEmptyCalendarFormValues("CONTENT", initialDate));
  };

  const handleAddItemByDate = (dateValue: string | Date) => {
    const normalizedDate = getSafeCalendarDate(dateValue);

    handleOpenCreateModal(normalizedDate);
  };

  const handleItemClick = (item: ICalendarItem) => {
    openDetailsModal(item);
  };

  const handleOpenEditModal = (item?: ICalendarItem) => {
    const targetItem = resolveTargetItem(item);

    if (!targetItem) return;

    setModal({
      mode: "edit",
      item: targetItem,
    });

    reset(mapCalendarItemToFormValues(targetItem));
  };

  const handleOpenDeleteModal = (item?: ICalendarItem) => {
    const targetItem = resolveTargetItem(item);

    if (!targetItem) return;

    setModal({
      mode: "delete",
      item: targetItem,
    });
  };

  const handleCloseModal = () => {
    if (loading) return;

    setModal(null);
    resetToEmptyForm();
  };

  const handleTypeChange = (nextType: CalendarFormValues["type"]) => {
    const watchedStartsAt = getSafeCalendarDate(watch("startsAt"));

    if (editingItem && editingItem.type === nextType) {
      reset(mapCalendarItemToFormValues(editingItem));
      return;
    }

    const fallbackDate = editingItem?.startsAt
      ? formatCalendarDateForInput(editingItem.startsAt)
      : modal?.mode === "create"
        ? getSafeCalendarDate(modal.initialDate)
        : getDefaultCalendarDate();

    reset(
      createEmptyCalendarFormValues(nextType, watchedStartsAt || fallbackDate),
    );
  };

  const handleSecondaryAction = () => {
    if (modal?.mode === "edit" && editingItem) {
      openDetailsModal(editingItem);
      resetToEmptyForm(editingItem.type);
      return;
    }

    const currentStartsAt = getSafeCalendarDate(watch("startsAt"));

    reset(createEmptyCalendarFormValues(type || "CONTENT", currentStartsAt));
  };

  return {
    selectedItem,
    editingItem,
    handleOpenCreateModal,
    handleAddItemByDate,
    handleItemClick,
    handleOpenEditModal,
    handleOpenDeleteModal,
    handleCloseModal,
    handleTypeChange,
    handleSecondaryAction,
  };
};

export default useCalendarModal;
