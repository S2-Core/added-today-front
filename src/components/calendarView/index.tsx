"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { DatesSetArg } from "@fullcalendar/core/index.js";
import { FiPlus } from "react-icons/fi";

import PlansModal from "../plansModal";
import CalendarItemContent from "./calendarItemContent";
import CalendarItemModal from "./calendarItemModal";
import CalendarToolbar from "./calendarToolbar";
import {
  formatUtcDateKey,
  formatUtcDayLabel,
  formatUtcDayMonthLabel,
  isSameUtcDay,
} from "./calendarToday.utils";
import { getCalendarToolbarTitle } from "./calendarViewTitle.utils";
import useCalendarView from "./useCalendarView";

import { ICalendarItem } from "@/contexts/calendar/interfaces";

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

          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridWeek"
            headerToolbar={false}
            firstDay={1}
            eventClassNames="cursor-pointer"
            eventColor="transparent"
            displayEventTime={false}
            eventClick={({ event }) => {
              handleItemClick({
                ...(event.extendedProps as ICalendarItem),
                id: event.id,
                title: event.title,
              });
            }}
            dateClick={({ date }) => {
              handleAddItemByDate(date);
            }}
            dayHeaderContent={(headerInfo) => {
              const headerDate = headerInfo.date;
              const weekdayLabel = formatUtcDayLabel(headerDate);
              const dateLabel = formatUtcDayMonthLabel(headerDate);
              const normalizedDate = formatUtcDateKey(headerDate);
              const isToday = isSameUtcDay(headerDate, new Date());

              if (currentView !== "dayGridWeek") {
                return (
                  <div className="py-2 text-center">
                    <span className="text-xs font-semibold uppercase text-gray-8">
                      {weekdayLabel}
                    </span>
                  </div>
                );
              }

              return (
                <div className="flex min-h-24 flex-col items-start gap-3 p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold capitalize text-foreground">
                      {weekdayLabel}
                    </span>

                    <span
                      className={[
                        "rounded-full px-2.5 py-1 text-sm font-medium",
                        isToday
                          ? "bg-primary/15 text-primary"
                          : "bg-secondary/25 text-foreground",
                      ].join(" ")}
                    >
                      {dateLabel}
                    </span>
                  </div>

                  <button
                    tabIndex={-1}
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      handleAddItemByDate(headerDate);
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-secondary/18 px-3 py-2 text-sm font-medium text-primary transition-all duration-300 cursor-pointer hover:bg-secondary/28"
                  >
                    <FiPlus className="text-sm" />
                    <span>Adicionar</span>
                  </button>
                </div>
              );
            }}
            timeZone="UTC"
            events={items ?? []}
            eventContent={(eventInfo) => (
              <CalendarItemContent eventInfo={eventInfo} />
            )}
            height="55rem"
            locale={ptBrLocale}
            dayMaxEvents={isMobile ? 2 : 3}
            datesSet={handleCalendarDatesSet}
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
