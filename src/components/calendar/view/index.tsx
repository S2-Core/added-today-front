"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { DatesSetArg } from "@fullcalendar/core/index.js";

import PlansModal from "../../plansModal";
import CalendarItemModal from "./modal/calendarItemModal";
import CalendarToolbar from "./calendarToolbar";
import { getCalendarToolbarTitle } from "./utils/calendarViewTitle.utils";
import useCalendarView from "./useCalendarView";
import CalendarGrid from "./components/calendarGrid";

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
  const calendarRef = useRef<FullCalendar | null>(null);
  const [calendarTitle, setCalendarTitle] = useState("");

  const {
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
  } = useCalendarView();

  useEffect(() => {
    if (!shouldOpenCreate) return;

    handleOpenCreateModal();
    onCreateHandled?.();
  }, [handleOpenCreateModal, onCreateHandled, shouldOpenCreate]);

  const handleCalendarDatesSet = useCallback(
    async (dateInfo: DatesSetArg) => {
      setCalendarTitle(getCalendarToolbarTitle(dateInfo));
      await handleDatesSet(dateInfo);
    },
    [handleDatesSet],
  );

  const handlePrevious = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    calendarApi.prev();
  };

  const handleNext = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    calendarApi.next();
  };

  const handleChangeView = (view: "dayGridWeek" | "dayGridMonth") => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    calendarApi.changeView(view);
  };

  return (
    <>
      <section className="calendar-wrapper w-full max-w-full select-none">
        <div className="rounded-[28px] border border-gray-2 bg-light p-5 shadow-sm">
          <CalendarToolbar
            title={calendarTitle}
            currentView={currentView}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onChangeView={handleChangeView}
            onOpenCreate={() => handleOpenCreateModal()}
            onReopenTutorial={onReopenTutorial}
          />

          <CalendarGrid
            calendarRef={calendarRef}
            currentView={currentView}
            isMobile={isMobile}
            items={items}
            onDatesSet={handleCalendarDatesSet}
            onItemClick={handleItemClick}
            onAddItemByDate={handleAddItemByDate}
          />
        </div>
      </section>

      <CalendarItemModal
        modal={modal}
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
