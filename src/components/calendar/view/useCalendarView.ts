"use client";

import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useBillings, useCalendar } from "@/contexts";
import {
  ICalendarItem,
  ICreateContentCalendarItem,
} from "@/contexts/calendar/interfaces";
import { createCalendarSchema } from "@/validators/calendar/create.validator";
import {
  CalendarFormValues,
  buildCalendarSubmitPayload,
  createEmptyCalendarFormValues,
} from "@/components/calendar/domain/form.mapper";

import useCalendarAi from "./hooks/useCalendarAi";
import useCalendarFirstAccess from "./hooks/useCalendarFirstAccess";
import useCalendarModal from "./hooks/useCalendarModal";
import useCalendarRange from "./hooks/useCalendarRange";
import useCalendarSuggestions from "./hooks/useCalendarSuggestions";
import useCalendarViewport from "./hooks/useCalendarViewport";

const useCalendarView = () => {
  const [modal, setModal] = useState<"create" | ICalendarItem | null>(null);
  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);

  const {
    items,
    handleCreateItem,
    handleDeleteItem,
    handleUpdateItem,
    loading,
    aiSuggestion,
  } = useCalendar();

  const { allUIPlans } = useBillings();

  const {
    register,
    reset,
    watch,
    setValue,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<CalendarFormValues>({
    mode: "onChange",
    resolver: yupResolver(createCalendarSchema),
    shouldUnregister: false,
  });

  const type = watch("type");
  const platform = watch("platform");

  const { isMobile } = useCalendarViewport();
  const { calendarState } = useCalendarFirstAccess();
  const { currentView, handleDatesSet, refreshCurrentRange } =
    useCalendarRange();

  const {
    editingItem,
    handleOpenCreateModal,
    handleAddItemByDate,
    handleItemClick,
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

  const {
    contentErrors,
    planEntitlement,
    handleAiSuggestionRequest: handleAiSuggestionRequestBase,
  } = useCalendarAi({
    errors,
    platform: platform as ICreateContentCalendarItem["platform"] | undefined,
    setError,
  });

  useCalendarSuggestions({
    type,
    modal,
    calendarState,
    aiSuggestion,
    setValue,
  });

  const resetFormState = () => {
    setModal(null);
    reset(createEmptyCalendarFormValues(type || "CONTENT"));
  };

  const handleDeleteCurrentItem = async () => {
    if (!editingItem) return;

    await handleDeleteItem(editingItem.id);
    resetFormState();
    await refreshCurrentRange();
  };

  const handleAiSuggestionRequest = async () => {
    await handleAiSuggestionRequestBase(() => setIsPlansModalOpen(true));
  };

  const onSubmit = async (data: CalendarFormValues) => {
    let filteredData: CalendarFormValues;

    try {
      filteredData = buildCalendarSubmitPayload(data);
    } catch {
      toast.error("Data inválida. Verifique o dia informado.");
      return;
    }

    if (modal === "create") {
      await handleCreateItem(filteredData);
      resetFormState();
      await refreshCurrentRange();
      return;
    }

    if (!editingItem) return;

    await handleUpdateItem(editingItem.id, filteredData);
    resetFormState();
    await refreshCurrentRange();
  };

  return {
    modal,
    isMobile,
    isPlansModalOpen,
    setIsPlansModalOpen,
    items,
    loading,
    type,
    currentView,
    contentErrors,
    planEntitlement,
    allUIPlans,
    register,
    control,
    handleSubmit,
    errors,
    handleDatesSet,
    handleOpenCreateModal,
    handleAddItemByDate,
    handleItemClick,
    handleCloseModal,
    handleTypeChange,
    handleSecondaryAction,
    handleDeleteCurrentItem,
    handleAiSuggestionRequest,
    onSubmit,
  };
};

export default useCalendarView;
