"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { DatesSetArg, EventContentArg } from "@fullcalendar/core/index.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import currencyCodes from "currency-codes";

import { useCalendar } from "@/contexts";

import FixedModal from "../fixedModal";
import Form from "../form";
import Input from "../input";
import Select from "../select";
import Textarea from "../textarea";

import {
  formatCurrency,
  formatInputNumber,
  formatToDateTimeLocal,
} from "@/utils/number.utils";
import { captalize } from "@/utils/string.utils";

import {
  CampaignStatus,
  ContentPlatform,
  ContentStatus,
  ContentType,
  EarningStatus,
  EarningType,
  EventType,
} from "@/constants/calendar";

import { createCalendarSchema } from "@/validators/calendar/create.validator";

import {
  ICreateCampaignEvent,
  ICreateContentEvent,
  ICreateEarningEvent,
  IEvent,
} from "@/contexts/calendar/interfaces";

const CalendarView = () => {
  const [modal, setModal] = useState<"create" | IEvent | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const lastRangeRef = useRef<{
    start: number;
    end: number;
  } | null>(null);

  const initialView = useMemo(() => {
    return isMobile ? "timeGridWeek" : "dayGridMonth";
  }, [isMobile]);

  const {
    events,
    handleFindAllEvents,
    handleFindDashboard,
    handleFindCalendarState,
    calendarState,
    handleCalendarFirstAccess,
    handleCreateEvent,
    handleDeleteEvent,
    handleUpdateEvent,
  } = useCalendar();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    handleFindCalendarState();
  }, [events]);

  useEffect(() => {
    if (!!calendarState?.hasDemoItems) return;

    handleCalendarFirstAccess();
  }, [calendarState]);

  const handleDatesSet = async (dateInfo: DatesSetArg) => {
    const viewStart = new Date(dateInfo.start).getTime();
    const viewEnd = new Date(dateInfo.end).getTime();

    if (
      lastRangeRef.current &&
      viewStart >= lastRangeRef.current.start &&
      viewEnd <= lastRangeRef.current.end
    ) {
      return;
    }

    const baseDate = new Date(dateInfo.start);

    const start = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
    start.setDate(start.getDate() - 30);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(end.getDate() + 89);
    end.setHours(23, 59, 59, 999);

    lastRangeRef.current = {
      start: start.getTime(),
      end: end.getTime(),
    };

    await handleFindAllEvents(start.toISOString(), end.toISOString());
    await handleFindDashboard(start.toISOString(), end.toISOString());
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    const {
      event: { title, extendedProps: event },
    } = eventInfo;

    return (
      <div
        className={[
          "flex flex-col gap-1 p-2 overflow-hidden text-xs select-none duration-300 rounded-md transition-all",
          event.type === "CONTENT"
            ? "bg-primary/30 hover:bg-primary/50"
            : event.type === "CAMPAIGN"
              ? "bg-blue-500/30 hover:bg-blue-500/50"
              : "bg-success/30 hover:bg-success/50",
        ].join(" ")}
      >
        <span className="overflow-hidden font-semibold text-foreground text-ellipsis">
          {title}
        </span>

        {event.type === "CONTENT" && (
          <span className="w-full overflow-hidden text-foreground text-ellipsis">
            {`${ContentPlatform[event.platform as keyof typeof ContentPlatform]} • ${ContentStatus[event.status as keyof typeof ContentStatus]}`}
          </span>
        )}

        {event.type === "CAMPAIGN" && (
          <span className="w-full overflow-hidden text-foreground text-ellipsis">
            {`${event.brand} • ${CampaignStatus[event.status as keyof typeof CampaignStatus] ?? ""}`}
          </span>
        )}

        {event.type === "EARNING" && (
          <span className="w-full overflow-hidden font-semibold text-success text-ellipsis">
            {formatCurrency(event.amountCents / 100, event.currency)}
          </span>
        )}
      </div>
    );
  };

  const onSubmit = async (
    data: ICreateContentEvent | ICreateCampaignEvent | ICreateEarningEvent,
  ) => {
    const formattedData = data;

    if (formattedData.endsAt === "Invalid Date") formattedData.endsAt = "";

    formattedData.startsAt = new Date(formattedData.startsAt).toISOString();
    if (formattedData.endsAt)
      formattedData.endsAt = new Date(formattedData.endsAt).toISOString();
    if ((formattedData as any).amountCents)
      (formattedData as any).amountCents =
        (formattedData as any).amountCents.replace(/\D/g, "") * 100;

    const filteredData = Object.fromEntries(
      Object.entries(formattedData).filter(([_, value]) => !!value),
    );

    if (modal === "create") {
      await handleCreateEvent(filteredData as any);

      setModal(null);

      reset({
        type: type as any,
        title: "",
        startsAt: "",
        endsAt: "",
        isAllDay: false,
        status: undefined,
        description: "",
        contentType: "",
        platform: "",
        earningType: "",
        amountCents: "",
        currency: "",
        source: "",
        brand: "",
      } as any);

      if (!lastRangeRef.current) return;

      const start = new Date(lastRangeRef.current.start).toISOString();
      const end = new Date(lastRangeRef.current.end).toISOString();

      await handleFindAllEvents(start, end);
      await handleFindDashboard(start, end);

      return;
    }

    await handleUpdateEvent(modal!.id, formattedData as any);

    setModal(null);

    reset({
      type: type as any,
      title: "",
      startsAt: "",
      endsAt: "",
      isAllDay: false,
      status: undefined,
      description: "",
      contentType: "",
      platform: "",
      earningType: "",
      amountCents: "",
      currency: "",
      source: "",
      brand: "",
    } as any);

    if (!lastRangeRef.current) return;

    const start = new Date(lastRangeRef.current.start).toISOString();
    const end = new Date(lastRangeRef.current.end).toISOString();

    await handleFindAllEvents(start, end);
    await handleFindDashboard(start, end);
  };

  const {
    register,
    reset,
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateContentEvent | ICreateCampaignEvent | ICreateEarningEvent>(
    {
      mode: "onChange",
      resolver: yupResolver(createCalendarSchema),
      shouldUnregister: false,
    },
  );

  const type = watch("type");
  const isAllDay = watch("isAllDay");

  return (
    <>
      <section className="w-full max-w-full overflow-x-auto select-none calendar-wrapper">
        <div className="flex justify-end mb-5 w-full">
          <button
            tabIndex={-1}
            type="button"
            onClick={() => {
              setModal("create");
              setValue("type", "CONTENT");
            }}
            className="bg-primary/70 hover:bg-primary active:bg-primary/70 px-4 py-2 rounded font-bold text-light transition-all duration-300 cursor-pointer"
          >
            Criar evento
          </button>
        </div>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={initialView}
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek",
          }}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          eventClassNames="cursor-pointer"
          eventColor="transparent"
          eventClick={({
            event: { id, allDay, start, end, title, extendedProps },
          }) => {
            setModal({ ...(extendedProps as IEvent), id, title });

            reset({
              type: extendedProps.type,
              title: title,
              startsAt: start
                ? !allDay
                  ? formatToDateTimeLocal(start!)
                  : start?.toISOString().split("T")[0]
                : "",
              endsAt: end
                ? !allDay
                  ? formatToDateTimeLocal(end)
                  : end.toISOString().split("T")[0]
                : null,
              isAllDay: allDay,
              status: extendedProps.status,
              description: extendedProps.description || "",
              contentType: extendedProps.contentType || "",
              platform: extendedProps.platform || "",
              earningType: extendedProps.earningType || "",
              amountCents:
                (formatInputNumber(extendedProps.amountCents / 100) as any) ||
                "",
              currency: extendedProps.currency || "",
              source: extendedProps.sourceLabel || "",
              brand: extendedProps.brand || "",
            });
          }}
          slotMinTime="00:00:00"
          slotMaxTime="24:00:00"
          timeZone="America/Sao_Paulo"
          events={events ?? []}
          eventContent={renderEventContent}
          height="55rem"
          locale={ptBrLocale}
          allDayContent={({ text }) => (
            <p className="font-bold text-center">{text}</p>
          )}
          dayMaxEvents={isMobile ? 1 : 2}
          datesSet={handleDatesSet}
        />
      </section>

      <FixedModal
        isOpen={!!modal}
        close={() => {
          setModal(null);

          reset({
            type: type as any,
            title: "",
            startsAt: "",
            endsAt: "",
            isAllDay: false,
            status: undefined,
            description: "",
            contentType: "",
            platform: "",
            earningType: "",
            amountCents: "",
            currency: "",
            source: "",
            brand: "",
          } as any);
        }}
      >
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-2 min-w-0 font-medium text-foreground text-sm select-none">
              Tipo da atividade
            </span>

            <div className="gap-3 grid grid-cols-3">
              {Object.entries(EventType).map(([key, value], i) => (
                <button
                  tabIndex={-1}
                  key={`${key}-${i}`}
                  type="button"
                  onClick={() => {
                    if (modal !== "create" && modal && modal.type === key) {
                      reset({
                        type: modal.type,
                        title: modal.title,
                        startsAt: modal.startsAt
                          ? !modal.isAllDay
                            ? formatToDateTimeLocal(new Date(modal.startsAt))
                            : modal.startsAt.split("T")[0]
                          : "",
                        endsAt: modal.endsAt
                          ? !modal.isAllDay
                            ? formatToDateTimeLocal(new Date(modal.endsAt))
                            : modal.endsAt.split("T")[0]
                          : "",
                        isAllDay: modal.isAllDay,
                        status: modal.status,
                        description: modal.description || "",
                        contentType: (modal as any).contentType || "",
                        platform: (modal as any).platform || "",
                        earningType: (modal as any).earningType || "",
                        amountCents:
                          formatInputNumber((modal as any).amountCents / 100) ||
                          "",
                        currency: (modal as any).currency || "",
                        source: (modal as any).source || "",
                        brand: (modal as any).brand || "",
                      } as any);
                    } else
                      reset({
                        type: key as any,
                        title: "",
                        startsAt: "",
                        endsAt: "",
                        isAllDay: false,
                        status: undefined,
                        description: "",
                        contentType: "",
                        platform: "",
                        earningType: "",
                        amountCents: "",
                        currency: "",
                        source: "",
                        brand: "",
                      } as any);
                  }}
                  className={[
                    "border rounded-lg py-2",
                    key === type
                      ? "bg-primary border-transparent text-white"
                      : "border-foreground/30 cursor-pointer",
                  ].join(" ")}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <Input
              label="Título"
              name="title"
              placeholder="Título do evento"
              errors={errors}
              register={register}
              required
            />

            <div className="gap-x-5 gap-y-2 grid grid-cols-2">
              <Input
                label="Data de início"
                name="startsAt"
                type={isAllDay ? "date" : "datetime-local"}
                placeholder="Escolha a data de início"
                errors={errors}
                register={register}
                required
              />

              <Input
                label="Data de fim"
                name="endsAt"
                type={isAllDay ? "date" : "datetime-local"}
                placeholder="Escolha a data de início"
                errors={errors}
                register={register}
              />

              <div className="col-span-2">
                <Input
                  label="O dia todo?"
                  name="isAllDay"
                  type="checkbox"
                  errors={errors}
                  register={register}
                  required
                />
              </div>
            </div>

            {type === "CONTENT" ? (
              <>
                <Select
                  label="Tipo do conteúdo"
                  name="contentType"
                  errors={errors}
                  register={register}
                  control={control}
                  items={Object.entries(ContentType).map(([key, value]) => ({
                    label: captalize(value),
                    value: key,
                  }))}
                  required
                />

                <Select
                  label="Plataforma"
                  name="platform"
                  errors={errors}
                  register={register}
                  control={control}
                  items={Object.entries(ContentPlatform).map(
                    ([key, value]) => ({
                      label: captalize(value),
                      value: key,
                    }),
                  )}
                  required
                />
              </>
            ) : type === "EARNING" ? (
              <>
                <Select
                  label="Tipo do ganho"
                  name="earningType"
                  errors={errors}
                  register={register}
                  control={control}
                  items={Object.entries(EarningType).map(([key, value]) => ({
                    label: captalize(value),
                    value: key,
                  }))}
                  required
                />
                <Input
                  label="Valor"
                  name="amountCents"
                  placeholder="Digite o valor"
                  type="float"
                  errors={errors}
                  register={register}
                />

                <Select
                  label="Moeda"
                  name="currency"
                  errors={errors}
                  register={register}
                  control={control}
                  defaultValue={"BRL"}
                  items={currencyCodes.codes().map((code) => ({
                    label: code,
                    value: code,
                  }))}
                  required
                />

                <Input
                  label="Origem"
                  name="source"
                  placeholder="Ex: Nike, Instagram, Ads..."
                  errors={errors}
                  register={register}
                />
              </>
            ) : (
              <Input
                label="Marca"
                name="brand"
                placeholder="Digite a marca"
                errors={errors}
                register={register}
              />
            )}

            <Select
              label="Status"
              name="status"
              errors={errors}
              register={register}
              control={control}
              items={Object.entries(
                type === "CONTENT"
                  ? ContentStatus
                  : type === "EARNING"
                    ? EarningStatus
                    : CampaignStatus,
              ).map(([key, value]) => ({
                label: captalize(value),
                value: key,
              }))}
              required
            />

            <Textarea
              label="Descrição"
              name="description"
              placeholder="Briefing ou ideia do post"
              errors={errors}
              register={register}
            />
          </div>

          <div
            className={[
              "gap-5 grid",
              modal === "create" ? "grid-cols-2" : "grid-cols-3",
            ].join(" ")}
          >
            <button
              tabIndex={-1}
              type="submit"
              className="bg-primary/70 hover:bg-primary p-2 rounded-md text-white transition-all duration-300 cursor-pointer"
            >
              {modal === "create" ? "Criar" : "Atualizar"}
            </button>

            <button
              tabIndex={-1}
              type="button"
              onClick={() => {
                if (modal !== "create" && modal && modal.type === type) {
                  reset({
                    type: modal.type,
                    title: modal.title,
                    startsAt: modal.startsAt
                      ? !modal.isAllDay
                        ? formatToDateTimeLocal(new Date(modal.startsAt))
                        : modal.startsAt.split("T")[0]
                      : "",
                    endsAt: modal.endsAt
                      ? !modal.isAllDay
                        ? formatToDateTimeLocal(new Date(modal.endsAt))
                        : modal.endsAt.split("T")[0]
                      : "",
                    isAllDay: modal.isAllDay,
                    status: modal.status,
                    description: modal.description || "",
                    contentType: (modal as any).contentType || "",
                    platform: (modal as any).platform || "",
                    earningType: (modal as any).earningType || "",
                    amountCents:
                      formatInputNumber((modal as any).amountCents / 100) || "",
                    currency: (modal as any).currency || "",
                    source: (modal as any).source || "",
                    brand: (modal as any).brand || "",
                  } as any);
                } else
                  reset({
                    type,
                    title: "",
                    startsAt: "",
                    endsAt: "",
                    isAllDay: false,
                    status: undefined,
                    description: "",
                    contentType: "",
                    platform: "",
                    earningType: "",
                    amountCents: "",
                    currency: "",
                    source: "",
                    brand: "",
                  } as any);
              }}
              className="hover:bg-primary/10 p-2 border border-foreground/30 rounded-md text-foreground transition-all duration-300 cursor-pointer"
            >
              {modal === "create" ? "Limpar" : "Cancelar"}
            </button>

            {modal !== "create" && (
              <button
                tabIndex={-1}
                type="button"
                onClick={async () => {
                  await handleDeleteEvent(modal!.id);

                  setModal(null);
                  reset({
                    type,
                    title: "",
                    startsAt: "",
                    endsAt: "",
                    isAllDay: false,
                    status: undefined,
                    description: "",
                    contentType: "",
                    platform: "",
                    earningType: "",
                    amountCents: "",
                    currency: "",
                    source: "",
                    brand: "",
                  } as any);

                  if (!lastRangeRef.current) return;

                  const start = new Date(
                    lastRangeRef.current.start,
                  ).toISOString();
                  const end = new Date(lastRangeRef.current.end).toISOString();

                  await handleFindAllEvents(start, end);
                  await handleFindDashboard(start, end);
                }}
                className="bg-error/70 hover:bg-error p-2 rounded-md text-white transition-all duration-300 cursor-pointer"
              >
                Deletar
              </button>
            )}
          </div>
        </Form>
      </FixedModal>
    </>
  );
};

export default CalendarView;
