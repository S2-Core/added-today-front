interface IProps {
  isCreateMode: boolean;
  loading: boolean;
  hasAnyError: boolean;
  onSecondaryAction: () => void;
  onDelete: () => Promise<void>;
}

const CalendarItemModalActions = ({
  isCreateMode,
  loading,
  hasAnyError,
  onSecondaryAction,
  onDelete,
}: IProps) => {
  const primaryLabel = isCreateMode ? "Criar atividade" : "Salvar alterações";
  const secondaryLabel = isCreateMode ? "Limpar campos" : "Voltar";

  return (
    <div className="flex flex-col gap-3 border-t border-foreground/10 pt-2 sm:pt-3">
      <div
        className={[
          "grid gap-3",
          isCreateMode
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-3",
        ].join(" ")}
      >
        <button
          tabIndex={-1}
          type="submit"
          disabled={hasAnyError || loading}
          className="cursor-pointer rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-light transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {primaryLabel}
        </button>

        <button
          tabIndex={-1}
          type="button"
          onClick={onSecondaryAction}
          className="cursor-pointer rounded-2xl border border-foreground/20 bg-light px-4 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-secondary/10"
        >
          {secondaryLabel}
        </button>

        {!isCreateMode && (
          <button
            tabIndex={-1}
            disabled={loading}
            type="button"
            onClick={() => {
              void onDelete();
            }}
            className="cursor-pointer rounded-2xl bg-error px-4 py-3 text-sm font-semibold text-light transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Deletar
          </button>
        )}
      </div>

      {isCreateMode && (
        <span className="text-xs leading-5 text-foreground/50">
          Revise os campos principais antes de criar a atividade.
        </span>
      )}
    </div>
  );
};

export default CalendarItemModalActions;
