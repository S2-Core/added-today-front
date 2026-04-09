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
  errors: FieldErrors<CalendarFormValues>;
  register: UseFormRegister<CalendarFormValues>;
  control: Control<CalendarFormValues>;
  onTypeChange: (nextType: CalendarFormValues["type"]) => void;
}

const CalendarItemFormFields = ({
  type,
  errors,
  register,
  control,
  onTypeChange,
}: IProps) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="min-w-0 select-none text-sm font-medium text-foreground">
          Tipo da atividade
        </span>

        <div className="grid grid-cols-3 gap-3">
          {Object.entries(CalendarItemTypeLabels).map(([key, value], index) => (
            <button
              tabIndex={-1}
              key={`${key}-${index}`}
              type="button"
              onClick={() => onTypeChange(key as CalendarFormValues["type"])}
              className={[
                "rounded-lg border py-3",
                key === type
                  ? "border-transparent bg-primary text-white"
                  : "border-foreground/30 cursor-pointer",
              ].join(" ")}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <Input
            label="Título"
            name="title"
            placeholder="Título da atividade"
            errors={errors}
            register={register}
            required
          />
        </div>

        <Input
          label="Dia"
          name="startsAt"
          type="date"
          placeholder="Escolha o dia"
          errors={errors}
          register={register}
          preserveDateString
          required
        />

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

            <div className="lg:col-span-2">
              <Textarea
                label="Hook"
                name="hook"
                placeholder="A maioria dos creators perde tempo aqui..."
                errors={errors}
                register={register}
              />
            </div>
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
          <div className="lg:col-span-2">
            <Input
              label="Marca"
              name="brand"
              placeholder="Digite a marca"
              errors={errors}
              register={register}
              required
            />
          </div>
        )}

        <div className="lg:col-span-2">
          <Textarea
            label="Descrição"
            name="description"
            placeholder="Briefing ou ideia do post"
            errors={errors}
            register={register}
          />
        </div>
      </div>
    </>
  );
};

export default CalendarItemFormFields;
