"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

import PlansModal from "../plansModal";
import CalendarItemContent from "./calendarItemContent";
import CalendarItemModal from "./calendarItemModal";
import useCalendarView from "./useCalendarView";

import { ICalendarItem } from "@/contexts/calendar/interfaces";

const CalendarView = () => {
  const {
    modal,
    isMobile,
    isPlansModalOpen,
    setIsPlansModalOpen,
    items,
    loading,
    type,
    isAllDay,
    contentErrors,
    planEntitlement,
    allUIPlans,
    register,
    control,
    handleSubmit,
    errors,
    handleDatesSet,
    handleOpenCreateModal,
    handleItemClick,
    handleCloseModal,
    handleTypeChange,
    handleSecondaryAction,
    handleDeleteCurrentItem,
    handleAiSuggestionRequest,
    onSubmit,
  } = useCalendarView();

  return (
    <>
      <section className="w-full max-w-full overflow-x-auto select-none calendar-wrapper">
        <div className="flex justify-end mb-5 w-full">
          <button
            tabIndex={-1}
            type="button"
            onClick={handleOpenCreateModal}
            className="bg-primary/70 hover:bg-primary active:bg-primary/70 px-4 py-2 rounded font-bold text-light transition-all duration-300 cursor-pointer"
          >
            Adicionar atividade
          </button>
        </div>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "timeGridWeek,dayGridMonth",
          }}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          eventClassNames="cursor-pointer"
          eventColor="transparent"
          eventClick={({ event }) => {
            handleItemClick({
              ...(event.extendedProps as ICalendarItem),
              id: event.id,
              title: event.title,
            });
          }}
          slotMinTime="00:00:00"
          slotMaxTime="24:00:00"
          timeZone="America/Sao_Paulo"
          events={items ?? []}
          eventContent={(eventInfo) => (
            <CalendarItemContent eventInfo={eventInfo} />
          )}
          height="55rem"
          locale={ptBrLocale}
          allDayContent={({ text }) => (
            <p className="font-bold text-center">{text}</p>
          )}
          dayMaxEvents={isMobile ? 1 : 2}
          datesSet={handleDatesSet}
        />
      </section>

      <CalendarItemModal
        modal={modal}
        type={type}
        isAllDay={Boolean(isAllDay)}
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
