interface IProps {
  loading: boolean;
  remainingSuggestions?: number;
  hasPlatformError: boolean;
  onSuggest: () => Promise<void>;
}

const CalendarAiSuggestionActions = ({
  loading,
  remainingSuggestions,
  hasPlatformError,
  onSuggest,
}: IProps) => {
  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <button
        tabIndex={-1}
        disabled={hasPlatformError || loading}
        type="button"
        onClick={onSuggest}
        className="w-full rounded-md border border-primary p-3 transition-all duration-300 cursor-pointer hover:bg-secondary/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Carregando..." : "Sugerir conteúdo com IA"}
      </button>

      <span className="text-sm text-foreground/70">
        Baseado nos seus insights mais recentes.
      </span>

      <span
        className={[
          "text-sm",
          remainingSuggestions === 0
            ? "text-error"
            : [2, 1].includes(remainingSuggestions ?? 0)
              ? "text-warning"
              : "text-foreground/50",
        ].join(" ")}
      >
        Sugestões restantes: {remainingSuggestions ?? 0}
      </span>
    </div>
  );
};

export default CalendarAiSuggestionActions;
