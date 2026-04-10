"use client";

import { useCallback, useEffect, useState } from "react";

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
    await completeCalendarTutorial();

    setIsOpen(false);

    trackEvent(ANALYTICS_EVENTS.CALENDAR_TUTORIAL_COMPLETED, {
      totalSteps: calendarTutorialSteps.length,
    });

    await handleFindCalendarState();
  }, [handleFindCalendarState, trackEvent]);

  const skip = useCallback(async () => {
    await completeCalendarTutorial();

    setIsOpen(false);

    trackEvent(ANALYTICS_EVENTS.CALENDAR_TUTORIAL_SKIPPED, {
      step: currentStepIndex + 1,
      totalSteps: calendarTutorialSteps.length,
    });

    await handleFindCalendarState();
  }, [currentStepIndex, handleFindCalendarState, trackEvent]);

  const reopen = useCallback(async () => {
    await reopenCalendarTutorial();

    trackEvent(ANALYTICS_EVENTS.CALENDAR_TUTORIAL_REOPENED, {
      totalSteps: calendarTutorialSteps.length,
    });

    start();
    await handleFindCalendarState();
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
