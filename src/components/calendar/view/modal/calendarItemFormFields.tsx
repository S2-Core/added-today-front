import {
  CalendarCampaignFields,
  CalendarCommonFields,
  CalendarContentFields,
  CalendarDescriptionField,
  CalendarEarningFields,
  CalendarStatusField,
} from "./calendarItemFormSections";
import { ICalendarItemFormFieldsProps } from "./calendarItemModal.types";

const CalendarItemFormFields = ({
  type,
  errors,
  register,
  control,
}: ICalendarItemFormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <CalendarCommonFields errors={errors} register={register} />

      <CalendarStatusField
        type={type}
        errors={errors}
        register={register}
        control={control}
      />

      {type === "CONTENT" ? (
        <CalendarContentFields
          errors={errors}
          register={register}
          control={control}
        />
      ) : type === "EARNING" ? (
        <CalendarEarningFields
          errors={errors}
          register={register}
          control={control}
        />
      ) : (
        <CalendarCampaignFields errors={errors} register={register} />
      )}

      <CalendarDescriptionField errors={errors} register={register} />
    </div>
  );
};

export default CalendarItemFormFields;
