import Form from "../../../form";
import FixedModal from "../../../fixedModal";

import CalendarAiSuggestionActions from "./calendarAiSuggestionActions";
import CalendarItemFormFields from "./calendarItemFormFields";
import CalendarItemModalActions from "./calendarItemModalActions";
import CalendarItemModalHeader from "./calendarItemModalHeader";
import { ICalendarItemModalProps } from "./calendarItemModal.types";

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
}: ICalendarItemModalProps) => {
  const isCreateMode = modal === "create";
  const shouldShowAiActions = type === "CONTENT";

  return (
    <FixedModal
      isOpen={!!modal}
      close={onClose}
      size="64rem"
      contentClassName="gap-6 p-5 sm:p-6"
      panelClassName="rounded-[28px]"
    >
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-6"
      >
        <CalendarItemModalHeader
          type={type}
          isCreateMode={isCreateMode}
          onTypeChange={onTypeChange}
        />

        <CalendarItemFormFields
          type={type}
          errors={errors}
          register={register}
          control={control}
        />

        {shouldShowAiActions && (
          <CalendarAiSuggestionActions
            loading={loading}
            remainingSuggestions={remainingSuggestions}
            hasPlatformError={hasPlatformError}
            onSuggest={onAiSuggestion}
          />
        )}

        <CalendarItemModalActions
          isCreateMode={isCreateMode}
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
