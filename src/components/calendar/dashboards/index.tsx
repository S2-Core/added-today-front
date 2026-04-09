"use client";

import { BsCameraVideo } from "react-icons/bs";
import { FiDollarSign, FiTarget } from "react-icons/fi";
import {
  FaInstagram,
  FaLinkedinIn,
  FaRegChartBar,
  FaTiktok,
} from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { MdContentCut } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";

import { useCalendar } from "@/contexts";
import { formatCurrency } from "@/utils/number.utils";
import { ContentPlatform, ContentType } from "@/constants/calendar";

const Dashboards = () => {
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

  const totalEarnings = earningsAmountCents / 100;
  const averageEarningPerPubli = averageEarningPerPubliCents / 100;

  const mostUsedPlatform = contentsByPlatform.reduce(
    (prev, current) => (current.count > prev.count ? current : prev),
    {
      count: 0,
      platform: "OTHER",
    },
  ).platform;

  return (
    <section className="flex flex-col gap-5 select-none">
      <h2 className="font-bold text-2xl">Seu desempenho</h2>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        <li className="flex flex-col gap-6 rounded-xl border border-foreground/30 p-5 shadow-md">
          <div className="flex w-full justify-center lg:justify-start">
            <div className="w-fit rounded-xl bg-blue-500/30 p-3 font-bold text-blue-500">
              <BsCameraVideo size={25} />
            </div>
          </div>

          <span
            className={[
              "text-center text-lg lg:text-start",
              contentsCount ? "font-bold" : "",
            ].join(" ")}
          >
            {contentsCount
              ? `${contentsCount} ${contentsCount === 1 ? "conteúdo" : "conteúdos"}`
              : "Nenhum conteúdo no momento"}
          </span>

          {!!contentsByType.length && (
            <span className="text-center text-sm text-foreground/70 lg:text-start">
              {contentsByType.map(({ contentType, count }, i) => (
                <span
                  key={`${contentType}-${i}`}
                >{`${count} ${ContentType[contentType]}${i !== contentsByType.length - 1 ? " | " : ""}`}</span>
              ))}
            </span>
          )}
        </li>

        <li className="flex flex-col gap-6 rounded-xl border border-foreground/30 p-5 shadow-md">
          <div className="flex w-full justify-center lg:justify-start">
            <div className="w-fit rounded-xl bg-purple-500/30 p-3 font-bold text-purple-500">
              {mostUsedPlatform === "INSTAGRAM" ? (
                <FaInstagram size={25} />
              ) : mostUsedPlatform === "YOUTUBE" ? (
                <AiOutlineYoutube size={25} />
              ) : mostUsedPlatform === "LINKEDIN" ? (
                <FaLinkedinIn size={25} />
              ) : mostUsedPlatform === "TIKTOK" ? (
                <FaTiktok size={25} />
              ) : (
                <MdContentCut size={25} />
              )}
            </div>
          </div>

          <span className="text-center text-lg lg:text-start">
            {contentsCount ? "Por plataforma" : "Nenhum conteúdo no momento"}
          </span>

          {!!contentsByPlatform.length && (
            <div className="flex flex-col gap-2">
              {contentsByPlatform.map(({ platform, count }, i) => (
                <div
                  key={`${platform}-${count}-${i}`}
                  className="flex w-full items-center justify-between"
                >
                  <span className="text-foreground/70">
                    {ContentPlatform[platform]}
                  </span>

                  <span className="font-bold">
                    {`${count} ${count === 1 ? "conteúdo" : "conteúdos"}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </li>

        <li className="flex flex-col gap-6 rounded-xl border border-foreground/30 bg-success-light/20 p-5 shadow-md">
          <div className="flex w-full justify-center lg:justify-start">
            <div className="w-fit rounded-xl bg-success-light/30 p-3 font-bold text-success">
              <FiDollarSign size={25} />
            </div>
          </div>

          <span className="text-center text-sm font-bold text-success lg:text-start">
            Ganhos totais
          </span>

          <span className="text-center text-2xl font-bold text-success lg:text-start">
            {formatCurrency(totalEarnings, currency)}
          </span>
        </li>

        <li className="flex flex-col gap-6 rounded-xl border border-foreground/30 p-5 shadow-md">
          <div className="flex w-full justify-center lg:justify-start">
            <div className="w-fit rounded-xl bg-blue-700/30 p-3 font-bold text-blue-700">
              <FiTarget size={25} />
            </div>
          </div>

          <span
            className={[
              "text-center text-lg lg:text-start",
              campaignsCount ? "font-bold" : "",
            ].join(" ")}
          >
            {campaignsCount
              ? `${campaignsCount} ${campaignsCount === 1 ? "campanha" : "campanhas"}`
              : "Nenhuma campanha no momento"}
          </span>

          {!!campaignsCount && (
            <span className="text-center text-sm text-foreground/70 lg:text-start">
              Ativas no mês
            </span>
          )}
        </li>

        <li className="flex flex-col gap-6 rounded-xl border border-foreground/30 p-5 shadow-md">
          <div className="flex w-full justify-center lg:justify-start">
            <div className="w-fit rounded-xl bg-error/30 p-3 font-bold text-error">
              <FaArrowTrendUp size={25} />
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-5">
            <div className="flex flex-col items-center gap-1">
              <span className="text-center text-xl font-bold lg:text-start">{`${contentGrowthPercent ? "+" : ""}${(contentGrowthPercent || 0).toFixed(2).replace(".", ",")}%`}</span>

              <span className="text-xs text-foreground/50">Conteúdos</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-center text-xl font-bold lg:text-start">{`${earningsGrowthPercent ? "+" : ""}${(earningsGrowthPercent || 0).toFixed(2).replace(".", ",")}%`}</span>

              <span className="text-xs text-foreground/50">Ganhos</span>
            </div>
          </div>

          <span className="text-center text-sm text-foreground/70 lg:text-start">
            Crescimento semanal
          </span>
        </li>

        <li className="flex flex-col gap-6 rounded-xl border border-foreground/30 p-5 shadow-md">
          <div className="flex w-full justify-center lg:justify-start">
            <div className="w-fit rounded-xl bg-warning/30 p-3 font-bold text-warning">
              <FaRegChartBar size={25} />
            </div>
          </div>

          <span className="text-center text-2xl font-bold lg:text-start">
            {formatCurrency(averageEarningPerPubli, currency)}
          </span>

          <span className="text-center text-sm text-foreground/70 lg:text-start">
            Ticket médio por publi
          </span>
        </li>
      </ul>
    </section>
  );
};

export default Dashboards;
