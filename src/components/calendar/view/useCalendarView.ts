"use client";

import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatesSetArg } from "@fullcalendar/core/index.js";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useAuth, useBillings, useCalendar } from "@/contexts";
import {
  ICalendarItem,
  ICreateContentCalendarItem,
} from "@/contexts/calendar/interfaces";
import { createCalendarSchema } from "@/validators/calendar/create.validator";

import {
  CalendarFormValues,
  createEmptyCalendarFormValues,
  formatCalendarDateForInput,
  mapCalendarItemToFormValues,
  normalizeCalendarDateForForm,
} from "./calendarForm.utils";
import { buildCalendarQueryRange } from "./calendarDateRange.utils";
import { buildCalendarSubmitPayload } from "./calendarSubmitPayload.utils";

type CalendarCurrentView = "dayGridWeek" | "dayGridMonth";

const useCalendarView = () => {
  const [modal, setModal] = useState<"create" | ICalendarItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);
  const [currentView, setCurrentView] =
    useState<CalendarCurrentView>("dayGridWeek");

  const lastRangeRef = useRef<{
    start: number;
    end: number;
  } | null>(null);

  const hasHandledFirstAccessRef = useRef(false);

  const {
    items,
    handleFindAllItems,
    handleFindDashboard,
    handleFindCalendarState,
    calendarState,
    handleCalendarFirstAccess,
    handleCreateItem,
    handleDeleteItem,
    handleUpdateItem,
    handleAiSuggestion,
    loading,
    aiSuggestion,
  } = useCalendar();

  const { userCurrentPlan, handleFindUserCurrentPlan } = useAuth();
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
  const editingItem = modal && modal !== "create" ? modal : null;

  const contentErrors = errors as Partial<
    Record<keyof ICreateContentCalendarItem, { message?: string }>
  >;

  const planEntitlement = userCurrentPlan?.entitlements.find(
    ({ key }) => key === "CALENDAR_AI_SUGGESTIONS",
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    handleFindCalendarState();
  }, [handleFindCalendarState]);

  useEffect(() => {
    if (!calendarState) return;
    if (hasHandledFirstAccessRef.current) return;

    const shouldHandleFirstAccess =
      !calendarState.demoInsertedAt &&
      !calendarState.hasAnyRealItems &&
      !calendarState.hasCreatedFirstRealItem;

    if (!shouldHandleFirstAccess) return;

    hasHandledFirstAccessRef.current = true;
    handleCalendarFirstAccess();
  }, [calendarState, handleCalendarFirstAccess]);

  useEffect(() => {
    if (
      type === "CONTENT" &&
      calendarState?.shouldShowInitialAiSuggestion &&
      modal === "create"
    ) {
      setValue(
        "contentType",
        calendarState.initialAiSuggestion
          ?.contentType as ICreateContentCalendarItem["contentType"],
      );
      setValue(
        "platform",
        calendarState.initialAiSuggestion
          ?.platform as ICreateContentCalendarItem["platform"],
      );
      setValue("title", calendarState.initialAiSuggestion?.title || "");
      setValue(
        "description",
        calendarState.initialAiSuggestion?.description || "",
      );
      setValue("hook", calendarState.initialAiSuggestion?.hook || "");
    }
  }, [type, calendarState, modal, setValue]);

  useEffect(() => {
    if (type === "CONTENT" && aiSuggestion) {
      setValue(
        "contentType",
        aiSuggestion.contentType as ICreateContentCalendarItem["contentType"],
      );
      setValue(
        "platform",
        aiSuggestion.platform as ICreateContentCalendarItem["platform"],
      );
      setValue("title", aiSuggestion.title);
      setValue("description", aiSuggestion.description);
      setValue("hook", aiSuggestion.hook);
    }
  }, [type, aiSuggestion, setValue]);

  const refreshCurrentRange = async () => {
    if (!lastRangeRef.current) return;

    const start = new Date(lastRangeRef.current.start).toISOString();
    const end = new Date(lastRangeRef.current.end).toISOString();

    await handleFindAllItems(start, end);
    await handleFindDashboard(start, end);
  };

  const handleDatesSet = async (dateInfo: DatesSetArg) => {
    const { viewStart, viewEnd, start, end } =
      buildCalendarQueryRange(dateInfo);

    setCurrentView(dateInfo.view.type as CalendarCurrentView);

    if (
      lastRangeRef.current &&
      viewStart >= lastRangeRef.current.start &&
      viewEnd <= lastRangeRef.current.end
    ) {
      return;
    }

    lastRangeRef.current = {
      start: start.getTime(),
      end: end.getTime(),
    };

    await handleFindAllItems(start.toISOString(), end.toISOString());
    await handleFindDashboard(start.toISOString(), end.toISOString());
  };

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

  const handleDeleteCurrentItem = async () => {
    if (!editingItem) return;

    await handleDeleteItem(editingItem.id);

    setModal(null);
    reset(createEmptyCalendarFormValues(type || "CONTENT"));

    await refreshCurrentRange();
  };

  const handleAiSuggestionRequest = async () => {
    if (planEntitlement?.remaining === 0) {
      setIsPlansModalOpen(true);
      return;
    }

    if (!platform) {
      setError("platform", { message: "Escolha uma plataforma" });
      return;
    }

    await handleAiSuggestion({
      platform,
      referenceDate: new Date().toISOString(),
    });

    await handleFindUserCurrentPlan();
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

      setModal(null);
      reset(createEmptyCalendarFormValues(type || "CONTENT"));

      await refreshCurrentRange();
      return;
    }

    if (!editingItem) return;

    await handleUpdateItem(editingItem.id, filteredData);

    setModal(null);
    reset(createEmptyCalendarFormValues(type || "CONTENT"));

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
