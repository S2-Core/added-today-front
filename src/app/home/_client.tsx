"use client";

import Container from "@/components/container";
import NavigationTabs from "@/components/navigationTabs";
import CalendarView from "@/components/calendarView";
import Dashboards from "@/components/dashboards";

const Client = () => {
  return (
    <Container Tag="main" className="flex flex-col gap-6 my-5">
      <NavigationTabs subTitle="Sua agenda inteligente de conteúdos, campanhas e ganhos" />

      <div className="flex flex-col gap-10">
        <CalendarView />

        <Dashboards />
      </div>
    </Container>
  );
};

export default Client;
