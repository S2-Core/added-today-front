import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import {
  ICalendarItem,
  ICampaignCalendarItem,
  IContentCalendarItem,
  IEarningCalendarItem,
} from "@/contexts/calendar/interfaces";
import { CalendarFormValues } from "../../domain/form.mapper";

export interface ICalendarItemFormFieldsProps {
  type?: CalendarFormValues["type"];
  errors: FieldErrors<CalendarFormValues>;
  register: UseFormRegister<CalendarFormValues>;
  control: Control<CalendarFormValues>;
}

export interface ICalendarItemModalProps {
  modal: "create" | ICalendarItem | null;
  type?: CalendarFormValues["type"];
  loading: boolean;
  remainingSuggestions?: number | null;
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

export interface ICalendarItemModalHeaderProps {
  type?: CalendarFormValues["type"];
  isCreateMode: boolean;
  onTypeChange: (nextType: CalendarFormValues["type"]) => void;
}

export interface ICalendarItemDetailsModalProps {
  item: ICalendarItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export interface ICalendarDeleteConfirmModalProps {
  item: ICalendarItem | null;
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export interface ICalendarItemDetailsContentProps {
  item: ICalendarItem;
}

export interface ICalendarItemDetailsActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export interface ICalendarDetailsSectionProps {
  label: string;
  value?: string | null;
  valueClassName?: string;
}

export type CalendarDetailsItem =
  | IContentCalendarItem
  | ICampaignCalendarItem
  | IEarningCalendarItem;
