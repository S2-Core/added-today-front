"use client";

import { useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useBillings, useCalendar } from "@/contexts";
import { ICreateContentCalendarItem } from "@/contexts/calendar/interfaces";
import { createCalendarSchema } from "@/validators/calendar/create.validator";
import { CalendarFormValues } from "@/components/calendar/domain/form.mapper";

import useCalendarAi from "./hooks/useCalendarAi";
import useCalendarDayItems from "./hooks/useCalendarDayItems";
import useCalendarFirstAccess from "./hooks/useCalendarFirstAccess";
import useCalendarModal, { CalendarModalState } from "./hooks/useCalendarModal";
import useCalendarRange from "./hooks/useCalendarRange";
import useCalendarSubmit from "./hooks/useCalendarSubmit";
import useCalendarSuggestions from "./hooks/useCalendarSuggestions";
import useCalendarViewport from "./hooks/useCalendarViewport";

const useCalendarView = () => {
  const [modal, setModal] = useState<CalendarModalState>(null);
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

  const { isSmallMobile, isMobile, isTablet, isDesktop, isWeekCompact } =
    useCalendarViewport();
  const { calendarState } = useCalendarFirstAccess();
  const { currentView, handleDatesSet, refreshCurrentRange } =
    useCalendarRange();

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

  const {
    contentErrors,
    planEntitlement,
    handleAiSuggestionRequest: handleAiSuggestionRequestBase,
  } = useCalendarAi({
    errors,
    platform: platform as ICreateContentCalendarItem["platform"] | undefined,
    setError,
  });

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
    onAddItemByDate: handleAddItemByDate,
    onItemClick: handleItemClick,
  });

  const { handleDeleteCurrentItem, onSubmit } = useCalendarSubmit({
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
  });

  const suggestionModalBridge = useMemo(() => {
    if (!modal) return null;

    if (modal.mode === "create") {
      return "create" as const;
    }

    if (modal.mode === "edit") {
      return modal.item;
    }

    return null;
  }, [modal]);

  const formModalBridge = useMemo(() => {
    if (!modal) return null;

    if (modal.mode === "create") {
      return "create" as const;
    }

    if (modal.mode === "edit") {
      return modal.item;
    }

    return null;
  }, [modal]);

  useCalendarSuggestions({
    type,
    modal: suggestionModalBridge,
    calendarState,
    aiSuggestion,
    setValue,
  });

  const handleAiSuggestionRequest = async () => {
    await handleAiSuggestionRequestBase(() => setIsPlansModalOpen(true));
  };

  return {
    modal,
    formModalBridge,
    selectedItem,
    editingItem,
    dayItemsModalState,
    isSmallMobile,
    isMobile,
    isTablet,
    isDesktop,
    isWeekCompact,
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
    handleOpenEditModal,
    handleOpenDeleteModal,
    handleCloseModal,
    handleTypeChange,
    handleSecondaryAction,
    handleDeleteCurrentItem,
    handleAiSuggestionRequest,
    handleOpenDayItemsModal,
    handleCloseDayItemsModal,
    handleCalendarDateInteraction,
    handleSelectDayItem,
    handleCreateItemForDay,
    onSubmit,
  };
};

export default useCalendarView;
