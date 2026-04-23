interface IProps {
  loading: boolean;
  remainingSuggestions?: number | null;
  hasPlatformError: boolean;
  onSuggest: () => Promise<void>;
}

const CalendarAiSuggestionActions = ({
  loading,
  remainingSuggestions,
  hasPlatformError,
  onSuggest,
}: IProps) => {
  const isUnresolved = remainingSuggestions === undefined;
  const isUnlimited = remainingSuggestions === null;

  const resolvedRemainingSuggestions = isUnresolved
    ? "—"
    : isUnlimited
      ? "Ilimitadas"
      : remainingSuggestions;

  const remainingSuggestionsClassName = isUnresolved
    ? "text-foreground/60"
    : isUnlimited
      ? "text-success"
      : remainingSuggestions === 0
        ? "text-error"
        : [1, 2].includes(remainingSuggestions)
          ? "text-warning"
          : "text-success";

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-primary/15 bg-primary/5 p-4 select-none sm:p-5">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-foreground">
          Sugestão com IA
        </span>

        <span className="text-sm leading-6 text-foreground/70">
          Use seus insights recentes para preencher título, hook e descrição com
          mais rapidez.
        </span>

        {hasPlatformError && (
          <span className="text-sm text-warning">
            Selecione a plataforma antes de pedir uma sugestão.
          </span>
        )}
      </div>

      <button
        tabIndex={-1}
        disabled={hasPlatformError || loading}
        type="button"
        onClick={() => {
          void onSuggest();
        }}
        className="w-full cursor-pointer rounded-2xl border border-primary bg-light px-4 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:bg-secondary/15 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Gerando sugestão..." : "Sugerir conteúdo com IA"}
      </button>

      <span
        className={["text-sm font-medium", remainingSuggestionsClassName].join(
          " ",
        )}
      >
        Sugestões restantes: {resolvedRemainingSuggestions}
      </span>
    </section>
  );
};

export default CalendarAiSuggestionActions;
