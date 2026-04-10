import { Dispatch, SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

import { useAnalytics, useAuth } from "@/contexts";
import { ICalendarItem } from "@/contexts/calendar/interfaces";
import {
  trackCalendarItemCreated,
  trackCalendarItemDeleted,
  trackCalendarItemUpdated,
} from "@/lib/analytics/calendar";
import {
  CalendarFormValues,
  buildCalendarSubmitPayload,
  createEmptyCalendarFormValues,
} from "@/components/calendar/domain/form.mapper";

import { CalendarModalState } from "./useCalendarModal";

interface IProps {
  modal: CalendarModalState;
  setModal: Dispatch<SetStateAction<CalendarModalState>>;
  selectedItem: ICalendarItem | null;
  editingItem: ICalendarItem | null;
  type?: CalendarFormValues["type"];
  reset: UseFormReset<CalendarFormValues>;
  handleCreateItem: (data: CalendarFormValues) => Promise<void>;
  handleDeleteItem: (id: string) => Promise<void>;
  handleUpdateItem: (id: string, data: CalendarFormValues) => Promise<void>;
  refreshCurrentRange: () => Promise<void>;
}

const useCalendarSubmit = ({
  modal,
  setModal,
  selectedItem,
  editingItem,
  type,
  reset,
  handleCreateItem,
  handleDeleteItem,
  handleUpdateItem,
  refreshCurrentRange,
}: IProps) => {
  const pathname = usePathname();

  const { trackEvent } = useAnalytics();
  const { loggedUser, userCurrentPlan } = useAuth();

  const analyticsBase = {
    path: pathname ?? "",
    userId: loggedUser?.id,
    planCode: userCurrentPlan?.currentPlan?.code ?? null,
    isFounder: loggedUser?.isFounder ?? undefined,
  };

  const resetFormState = () => {
    setModal(null);
    reset(createEmptyCalendarFormValues(type || "CONTENT"));
  };

  const handleDeleteCurrentItem = async () => {
    if (!selectedItem) return;

    await handleDeleteItem(selectedItem.id);

    trackCalendarItemDeleted(trackEvent, {
      ...analyticsBase,
      itemId: selectedItem.id,
      itemType: selectedItem.type,
      itemSource: selectedItem.source,
    });

    resetFormState();
    await refreshCurrentRange();
  };

  const onSubmit = async (data: CalendarFormValues) => {
    let filteredData: CalendarFormValues;

    try {
      filteredData = buildCalendarSubmitPayload(data);
    } catch {
      toast.error("Data inválida. Verifique o dia informado.");
      return;
    }

    if (modal?.mode === "create") {
      await handleCreateItem(filteredData);

      trackCalendarItemCreated(trackEvent, {
        ...analyticsBase,
        itemType: filteredData.type,
      });

      resetFormState();
      await refreshCurrentRange();
      return;
    }

    if (modal?.mode !== "edit" || !editingItem) {
      return;
    }

    await handleUpdateItem(editingItem.id, filteredData);

    trackCalendarItemUpdated(trackEvent, {
      ...analyticsBase,
      itemId: editingItem.id,
      itemType: filteredData.type,
      itemSource: editingItem.source,
    });

    resetFormState();
    await refreshCurrentRange();
  };

  return {
    handleDeleteCurrentItem,
    onSubmit,
  };
};

export default useCalendarSubmit;
