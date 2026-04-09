import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

import Input from "../../../input";
import Select from "../../../select";
import Textarea from "../../../textarea";

import {
  CampaignStatus,
  ContentPlatform,
  ContentStatus,
  ContentType,
  EarningStatus,
  EarningType,
} from "@/constants/calendar";
import { captalize } from "@/utils/string.utils";
import { CalendarFormValues } from "../../domain/form.mapper";

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
  const statusItems = Object.entries(
    type === "CONTENT"
      ? ContentStatus
      : type === "EARNING"
        ? EarningStatus
        : CampaignStatus,
  ).map(([key, value]) => ({
    label: captalize(value),
    value: key,
  }));

  return (
    <Select
      label="Status"
      name="status"
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
  );
};

export const CalendarEarningFields = ({
  errors,
  register,
  control,
}: IBaseProps) => {
  return (
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
    <div className="lg:col-span-2">
      <Textarea
        label="Descrição"
        name="description"
        placeholder="Briefing ou ideia do post"
        errors={errors}
        register={register}
      />
    </div>
  );
};
