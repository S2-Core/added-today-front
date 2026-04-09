"use client";

import { ICalendarTutorialProps } from "./tutorial.types";

const CalendarTutorial = ({
  isOpen,
  currentStep,
  currentStepIndex,
  totalSteps,
  next,
  complete,
  skip,
  onFinish,
}: ICalendarTutorialProps) => {
  if (!isOpen || !currentStep) return null;

  const isLastStep = currentStepIndex === totalSteps - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/60 backdrop-blur-sm">
      <div className="flex w-full max-w-md flex-col gap-5 rounded-xl border border-gray-2 bg-light p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-foreground">
          {currentStep.title}
        </h2>

        <p className="text-sm leading-relaxed text-gray-8">
          {currentStep.description}
        </p>

        <div className="mt-2 flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <span
              key={`calendar-tutorial-step-${index}`}
              className={[
                "h-2 w-2 rounded-full transition-all duration-300",
                index === currentStepIndex
                  ? "scale-110 bg-primary"
                  : "bg-gray-3",
              ].join(" ")}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={skip}
            className="text-sm text-gray-8 transition-all duration-300 hover:text-foreground hover:underline"
          >
            Pular
          </button>

          {!isLastStep ? (
            <button
              type="button"
              onClick={next}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-light transition-all duration-300 hover:bg-primary/80 active:scale-[0.98]"
            >
              Continuar
            </button>
          ) : (
            <button
              type="button"
              onClick={async () => {
                await complete();
                onFinish?.();
              }}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-light transition-all duration-300 hover:bg-primary/80 active:scale-[0.98]"
            >
              Criar minha primeira atividade
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarTutorial;
