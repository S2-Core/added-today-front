import {
  CampaignStatus,
  ContentPlatform,
  ContentStatus,
  ContentType,
  EarningStatus,
  EarningType,
} from "@/constants/calendar";
import { formatCurrency } from "@/utils/number.utils";

import {
  ICalendarDetailsSectionProps,
  ICalendarItemDetailsContentProps,
} from "./calendarItemModal.types";

const formatCalendarItemDate = (dateValue: string): string =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(dateValue));

const CalendarDetailsSection = ({
  label,
  value,
  valueClassName = "text-foreground",
}: ICalendarDetailsSectionProps) => {
  if (!value) return null;

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-foreground/50">
        {label}
      </span>

      <span className={["text-sm leading-6", valueClassName].join(" ")}>
        {value}
      </span>
    </div>
  );
};

const CalendarItemDetailsContent = ({
  item,
}: ICalendarItemDetailsContentProps) => {
  const formattedDate = formatCalendarItemDate(item.startsAt);

  if (item.type === "CONTENT") {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <CalendarDetailsSection label="Título" value={item.title} />
        <CalendarDetailsSection label="Dia" value={formattedDate} />
        <CalendarDetailsSection
          label="Tipo do conteúdo"
          value={ContentType[item.contentType]}
        />
        <CalendarDetailsSection
          label="Plataforma"
          value={ContentPlatform[item.platform]}
        />
        <CalendarDetailsSection
          label="Status"
          value={ContentStatus[item.status]}
        />
        <CalendarDetailsSection label="Hook" value={item.hook} />
        <div className="sm:col-span-2">
          <CalendarDetailsSection label="Descrição" value={item.description} />
        </div>
      </div>
    );
  }

  if (item.type === "CAMPAIGN") {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <CalendarDetailsSection label="Título" value={item.title} />
        <CalendarDetailsSection label="Dia" value={formattedDate} />
        <CalendarDetailsSection label="Marca" value={item.brand} />
        <CalendarDetailsSection
          label="Status"
          value={CampaignStatus[item.status]}
        />
        <div className="sm:col-span-2">
          <CalendarDetailsSection label="Descrição" value={item.description} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <CalendarDetailsSection label="Título" value={item.title} />
      <CalendarDetailsSection label="Dia" value={formattedDate} />
      <CalendarDetailsSection
        label="Tipo do ganho"
        value={EarningType[item.earningType]}
      />
      <CalendarDetailsSection label="Origem" value={item.sourceLabel} />
      <CalendarDetailsSection
        label="Status"
        value={EarningStatus[item.status]}
      />
      <CalendarDetailsSection
        label="Valor"
        value={formatCurrency(item.amountCents / 100, item.currency)}
        valueClassName="text-base font-bold text-success"
      />
    </div>
  );
};

export default CalendarItemDetailsContent;
