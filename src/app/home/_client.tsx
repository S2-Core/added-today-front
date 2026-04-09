"use client";

import { useState } from "react";

import CalendarView from "@/components/calendar/view";
import CalendarTutorial from "@/components/calendar/tutorial";
import Container from "@/components/container";
import Dashboards from "@/components/calendar/dashboards";
import NavigationTabs from "@/components/navigationTabs";
import useCalendarTutorial from "@/hooks/useCalendarTutorial";

const Client = () => {
  const [shouldOpenCreate, setShouldOpenCreate] = useState(false);

  const {
    isOpen,
    currentStep,
    currentStepIndex,
    totalSteps,
    next,
    complete,
    skip,
    reopen,
  } = useCalendarTutorial();

  return (
    <Container Tag="main" className="flex flex-col gap-6 my-5">
      <NavigationTabs subTitle="Sua agenda inteligente de conteúdos, campanhas e ganhos" />

      <div className="flex flex-col gap-10">
        <CalendarTutorial
          isOpen={isOpen}
          currentStep={currentStep}
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
          next={next}
          complete={complete}
          skip={skip}
          onFinish={() => setShouldOpenCreate(true)}
        />

        <CalendarView
          shouldOpenCreate={shouldOpenCreate}
          onCreateHandled={() => setShouldOpenCreate(false)}
          onReopenTutorial={reopen}
        />

        <Dashboards />
      </div>
    </Container>
  );
};

export default Client;
