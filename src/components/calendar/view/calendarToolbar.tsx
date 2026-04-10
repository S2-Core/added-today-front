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
    <div className="mb-6 flex flex-col gap-4 sm:gap-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <button
          tabIndex={-1}
          type="button"
          onClick={onOpenCreate}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-light transition-all duration-300 hover:opacity-90 sm:w-fit"
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
          className="w-full cursor-pointer text-left text-sm font-medium text-primary transition-all duration-300 hover:underline sm:w-fit md:text-right"
        >
          Ver tutorial novamente
        </button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="order-2 flex items-center gap-3 md:order-1">
          <button
            tabIndex={-1}
            type="button"
            onClick={() => onChangeView("dayGridWeek")}
            className={[
              "inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-300 sm:flex-none sm:px-5",
              currentView === "dayGridWeek"
                ? "border-primary bg-primary text-light"
                : "border-primary/40 bg-light text-foreground hover:bg-secondary/10",
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
              "inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-300 sm:flex-none sm:px-5",
              currentView === "dayGridMonth"
                ? "border-primary bg-primary text-light"
                : "border-primary/40 bg-light text-foreground hover:bg-secondary/10",
            ].join(" ")}
          >
            <FiCalendar className="text-base" />
            <span>Mês</span>
          </button>
        </div>

        <div className="order-1 flex items-center justify-between gap-3 md:order-2 md:ml-auto md:min-w-[18rem] md:justify-end lg:min-w-[20rem]">
          <button
            tabIndex={-1}
            type="button"
            onClick={onPrevious}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-secondary/30 bg-light text-foreground transition-all duration-300 hover:bg-secondary/10 md:h-11 md:w-11 xl:h-12 xl:w-12"
          >
            <FiChevronLeft className="text-xl" />
          </button>

          <h2 className="min-w-0 flex-1 truncate text-center font-title text-[1rem] font-semibold text-foreground md:text-[1.125rem] xl:text-[1.25rem]">
            {title}
          </h2>

          <button
            tabIndex={-1}
            type="button"
            onClick={onNext}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-secondary/30 bg-light text-foreground transition-all duration-300 hover:bg-secondary/10 md:h-11 md:w-11 xl:h-12 xl:w-12"
          >
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarToolbar;
