import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import FixedModal from "../fixedModal";
import Form from "../form";
import CalendarAiSuggestionActions from "./calendarAiSuggestionActions";
import CalendarItemFormFields from "./calendarItemFormFields";
import CalendarItemModalActions from "./calendarItemModalActions";

import { ICalendarItem } from "@/contexts/calendar/interfaces";
import { CalendarFormValues } from "./calendarForm.utils";

interface IProps {
  modal: "create" | ICalendarItem | null;
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
}

const CalendarItemModal = ({
  modal,
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
}: IProps) => {
  return (
    <FixedModal isOpen={!!modal} close={onClose}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-5xl flex-col gap-6"
      >
        <CalendarItemFormFields
          type={type}
          errors={errors}
          register={register}
          control={control}
          onTypeChange={onTypeChange}
        />

        {type === "CONTENT" && (
          <CalendarAiSuggestionActions
            loading={loading}
            remainingSuggestions={remainingSuggestions}
            hasPlatformError={hasPlatformError}
            onSuggest={onAiSuggestion}
          />
        )}

        <CalendarItemModalActions
          isCreateMode={modal === "create"}
          loading={loading}
          hasAnyError={hasAnyError}
          onSecondaryAction={onSecondaryAction}
          onDelete={onDelete}
        />
      </Form>
    </FixedModal>
  );
};

export default CalendarItemModal;
