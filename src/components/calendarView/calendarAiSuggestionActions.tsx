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
        className="hover:bg-secondary/20 disabled:opacity-50 p-2 border border-primary rounded-md w-full transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? "Carregando..." : "Sugerir conteúdo com IA"}
      </button>

      <span className="text-foreground/70 text-sm">
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
