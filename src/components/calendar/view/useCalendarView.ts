"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useBillings, useCalendar } from "@/contexts";
import { ICreateContentCalendarItem } from "@/contexts/calendar/interfaces";
import { createCalendarSchema } from "@/validators/calendar/create.validator";
import { CalendarFormValues } from "@/components/calendar/domain/form.mapper";

import useCalendarAi from "./hooks/useCalendarAi";
import useCalendarFirstAccess from "./hooks/useCalendarFirstAccess";
import useCalendarRange from "./hooks/useCalendarRange";
import useCalendarSubmit from "./hooks/useCalendarSubmit";
import useCalendarSuggestions from "./hooks/useCalendarSuggestions";
import useCalendarViewport from "./hooks/useCalendarViewport";
import useCalendarViewActions from "./hooks/useCalendarViewActions";
import useCalendarViewAnalytics from "./hooks/useCalendarViewAnalytics";
import useCalendarViewBaseModals from "./hooks/useCalendarViewBaseModals";
import useCalendarViewDayItems from "./hooks/useCalendarViewDayItems";
import useCalendarViewModals from "./hooks/useCalendarViewModals";

const useCalendarView = () => {
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
  const { currentView, currentRange, handleDatesSet, refreshCurrentRange } =
    useCalendarRange();

  const { trackCreateClicked, trackItemOpened, trackDayModalOpened } =
    useCalendarViewAnalytics();

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
    modal,
    setModal,
    selectedItem,
    editingItem,
    isPlansModalOpen,
    setIsPlansModalOpen,
    handleOpenCreateModal: handleOpenCreateModalBase,
    handleAddItemByDate: handleAddItemByDateBase,
    handleItemClick: handleItemClickBase,
    handleOpenEditModal,
    handleOpenDeleteModal,
    handleCloseModal,
    handleTypeChange,
    handleSecondaryAction,
  } = useCalendarViewBaseModals({
    type,
    reset,
    watch,
    loading,
  });

  const {
    handleOpenCreateModal,
    handleAddItemByDate,
    handleItemClick,
    handleAiSuggestionRequest,
  } = useCalendarViewActions({
    currentView,
    onTrackCreateClicked: trackCreateClicked,
    onTrackItemOpened: trackItemOpened,
    handleOpenCreateModalBase,
    handleAddItemByDateBase,
    handleItemClickBase,
    handleCloseModal,
    setIsPlansModalOpen,
    handleAiSuggestionRequestBase,
  });

  const {
    dayItemsModalState,
    handleOpenDayItemsModal,
    handleCloseDayItemsModal,
    handleCalendarDateInteraction,
    handleSelectDayItem,
    handleCreateItemForDay,
  } = useCalendarViewDayItems({
    items,
    isMobile,
    currentView,
    onAddItemByDate: handleAddItemByDate,
    onItemClick: (item) => handleItemClick(item, "day_modal"),
    onDayModalOpened: ({ date, items: dayItems, origin }) => {
      trackDayModalOpened({
        date,
        itemsCount: dayItems.length,
        view: currentView,
        origin,
      });
    },
  });

  const { suggestionModalBridge, formModalBridge } = useCalendarViewModals({
    modal,
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

  useCalendarSuggestions({
    type,
    modal: suggestionModalBridge,
    calendarState,
    aiSuggestion,
    setValue,
  });

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
    currentRange,
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
