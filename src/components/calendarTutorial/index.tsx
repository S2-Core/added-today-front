"use client";

import useCalendarTutorial from "@/hooks/useCalendarTutorial";

const CalendarTutorial = () => {
  const {
    isOpen,
    currentStep,
    currentStepIndex,
    totalSteps,
    next,
    complete,
    skip,
  } = useCalendarTutorial();

  if (!isOpen || !currentStep) return null;

  const isLastStep = currentStepIndex === totalSteps - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex w-full max-w-md flex-col gap-4 rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold">{currentStep.title}</h2>

        <p className="text-sm text-gray-600">{currentStep.description}</p>

        <div className="mt-2 flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <span
              key={`calendar-tutorial-step-${index}`}
              className={[
                "h-2 w-2 rounded-full transition-all duration-300",
                index === currentStepIndex ? "bg-black" : "bg-gray-300",
              ].join(" ")}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={skip}
            className="text-sm text-gray-500 transition-all duration-300 hover:underline"
          >
            Pular
          </button>

          {!isLastStep ? (
            <button
              type="button"
              onClick={next}
              className="rounded-lg bg-black px-4 py-2 text-sm text-white transition-all duration-300"
            >
              Continuar
            </button>
          ) : (
            <button
              type="button"
              onClick={complete}
              className="rounded-lg bg-black px-4 py-2 text-sm text-white transition-all duration-300"
            >
              Criar meu primeiro conteúdo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarTutorial;
