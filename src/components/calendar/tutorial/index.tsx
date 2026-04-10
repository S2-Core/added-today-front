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
  const currentStepLabel = `Passo ${currentStepIndex + 1} de ${totalSteps}`;

  return (
    <div className="fixed inset-0 z-50 bg-dark/60 backdrop-blur-sm">
      <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-6">
        <div className="flex w-full max-w-xl flex-col gap-6 rounded-[28px] border border-gray-2 bg-light p-5 shadow-2xl sm:p-6">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
              {currentStepLabel}
            </span>

            <h2 className="max-w-[28rem] text-xl font-semibold leading-tight text-foreground sm:text-2xl">
              {currentStep.title}
            </h2>

            <p className="max-w-[30rem] text-sm leading-7 text-gray-8 sm:text-[15px]">
              {currentStep.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <span
                key={`calendar-tutorial-step-${index}`}
                className={[
                  "rounded-full transition-all duration-300",
                  index === currentStepIndex
                    ? "h-2.5 w-6 bg-primary"
                    : "h-2.5 w-2.5 bg-gray-3",
                ].join(" ")}
              />
            ))}
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => {
                void skip();
              }}
              className="cursor-pointer text-left text-sm font-medium text-gray-8 transition-all duration-300 hover:text-foreground hover:underline"
            >
              Pular
            </button>

            {!isLastStep ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-light transition-all duration-300 hover:opacity-90 active:scale-[0.99] sm:min-w-[10rem]"
              >
                Continuar
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  void complete().then(() => {
                    onFinish?.();
                  });
                }}
                className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-light transition-all duration-300 hover:opacity-90 active:scale-[0.99] sm:min-w-[15rem]"
              >
                Criar minha primeira atividade
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarTutorial;
