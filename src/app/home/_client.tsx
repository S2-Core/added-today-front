"use client";

import CalendarView from "@/components/calendarView";
import CalendarTutorial from "@/components/calendarTutorial";
import Container from "@/components/container";
import Dashboards from "@/components/dashboards";
import NavigationTabs from "@/components/navigationTabs";

const Client = () => {
  return (
    <Container Tag="main" className="flex flex-col gap-6 my-5">
      <NavigationTabs subTitle="Sua agenda inteligente de conteúdos, campanhas e ganhos" />

      <div className="flex flex-col gap-10">
        <CalendarTutorial />

        <CalendarView />

        <Dashboards />
      </div>
    </Container>
  );
};

export default Client;
