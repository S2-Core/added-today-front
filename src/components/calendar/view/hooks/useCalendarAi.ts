import { FieldErrors, UseFormSetError } from "react-hook-form";

import { useAuth, useCalendar } from "@/contexts";
import { ICreateContentCalendarItem } from "@/contexts/calendar/interfaces";

import { CalendarFormValues } from "@/components/calendar/domain/form.mapper";

interface IProps {
  errors: FieldErrors<CalendarFormValues>;
  platform?: ICreateContentCalendarItem["platform"];
  setError: UseFormSetError<CalendarFormValues>;
}

const useCalendarAi = ({ errors, platform, setError }: IProps) => {
  const { handleAiSuggestion } = useCalendar();
  const { userCurrentPlan, handleFindUserCurrentPlan } = useAuth();

  const contentErrors = errors as Partial<
    Record<keyof ICreateContentCalendarItem, { message?: string }>
  >;

  const planEntitlement = userCurrentPlan?.entitlements.find(
    ({ key }) => key === "CALENDAR_AI_SUGGESTIONS",
  );

  const handleAiSuggestionRequest = async (
    openPlansModal: () => void,
  ): Promise<void> => {
    if (planEntitlement?.remaining === 0) {
      openPlansModal();
      return;
    }

    if (!platform) {
      setError("platform", { message: "Escolha uma plataforma" });
      return;
    }

    await handleAiSuggestion({
      platform,
      referenceDate: new Date().toISOString(),
    });

    await handleFindUserCurrentPlan();
  };

  return {
    contentErrors,
    planEntitlement,
    handleAiSuggestionRequest,
  };
};

export default useCalendarAi;
