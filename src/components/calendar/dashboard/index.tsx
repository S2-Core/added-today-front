"use client";

import { useCalendar } from "@/contexts";

import DashboardHeader from "./dashboardHeader";
import DashboardAverageTicketCard from "./cards/dashboardAverageTicketCard";
import DashboardCampaignsCard from "./cards/dashboardCampaignsCard";
import DashboardContentsCard from "./cards/dashboardContentsCard";
import DashboardEarningsCard from "./cards/dashboardEarningsCard";
import DashboardGrowthCard from "./cards/dashboardGrowthCard";
import DashboardPlatformsCard from "./cards/dashboardPlatformsCard";
import {
  formatDashboardPeriodLabel,
  getMostUsedPlatform,
} from "./dashboardValue.utils";

const Dashboard = () => {
  const { dashboardData } = useCalendar();

  if (!dashboardData) return null;

  const {
    from,
    to,
    contentsCount,
    contentsByType,
    contentsByPlatform,
    earningsAmountCents,
    currency,
    campaignsCount,
    comparison,
    averageEarningPerPubliCents,
  } = dashboardData;

  const { contentGrowthPercent, earningsGrowthPercent } = comparison;

  const mostUsedPlatform = getMostUsedPlatform(contentsByPlatform);
  const dashboardPeriodLabel = formatDashboardPeriodLabel(from, to);

  return (
    <section className="flex select-none flex-col gap-5">
      <DashboardHeader periodLabel={dashboardPeriodLabel} />

      <ul
        key={`${from}-${to}`}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
      >
        <DashboardContentsCard
          contentsCount={contentsCount}
          contentsByType={contentsByType}
          index={0}
        />

        <DashboardPlatformsCard
          contentsCount={contentsCount}
          contentsByPlatform={contentsByPlatform}
          mostUsedPlatform={mostUsedPlatform}
          index={1}
        />

        <DashboardEarningsCard
          earningsAmountCents={earningsAmountCents}
          currency={currency}
          index={2}
        />

        <DashboardCampaignsCard campaignsCount={campaignsCount} index={3} />

        <DashboardGrowthCard
          contentGrowthPercent={contentGrowthPercent}
          earningsGrowthPercent={earningsGrowthPercent}
          index={4}
        />

        <DashboardAverageTicketCard
          averageEarningPerPubliCents={averageEarningPerPubliCents}
          currency={currency}
          index={5}
        />
      </ul>
    </section>
  );
};

export default Dashboard;
