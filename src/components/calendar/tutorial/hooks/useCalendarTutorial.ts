"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { calendarTutorialSteps } from "@/components/calendar/tutorial/tutorial.steps";
import { useAnalytics, useCalendar } from "@/contexts";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import completeCalendarTutorial from "@/services/calendar/completeTutorial.service";
import reopenCalendarTutorial from "@/services/calendar/reopenTutorial.service";

const useCalendarTutorial = () => {
  const { calendarState, handleFindCalendarState } = useCalendar();
  const { trackEvent } = useAnalytics();

  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const start = useCallback(() => {
    setIsOpen(true);
    setCurrentStepIndex(0);

    trackEvent(ANALYTICS_EVENTS.CALENDAR_TUTORIAL_STARTED, {
      step: 1,
      totalSteps: calendarTutorialSteps.length,
    });
  }, [trackEvent]);

  const next = useCallback(() => {
    setCurrentStepIndex((previousStepIndex) => {
      const nextStepIndex = Math.min(
        previousStepIndex + 1,
        calendarTutorialSteps.length - 1,
      );

      return nextStepIndex;
    });
  }, []);

  const complete = useCallback(async () => {
    try {
      await completeCalendarTutorial();

      setIsOpen(false);

      trackEvent(ANALYTICS_EVENTS.CALENDAR_TUTORIAL_COMPLETED, {
        totalSteps: calendarTutorialSteps.length,
      });

      await handleFindCalendarState();
    } catch (error) {
      toast.error("Ocorreu um erro ao concluir o tutorial.", {
        id: "calendar-tutorial-complete-error",
      });
    }
  }, [handleFindCalendarState, trackEvent]);

  const skip = useCallback(async () => {
    try {
      await completeCalendarTutorial();

      setIsOpen(false);

      trackEvent(ANALYTICS_EVENTS.CALENDAR_TUTORIAL_SKIPPED, {
        step: currentStepIndex + 1,
        totalSteps: calendarTutorialSteps.length,
      });

      await handleFindCalendarState();
    } catch (error) {
      toast.error("Ocorreu um erro ao pular o tutorial.", {
        id: "calendar-tutorial-skip-error",
      });
    }
  }, [currentStepIndex, handleFindCalendarState, trackEvent]);

  const reopen = useCallback(async () => {
    try {
      await reopenCalendarTutorial();

      trackEvent(ANALYTICS_EVENTS.CALENDAR_TUTORIAL_REOPENED, {
        totalSteps: calendarTutorialSteps.length,
      });

      start();
      await handleFindCalendarState();
    } catch (error) {
      toast.error("Ocorreu um erro ao reabrir o tutorial.", {
        id: "calendar-tutorial-reopen-error",
      });
    }
  }, [handleFindCalendarState, start, trackEvent]);

  useEffect(() => {
    if (!calendarState?.shouldShowTutorial) return;

    start();
  }, [calendarState?.shouldShowTutorial, start]);

  return {
    isOpen,
    currentStep: calendarTutorialSteps[currentStepIndex] ?? null,
    currentStepIndex,
    totalSteps: calendarTutorialSteps.length,
    next,
    complete,
    skip,
    reopen,
  };
};

export default useCalendarTutorial;
