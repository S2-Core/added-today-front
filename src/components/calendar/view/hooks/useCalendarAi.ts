import { FieldErrors, UseFormSetError } from "react-hook-form";
import { usePathname } from "next/navigation";

import { useAnalytics, useAuth, useCalendar } from "@/contexts";
import { ICreateContentCalendarItem } from "@/contexts/calendar/interfaces";
import {
  trackCalendarAiBlockedByLimit,
  trackCalendarAiClicked,
  trackCalendarAiSuggestionRequested,
} from "@/lib/analytics/calendar";

import { CalendarFormValues } from "@/components/calendar/domain/form.mapper";

interface IProps {
  errors: FieldErrors<CalendarFormValues>;
  platform?: ICreateContentCalendarItem["platform"];
  setError: UseFormSetError<CalendarFormValues>;
}

const useCalendarAi = ({ errors, platform, setError }: IProps) => {
  const pathname = usePathname();

  const { trackEvent } = useAnalytics();
  const { loggedUser, userCurrentPlan, handleFindUserCurrentPlan } = useAuth();
  const { handleAiSuggestion } = useCalendar();

  const contentErrors = errors as Partial<
    Record<keyof ICreateContentCalendarItem, { message?: string }>
  >;

  const planEntitlement = userCurrentPlan?.entitlements.find(
    ({ key }) => key === "CALENDAR_AI_SUGGESTIONS",
  );

  const analyticsBase = {
    path: pathname ?? "",
    userId: loggedUser?.id,
    planCode: userCurrentPlan?.currentPlan?.code ?? null,
    isFounder: loggedUser?.isFounder ?? undefined,
  };

  const handleAiSuggestionRequest = async (
    openPlansModal: () => void,
  ): Promise<void> => {
    trackCalendarAiClicked(trackEvent, {
      ...analyticsBase,
      platform,
      remaining: planEntitlement?.remaining ?? undefined,
    });

    if (planEntitlement?.remaining === 0) {
      trackCalendarAiBlockedByLimit(trackEvent, {
        ...analyticsBase,
        platform,
        remaining: planEntitlement.remaining ?? undefined,
      });

      openPlansModal();
      return;
    }

    if (!platform) {
      setError("platform", { message: "Escolha uma plataforma" });
      return;
    }

    trackCalendarAiSuggestionRequested(trackEvent, {
      ...analyticsBase,
      platform,
      remaining: planEntitlement?.remaining ?? undefined,
    });

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
