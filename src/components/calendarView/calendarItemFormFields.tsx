import currencyCodes from "currency-codes";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

import Input from "../input";
import Select from "../select";
import Textarea from "../textarea";

import {
  CampaignStatus,
  ContentPlatform,
  ContentStatus,
  ContentType,
  EarningStatus,
  EarningType,
  EventType as CalendarItemTypeLabels,
} from "@/constants/calendar";
import { captalize } from "@/utils/string.utils";
import { CalendarFormValues } from "./calendarForm.utils";

interface IProps {
  type?: CalendarFormValues["type"];
  isAllDay: boolean;
  errors: FieldErrors<CalendarFormValues>;
  register: UseFormRegister<CalendarFormValues>;
  control: Control<CalendarFormValues>;
  onTypeChange: (nextType: CalendarFormValues["type"]) => void;
}

const CalendarItemFormFields = ({
  type,
  isAllDay,
  errors,
  register,
  control,
  onTypeChange,
}: IProps) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <span className="flex items-center gap-2 min-w-0 font-medium text-foreground text-sm select-none">
          Tipo da atividade
        </span>

        <div className="gap-3 grid grid-cols-3">
          {Object.entries(CalendarItemTypeLabels).map(([key, value], index) => (
            <button
              tabIndex={-1}
              key={`${key}-${index}`}
              type="button"
              onClick={() => onTypeChange(key as CalendarFormValues["type"])}
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
          placeholder="Título da atividade"
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
            placeholder="Escolha a data de fim"
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
              items={Object.entries(ContentPlatform).map(([key, value]) => ({
                label: captalize(value),
                value: key,
              }))}
              required
            />

            <Textarea
              label="Hook"
              name="hook"
              placeholder="A maioria dos creators perde tempo aqui..."
              errors={errors}
              register={register}
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
              required
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
              required
            />
          </>
        ) : (
          <Input
            label="Marca"
            name="brand"
            placeholder="Digite a marca"
            errors={errors}
            register={register}
            required
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
    </>
  );
};

export default CalendarItemFormFields;
