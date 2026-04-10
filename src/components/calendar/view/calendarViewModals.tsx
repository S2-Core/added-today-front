import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import { ICalendarItem } from "@/contexts/calendar/interfaces";
import { CalendarFormValues } from "../domain/form.mapper";
import CalendarDayItemsModal from "./modal/calendarDayItemsModal";
import CalendarDeleteConfirmModal from "./modal/calendarDeleteConfirmModal";
import CalendarItemDetailsModal from "./modal/calendarItemDetailsModal";
import CalendarItemModal from "./modal/calendarItemModal";
import { CalendarModalState } from "./hooks/useCalendarModal";
import { ICalendarDayItemsModalState } from "./utils/calendarDayItems.utils";

interface IProps {
  modal: CalendarModalState;
  formModalBridge: "create" | ICalendarItem | null;
  selectedItem: ICalendarItem | null;
  dayItemsModalState: ICalendarDayItemsModalState | null;
  type?: CalendarFormValues["type"];
  loading: boolean;
  remainingSuggestions?: number;
  hasPlatformError: boolean;
  hasAnyError: boolean;
  errors: FieldErrors<CalendarFormValues>;
  register: UseFormRegister<CalendarFormValues>;
  control: Control<CalendarFormValues>;
  handleSubmit: UseFormHandleSubmit<CalendarFormValues, CalendarFormValues>;
  onSubmit: SubmitHandler<CalendarFormValues>;
  onClose: () => void;
  onTypeChange: (nextType: CalendarFormValues["type"]) => void;
  onSecondaryAction: () => void;
  onDelete: () => Promise<void>;
  onAiSuggestion: () => Promise<void>;
  onEditItem: () => void;
  onOpenDeleteModal: () => void;
  onCloseDayItemsModal: () => void;
  onSelectDayItem: (item: ICalendarItem) => void;
  onCreateItemForDay: (date: Date) => void;
}

const CalendarViewModals = ({
  modal,
  formModalBridge,
  selectedItem,
  dayItemsModalState,
  type,
  loading,
  remainingSuggestions,
  hasPlatformError,
  hasAnyError,
  errors,
  register,
  control,
  handleSubmit,
  onSubmit,
  onClose,
  onTypeChange,
  onSecondaryAction,
  onDelete,
  onAiSuggestion,
  onEditItem,
  onOpenDeleteModal,
  onCloseDayItemsModal,
  onSelectDayItem,
  onCreateItemForDay,
}: IProps) => {
  const isFormModalOpen = formModalBridge !== null;

  return (
    <>
      {isFormModalOpen && (
        <CalendarItemModal
          modal={formModalBridge}
          type={type}
          loading={loading}
          remainingSuggestions={remainingSuggestions}
          hasPlatformError={hasPlatformError}
          hasAnyError={hasAnyError}
          errors={errors}
          register={register}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          onClose={onClose}
          onTypeChange={onTypeChange}
          onSecondaryAction={onSecondaryAction}
          onDelete={onDelete}
          onAiSuggestion={onAiSuggestion}
        />
      )}

      <CalendarDayItemsModal
        isOpen={!!dayItemsModalState}
        date={dayItemsModalState?.date ?? null}
        items={dayItemsModalState?.items ?? []}
        onClose={onCloseDayItemsModal}
        onSelectItem={onSelectDayItem}
        onCreateItem={onCreateItemForDay}
      />

      <CalendarItemDetailsModal
        item={modal?.mode === "details" ? selectedItem : null}
        isOpen={modal?.mode === "details"}
        onClose={onClose}
        onEdit={onEditItem}
        onDelete={onOpenDeleteModal}
      />

      <CalendarDeleteConfirmModal
        item={modal?.mode === "delete" ? selectedItem : null}
        isOpen={modal?.mode === "delete"}
        loading={loading}
        onClose={onClose}
        onConfirm={onDelete}
      />
    </>
  );
};

export default CalendarViewModals;
