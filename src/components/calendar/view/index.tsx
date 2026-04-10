"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { DatesSetArg } from "@fullcalendar/core/index.js";
import { usePathname } from "next/navigation";

import PlansModal from "../../plansModal";
import CalendarToolbar from "./calendarToolbar";
import CalendarViewModals from "./calendarViewModals";
import CalendarGrid from "./components/calendarGrid";
import useCalendarSwipe from "./hooks/useCalendarSwipe";
import { getCalendarToolbarTitle } from "./utils/calendarViewTitle.utils";
import useCalendarView from "./useCalendarView";
import { useAnalytics, useAuth } from "@/contexts";
import {
  trackCalendarDateNavigated,
  trackCalendarViewChanged,
} from "@/lib/analytics/calendar";

type CalendarAnimationDirection = "next" | "prev" | "view" | null;

interface IProps {
  shouldOpenCreate?: boolean;
  onCreateHandled?: () => void;
  onReopenTutorial?: () => Promise<void>;
}

const CalendarView = ({
  shouldOpenCreate = false,
  onCreateHandled,
  onReopenTutorial,
}: IProps) => {
  const pathname = usePathname();

  const calendarRef = useRef<FullCalendar | null>(null);
  const animationTimeoutRef = useRef<number | null>(null);

  const [calendarTitle, setCalendarTitle] = useState("");
  const [isCalendarAnimating, setIsCalendarAnimating] = useState(false);
  const [calendarAnimationDirection, setCalendarAnimationDirection] =
    useState<CalendarAnimationDirection>(null);

  const { trackEvent } = useAnalytics();
  const { loggedUser, userCurrentPlan } = useAuth();

  const {
    modal,
    formModalBridge,
    selectedItem,
    dayItemsModalState,
    isSmallMobile,
    isMobile,
    isTablet,
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
    currentRange,
  } = useCalendarView();

  useEffect(() => {
    if (!shouldOpenCreate) return;

    handleOpenCreateModal("unknown");
    onCreateHandled?.();
  }, [handleOpenCreateModal, onCreateHandled, shouldOpenCreate]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        window.clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const finishCalendarAnimation = () => {
    if (animationTimeoutRef.current) {
      window.clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = window.setTimeout(() => {
      setIsCalendarAnimating(false);
      setCalendarAnimationDirection(null);
    }, 260);
  };

  const handleCalendarDatesSet = useCallback(
    async (dateInfo: DatesSetArg) => {
      setCalendarTitle(getCalendarToolbarTitle(dateInfo));
      await handleDatesSet(dateInfo);
      finishCalendarAnimation();
    },
    [handleDatesSet],
  );

  const startCalendarAnimation = (direction: CalendarAnimationDirection) => {
    setCalendarAnimationDirection(direction);
    setIsCalendarAnimating(true);
  };

  const handlePrevious = useCallback(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    trackCalendarDateNavigated(trackEvent, {
      path: pathname ?? "",
      userId: loggedUser?.id,
      planCode: userCurrentPlan?.currentPlan?.code ?? null,
      isFounder: loggedUser?.isFounder ?? undefined,
      direction: "prev",
      view: currentView,
      from: currentRange?.from,
      to: currentRange?.to,
    });

    startCalendarAnimation("prev");
    calendarApi.prev();
  }, [
    currentRange?.from,
    currentRange?.to,
    currentView,
    pathname,
    trackEvent,
    loggedUser?.id,
    loggedUser?.isFounder,
    userCurrentPlan?.currentPlan?.code,
  ]);

  const handleNext = useCallback(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    trackCalendarDateNavigated(trackEvent, {
      path: pathname ?? "",
      userId: loggedUser?.id,
      planCode: userCurrentPlan?.currentPlan?.code ?? null,
      isFounder: loggedUser?.isFounder ?? undefined,
      direction: "next",
      view: currentView,
      from: currentRange?.from,
      to: currentRange?.to,
    });

    startCalendarAnimation("next");
    calendarApi.next();
  }, [
    currentRange?.from,
    currentRange?.to,
    currentView,
    pathname,
    trackEvent,
    loggedUser?.id,
    loggedUser?.isFounder,
    userCurrentPlan?.currentPlan?.code,
  ]);

  const handleChangeView = (view: "dayGridWeek" | "dayGridMonth") => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    trackCalendarViewChanged(trackEvent, {
      path: pathname ?? "",
      userId: loggedUser?.id,
      planCode: userCurrentPlan?.currentPlan?.code ?? null,
      isFounder: loggedUser?.isFounder ?? undefined,
      view,
    });

    startCalendarAnimation("view");
    calendarApi.changeView(view);
  };

  const handleOpenCreateFromToolbar = () => {
    handleOpenCreateModal("toolbar");
  };

  const { swipeHandlers } = useCalendarSwipe({
    enabled: isMobile || isTablet,
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrevious,
  });

  return (
    <>
      <section className="calendar-wrapper w-full max-w-full select-none overflow-hidden">
        <div className="rounded-[28px] border border-gray-2 bg-light p-4 shadow-sm sm:p-5 lg:p-6">
          <CalendarToolbar
            title={calendarTitle}
            currentView={currentView}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onChangeView={handleChangeView}
            onOpenCreate={handleOpenCreateFromToolbar}
            onReopenTutorial={onReopenTutorial}
          />

          <div {...swipeHandlers}>
            <CalendarGrid
              calendarRef={calendarRef}
              currentView={currentView}
              isSmallMobile={isSmallMobile}
              isMobile={isMobile}
              isTablet={isTablet}
              isWeekCompact={isWeekCompact}
              isAnimating={isCalendarAnimating}
              animationDirection={calendarAnimationDirection}
              items={items}
              onDatesSet={handleCalendarDatesSet}
              onItemClick={handleItemClick}
              onAddItemByDate={handleAddItemByDate}
              onDateCellClick={handleCalendarDateInteraction}
              onOpenDayItemsModal={handleOpenDayItemsModal}
            />
          </div>
        </div>
      </section>

      <CalendarViewModals
        modal={modal}
        formModalBridge={formModalBridge}
        selectedItem={selectedItem}
        dayItemsModalState={dayItemsModalState}
        type={type}
        loading={loading}
        remainingSuggestions={planEntitlement?.remaining ?? undefined}
        hasPlatformError={Boolean(contentErrors.platform?.message)}
        hasAnyError={Object.values(errors).some(Boolean)}
        errors={errors}
        register={register}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        onClose={handleCloseModal}
        onTypeChange={handleTypeChange}
        onSecondaryAction={handleSecondaryAction}
        onDelete={handleDeleteCurrentItem}
        onAiSuggestion={handleAiSuggestionRequest}
        onEditItem={() => handleOpenEditModal()}
        onOpenDeleteModal={() => handleOpenDeleteModal()}
        onCloseDayItemsModal={handleCloseDayItemsModal}
        onSelectDayItem={handleSelectDayItem}
        onCreateItemForDay={handleCreateItemForDay}
      />

      {isPlansModalOpen && (
        <PlansModal
          isOpen={isPlansModalOpen}
          close={() => setIsPlansModalOpen(false)}
          usedFeature="CALENDAR_AI_SUGGESTIONS"
          allUIPlans={(allUIPlans || []).filter(
            ({ isCurrentPlan }) => !isCurrentPlan,
          )}
        />
      )}
    </>
  );
};

export default CalendarView;
