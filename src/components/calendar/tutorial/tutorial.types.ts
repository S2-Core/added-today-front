export interface ITutorialStep {
  id: string;
  title: string;
  description: string;
  target?: string;
}

export interface ICalendarTutorialStep extends ITutorialStep {}

export interface ICalendarTutorialProps {
  isOpen: boolean;
  currentStep: ICalendarTutorialStep | null;
  currentStepIndex: number;
  totalSteps: number;
  next: () => void;
  complete: () => Promise<void>;
  skip: () => Promise<void>;
  onFinish?: () => void;
}
