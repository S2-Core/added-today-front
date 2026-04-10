import {
  CalendarCampaignFields,
  CalendarCommonFields,
  CalendarContentFields,
  CalendarDescriptionField,
  CalendarEarningFields,
  CalendarStatusField,
} from "./calendarItemFormSections";
import { ICalendarItemFormFieldsProps } from "./calendarItemModal.types";

interface IFormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const CalendarFormSection = ({
  title,
  description,
  children,
}: IFormSectionProps) => {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-light/70 p-4 sm:p-5">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-foreground">{title}</span>

        {description && (
          <span className="text-sm leading-6 text-foreground/60">
            {description}
          </span>
        )}
      </div>

      {children}
    </section>
  );
};

const CalendarItemFormFields = ({
  type,
  errors,
  register,
  control,
}: ICalendarItemFormFieldsProps) => {
  return (
    <div className="flex flex-col gap-5">
      <CalendarFormSection
        title="Informações básicas"
        description="Defina os dados principais da atividade no calendário."
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <CalendarCommonFields errors={errors} register={register} />

          <CalendarStatusField
            type={type}
            errors={errors}
            register={register}
            control={control}
          />
        </div>
      </CalendarFormSection>

      <CalendarFormSection
        title="Detalhes da atividade"
        description="Preencha os campos específicos conforme o tipo selecionado."
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {type === "CONTENT" ? (
            <CalendarContentFields
              errors={errors}
              register={register}
              control={control}
            />
          ) : type === "EARNING" ? (
            <CalendarEarningFields
              errors={errors}
              register={register}
              control={control}
            />
          ) : (
            <CalendarCampaignFields errors={errors} register={register} />
          )}
        </div>
      </CalendarFormSection>

      <CalendarFormSection
        title="Descrição"
        description="Adicione mais contexto para facilitar seu planejamento futuro."
      >
        <CalendarDescriptionField errors={errors} register={register} />
      </CalendarFormSection>
    </div>
  );
};

export default CalendarItemFormFields;
