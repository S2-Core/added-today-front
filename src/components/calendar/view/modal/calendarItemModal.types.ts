import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

import { CalendarFormValues } from "../../domain/form.mapper";

export interface ICalendarItemFormFieldsProps {
  type?: CalendarFormValues["type"];
  errors: FieldErrors<CalendarFormValues>;
  register: UseFormRegister<CalendarFormValues>;
  control: Control<CalendarFormValues>;
  onTypeChange: (nextType: CalendarFormValues["type"]) => void;
}
