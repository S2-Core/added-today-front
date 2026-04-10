import { useMemo } from "react";

import { type CalendarModalState } from "./useCalendarModal";

interface IProps {
  modal: CalendarModalState;
}

const useCalendarViewModals = ({ modal }: IProps) => {
  const suggestionModalBridge = useMemo(() => {
    if (!modal) return null;

    if (modal.mode === "create") {
      return "create" as const;
    }

    if (modal.mode === "edit") {
      return modal.item;
    }

    return null;
  }, [modal]);

  const formModalBridge = useMemo(() => {
    if (!modal) return null;

    if (modal.mode === "create") {
      return "create" as const;
    }

    if (modal.mode === "edit") {
      return modal.item;
    }

    return null;
  }, [modal]);

  return {
    suggestionModalBridge,
    formModalBridge,
  };
};

export default useCalendarViewModals;
