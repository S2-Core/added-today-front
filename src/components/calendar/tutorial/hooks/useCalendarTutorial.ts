"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

import { calendarTutorialSteps } from "@/components/calendar/tutorial/tutorial.steps";
import { useAnalytics, useAuth, useCalendar } from "@/contexts";
import {
  trackCalendarTutorialCompleted,
  trackCalendarTutorialReopened,
  trackCalendarTutorialSkipped,
  trackCalendarTutorialStarted,
} from "@/lib/analytics/calendar";
import completeCalendarTutorial from "@/services/calendar/completeTutorial.service";
import reopenCalendarTutorial from "@/services/calendar/reopenTutorial.service";

const useCalendarTutorial = () => {
  const pathname = usePathname();

  const { calendarState, handleFindCalendarState } = useCalendar();
  const { trackEvent } = useAnalytics();
  const { loggedUser, userCurrentPlan } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const analyticsBase = {
    path: pathname ?? "",
    userId: loggedUser?.id,
    planCode: userCurrentPlan?.currentPlan?.code ?? null,
    isFounder: loggedUser?.isFounder ?? undefined,
  };

  const start = useCallback(() => {
    setIsOpen(true);
    setCurrentStepIndex(0);

    trackCalendarTutorialStarted(trackEvent, {
      ...analyticsBase,
      step: 1,
      totalSteps: calendarTutorialSteps.length,
    });
  }, [analyticsBase, trackEvent]);

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

      trackCalendarTutorialCompleted(trackEvent, {
        ...analyticsBase,
        totalSteps: calendarTutorialSteps.length,
      });

      await handleFindCalendarState();
    } catch (error) {
      toast.error("Ocorreu um erro ao concluir o tutorial.", {
        id: "calendar-tutorial-complete-error",
      });
    }
  }, [analyticsBase, handleFindCalendarState, trackEvent]);

  const skip = useCallback(async () => {
    try {
      await completeCalendarTutorial();

      setIsOpen(false);

      trackCalendarTutorialSkipped(trackEvent, {
        ...analyticsBase,
        step: currentStepIndex + 1,
        totalSteps: calendarTutorialSteps.length,
      });

      await handleFindCalendarState();
    } catch (error) {
      toast.error("Ocorreu um erro ao pular o tutorial.", {
        id: "calendar-tutorial-skip-error",
      });
    }
  }, [analyticsBase, currentStepIndex, handleFindCalendarState, trackEvent]);

  const reopen = useCallback(async () => {
    try {
      await reopenCalendarTutorial();

      trackCalendarTutorialReopened(trackEvent, {
        ...analyticsBase,
        totalSteps: calendarTutorialSteps.length,
      });

      start();
      await handleFindCalendarState();
    } catch (error) {
      toast.error("Ocorreu um erro ao reabrir o tutorial.", {
        id: "calendar-tutorial-reopen-error",
      });
    }
  }, [analyticsBase, handleFindCalendarState, start, trackEvent]);

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
