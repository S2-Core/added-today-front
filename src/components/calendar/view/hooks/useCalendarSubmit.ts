import { Dispatch, SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";

import { ICalendarItem } from "@/contexts/calendar/interfaces";
import {
  CalendarFormValues,
  buildCalendarSubmitPayload,
  createEmptyCalendarFormValues,
} from "@/components/calendar/domain/form.mapper";

import { CalendarModalState } from "./useCalendarModal";

interface IProps {
  modal: CalendarModalState;
  setModal: Dispatch<SetStateAction<CalendarModalState>>;
  selectedItem: ICalendarItem | null;
  editingItem: ICalendarItem | null;
  type?: CalendarFormValues["type"];
  reset: UseFormReset<CalendarFormValues>;
  handleCreateItem: (data: CalendarFormValues) => Promise<void>;
  handleDeleteItem: (id: string) => Promise<void>;
  handleUpdateItem: (id: string, data: CalendarFormValues) => Promise<void>;
  refreshCurrentRange: () => Promise<void>;
}

const useCalendarSubmit = ({
  modal,
  setModal,
  selectedItem,
  editingItem,
  type,
  reset,
  handleCreateItem,
  handleDeleteItem,
  handleUpdateItem,
  refreshCurrentRange,
}: IProps) => {
  const resetFormState = () => {
    setModal(null);
    reset(createEmptyCalendarFormValues(type || "CONTENT"));
  };

  const handleDeleteCurrentItem = async () => {
    if (!selectedItem) return;

    await handleDeleteItem(selectedItem.id);
    resetFormState();
    await refreshCurrentRange();
  };

  const onSubmit = async (data: CalendarFormValues) => {
    let filteredData: CalendarFormValues;

    try {
      filteredData = buildCalendarSubmitPayload(data);
    } catch {
      toast.error("Data inválida. Verifique o dia informado.");
      return;
    }

    if (modal?.mode === "create") {
      await handleCreateItem(filteredData);
      resetFormState();
      await refreshCurrentRange();
      return;
    }

    if (modal?.mode !== "edit" || !editingItem) {
      return;
    }

    await handleUpdateItem(editingItem.id, filteredData);
    resetFormState();
    await refreshCurrentRange();
  };

  return {
    handleDeleteCurrentItem,
    onSubmit,
  };
};

export default useCalendarSubmit;
