import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
} from "react-icons/fi";

interface IProps {
  title: string;
  currentView: "dayGridWeek" | "dayGridMonth";
  onPrevious: () => void;
  onNext: () => void;
  onChangeView: (view: "dayGridWeek" | "dayGridMonth") => void;
  onOpenCreate: () => void;
  onReopenTutorial?: () => Promise<void>;
}

const CalendarToolbar = ({
  title,
  currentView,
  onPrevious,
  onNext,
  onChangeView,
  onOpenCreate,
  onReopenTutorial,
}: IProps) => {
  return (
    <div className="mb-6 flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <button
          tabIndex={-1}
          type="button"
          onClick={onOpenCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-primary/70 px-5 py-3 font-bold text-light transition-all duration-300 hover:bg-primary active:bg-primary/70 cursor-pointer"
        >
          <FiPlus className="text-base" />
          <span>Adicionar atividade</span>
        </button>

        <button
          tabIndex={-1}
          type="button"
          onClick={() => {
            void onReopenTutorial?.();
          }}
          className="text-primary text-sm transition-all duration-300 hover:underline cursor-pointer"
        >
          Ver tutorial novamente
        </button>
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <button
            tabIndex={-1}
            type="button"
            onClick={() => onChangeView("dayGridWeek")}
            className={[
              "inline-flex items-center gap-2 rounded-2xl border px-5 py-3 font-semibold transition-all duration-300 cursor-pointer",
              currentView === "dayGridWeek"
                ? "border-primary bg-primary text-light"
                : "border-primary/60 bg-light text-foreground hover:bg-secondary/10",
            ].join(" ")}
          >
            <FiCalendar className="text-base" />
            <span>Semana</span>
          </button>

          <button
            tabIndex={-1}
            type="button"
            onClick={() => onChangeView("dayGridMonth")}
            className={[
              "inline-flex items-center gap-2 rounded-2xl border px-5 py-3 font-semibold transition-all duration-300 cursor-pointer",
              currentView === "dayGridMonth"
                ? "border-primary bg-primary text-light"
                : "border-primary/60 bg-light text-foreground hover:bg-secondary/10",
            ].join(" ")}
          >
            <FiCalendar className="text-base" />
            <span>Mês</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            tabIndex={-1}
            type="button"
            onClick={onPrevious}
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-secondary/40 bg-light text-foreground transition-all duration-300 hover:bg-secondary/10 cursor-pointer"
          >
            <FiChevronLeft className="text-xl" />
          </button>

          <h2 className="min-w-52 text-center font-title text-3xl font-semibold capitalize text-foreground">
            {title}
          </h2>

          <button
            tabIndex={-1}
            type="button"
            onClick={onNext}
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-secondary/40 bg-light text-foreground transition-all duration-300 hover:bg-secondary/10 cursor-pointer"
          >
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarToolbar;
