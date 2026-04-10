import { useState } from "react";
import { UseFormReset, UseFormWatch } from "react-hook-form";

import { CalendarFormValues } from "@/components/calendar/domain/form.mapper";

import useCalendarModal, { type CalendarModalState } from "./useCalendarModal";

interface IProps {
  type?: CalendarFormValues["type"];
  reset: UseFormReset<CalendarFormValues>;
  watch: UseFormWatch<CalendarFormValues>;
  loading: boolean;
}

const useCalendarViewBaseModals = ({ type, reset, watch, loading }: IProps) => {
  const [modal, setModal] = useState<CalendarModalState>(null);
  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);

  const {
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
  } = useCalendarModal({
    modal,
    setModal,
    type,
    reset,
    watch,
    loading,
  });

  return {
    modal,
    setModal,
    selectedItem,
    editingItem,
    isPlansModalOpen,
    setIsPlansModalOpen,
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

export default useCalendarViewBaseModals;
