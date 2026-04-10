"use client";

import { useState } from "react";
import { motion } from "motion/react";

import CalendarView from "@/components/calendar/view";
import CalendarTutorial from "@/components/calendar/tutorial";
import Container from "@/components/container";
import Dashboard from "@/components/calendar/dashboard";
import NavigationTabs from "@/components/navigationTabs";
import useCalendarTutorial from "@/components/calendar/tutorial/hooks/useCalendarTutorial";

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
    <Container Tag="main" className="my-5 flex flex-col gap-6">
      <NavigationTabs subTitle="Sua agenda inteligente de conteúdos, campanhas e ganhos" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex flex-col gap-10"
      >
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

        <Dashboard />
      </motion.div>
    </Container>
  );
};

export default Client;
