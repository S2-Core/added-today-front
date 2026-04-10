"use client";

import { useCalendar } from "@/contexts";
import { ContentPlatform, ContentType } from "@/constants/calendar";

import DashboardCard from "./dashboardCard";
import {
  getAverageTicketCardIcon,
  getCampaignsCardIcon,
  getContentCardIcon,
  getEarningsCardIcon,
  getGrowthCardIcon,
  getPlatformCardIcon,
} from "./dashboardIcon.utils";
import {
  formatCountLabel,
  formatDashboardCurrencyFromCents,
  formatGrowthPercentage,
  getMostUsedPlatform,
} from "./dashboardValue.utils";

const Dashboard = () => {
  const { dashboardData } = useCalendar();

  if (!dashboardData) return null;

  const {
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

  return (
    <section className="flex flex-col gap-5 select-none">
      <h2 className="font-bold text-2xl">Seu desempenho</h2>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        <DashboardCard
          icon={getContentCardIcon()}
          iconContainerClassName="bg-blue-500/30 text-blue-500"
        >
          <span
            className={[
              "text-center text-lg lg:text-start",
              contentsCount ? "font-bold" : "",
            ].join(" ")}
          >
            {contentsCount
              ? formatCountLabel(contentsCount, "conteúdo", "conteúdos")
              : "Nenhum conteúdo no momento"}
          </span>

          {!!contentsByType.length && (
            <span className="text-center text-sm text-foreground/70 lg:text-start">
              {contentsByType.map(({ contentType, count }, index) => (
                <span
                  key={`${contentType}-${index}`}
                >{`${count} ${ContentType[contentType]}${index !== contentsByType.length - 1 ? " | " : ""}`}</span>
              ))}
            </span>
          )}
        </DashboardCard>

        <DashboardCard
          icon={getPlatformCardIcon(mostUsedPlatform)}
          iconContainerClassName="bg-purple-500/30 text-purple-500"
        >
          <span className="text-center text-lg lg:text-start">
            {contentsCount ? "Por plataforma" : "Nenhum conteúdo no momento"}
          </span>

          {!!contentsByPlatform.length && (
            <div className="flex flex-col gap-2">
              {contentsByPlatform.map(({ platform, count }, index) => (
                <div
                  key={`${platform}-${count}-${index}`}
                  className="flex w-full items-center justify-between"
                >
                  <span className="text-foreground/70">
                    {ContentPlatform[platform]}
                  </span>

                  <span className="font-bold">
                    {formatCountLabel(count, "conteúdo", "conteúdos")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </DashboardCard>

        <DashboardCard
          icon={getEarningsCardIcon()}
          iconContainerClassName="bg-success-light/30 text-success"
          accentClassName="bg-success-light/20"
        >
          <span className="text-center text-sm font-bold text-success lg:text-start">
            Ganhos totais
          </span>

          <span className="text-center text-2xl font-bold text-success lg:text-start">
            {formatDashboardCurrencyFromCents(earningsAmountCents, currency)}
          </span>
        </DashboardCard>

        <DashboardCard
          icon={getCampaignsCardIcon()}
          iconContainerClassName="bg-blue-700/30 text-blue-700"
        >
          <span
            className={[
              "text-center text-lg lg:text-start",
              campaignsCount ? "font-bold" : "",
            ].join(" ")}
          >
            {campaignsCount
              ? formatCountLabel(campaignsCount, "campanha", "campanhas")
              : "Nenhuma campanha no momento"}
          </span>

          {!!campaignsCount && (
            <span className="text-center text-sm text-foreground/70 lg:text-start">
              Ativas no mês
            </span>
          )}
        </DashboardCard>

        <DashboardCard
          icon={getGrowthCardIcon()}
          iconContainerClassName="bg-error/30 text-error"
        >
          <div className="grid w-full grid-cols-2 gap-5">
            <div className="flex flex-col items-center gap-1">
              <span className="text-center text-xl font-bold lg:text-start">
                {formatGrowthPercentage(contentGrowthPercent)}
              </span>

              <span className="text-xs text-foreground/50">Conteúdos</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-center text-xl font-bold lg:text-start">
                {formatGrowthPercentage(earningsGrowthPercent)}
              </span>

              <span className="text-xs text-foreground/50">Ganhos</span>
            </div>
          </div>

          <span className="text-center text-sm text-foreground/70 lg:text-start">
            Crescimento semanal
          </span>
        </DashboardCard>

        <DashboardCard
          icon={getAverageTicketCardIcon()}
          iconContainerClassName="bg-warning/30 text-warning"
        >
          <span className="text-center text-2xl font-bold lg:text-start">
            {formatDashboardCurrencyFromCents(
              averageEarningPerPubliCents,
              currency,
            )}
          </span>

          <span className="text-center text-sm text-foreground/70 lg:text-start">
            Ticket médio por publi
          </span>
        </DashboardCard>
      </ul>
    </section>
  );
};

export default Dashboard;
