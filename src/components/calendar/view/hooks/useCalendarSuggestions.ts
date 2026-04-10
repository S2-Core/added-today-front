import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

import {
  IAISuggestionWithRemaining,
  ICalendarState,
  ICreateContentCalendarItem,
} from "@/contexts/calendar/interfaces";
import { CalendarFormValues } from "@/components/calendar/domain/form.mapper";

interface IProps {
  type?: CalendarFormValues["type"];
  modal: "create" | object | null;
  calendarState: ICalendarState | null;
  aiSuggestion: IAISuggestionWithRemaining | null;
  setValue: UseFormSetValue<CalendarFormValues>;
}

const useCalendarSuggestions = ({
  type,
  modal,
  calendarState,
  aiSuggestion,
  setValue,
}: IProps) => {
  useEffect(() => {
    if (
      type === "CONTENT" &&
      calendarState?.shouldShowInitialAiSuggestion &&
      modal === "create"
    ) {
      setValue(
        "contentType",
        calendarState.initialAiSuggestion
          ?.contentType as ICreateContentCalendarItem["contentType"],
      );
      setValue(
        "platform",
        calendarState.initialAiSuggestion
          ?.platform as ICreateContentCalendarItem["platform"],
      );
      setValue("title", calendarState.initialAiSuggestion?.title || "");
      setValue(
        "description",
        calendarState.initialAiSuggestion?.description || "",
      );
      setValue("hook", calendarState.initialAiSuggestion?.hook || "");
    }
  }, [type, calendarState, modal, setValue]);

  useEffect(() => {
    if (type === "CONTENT" && aiSuggestion) {
      setValue(
        "contentType",
        aiSuggestion.contentType as ICreateContentCalendarItem["contentType"],
      );
      setValue(
        "platform",
        aiSuggestion.platform as ICreateContentCalendarItem["platform"],
      );
      setValue("title", aiSuggestion.title);
      setValue("description", aiSuggestion.description);
      setValue("hook", aiSuggestion.hook);
    }
  }, [type, aiSuggestion, setValue]);
};

export default useCalendarSuggestions;
