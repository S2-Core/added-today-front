import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

import {
  CampaignStatus,
  ContentPlatform,
  ContentStatus,
  ContentType,
  EarningStatus,
  EarningType,
} from "@/constants/calendar";
import { CalendarFormValues } from "../../domain/form.mapper";

import Input from "../../../input";
import Select from "../../../select";
import Textarea from "../../../textarea";
import { getStatusLabel, mapEnumToSelectItems } from "./calendarItemForm.utils";

interface IBaseProps {
  errors: FieldErrors<CalendarFormValues>;
  register: UseFormRegister<CalendarFormValues>;
  control: Control<CalendarFormValues>;
}

interface IStatusFieldProps extends IBaseProps {
  type?: CalendarFormValues["type"];
}

export const CalendarCommonFields = ({
  errors,
  register,
}: Omit<IBaseProps, "control">) => {
  return (
    <>
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
    </>
  );
};

export const CalendarStatusField = ({
  type,
  errors,
  register,
  control,
}: IStatusFieldProps) => {
  const statusItems = mapEnumToSelectItems(
    type === "CONTENT"
      ? ContentStatus
      : type === "EARNING"
        ? EarningStatus
        : CampaignStatus,
  );

  return (
    <Select
      label={getStatusLabel(type)}
      name="status"
      placeholder="Selecione um status"
      errors={errors}
      register={register}
      control={control}
      items={statusItems}
      required
    />
  );
};

export const CalendarContentFields = ({
  errors,
  register,
  control,
}: IBaseProps) => {
  return (
    <>
      <Select
        label="Tipo do conteúdo"
        name="contentType"
        placeholder="Selecione o tipo do conteúdo"
        errors={errors}
        register={register}
        control={control}
        items={mapEnumToSelectItems(ContentType)}
        required
      />

      <Select
        label="Plataforma"
        name="platform"
        placeholder="Selecione a plataforma"
        errors={errors}
        register={register}
        control={control}
        items={mapEnumToSelectItems(ContentPlatform)}
        required
      />

      <div className="lg:col-span-2">
        <Textarea
          label="Hook"
          name="hook"
          placeholder="A maioria dos creators perde tempo aqui..."
          errors={errors}
          register={register}
          rows={4}
        />
      </div>
    </>
  );
};

export const CalendarEarningFields = ({
  errors,
  register,
  control,
}: IBaseProps) => {
  return (
    <>
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
        label="Tipo do ganho"
        name="earningType"
        placeholder="Selecione o tipo do ganho"
        errors={errors}
        register={register}
        control={control}
        items={mapEnumToSelectItems(EarningType)}
        required
      />

      <div className="lg:col-span-2">
        <Input
          label="Origem"
          name="source"
          placeholder="Ex: Nike, Instagram, Ads..."
          errors={errors}
          register={register}
          required
        />
      </div>
    </>
  );
};

export const CalendarCampaignFields = ({
  errors,
  register,
}: Omit<IBaseProps, "control">) => {
  return (
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
  );
};

export const CalendarDescriptionField = ({
  errors,
  register,
}: Omit<IBaseProps, "control">) => {
  return (
    <div className="w-full">
      <Textarea
        label="Descrição"
        name="description"
        placeholder="Briefing ou ideia do post"
        errors={errors}
        register={register}
        rows={5}
      />
    </div>
  );
};
