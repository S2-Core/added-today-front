import { ICalendarItem } from "@/contexts/calendar/interfaces";

import FixedModal from "../../../fixedModal";
import CalendarDayItemsList from "./calendarDayItemsList";
import CalendarDayItemsSummary from "./calendarDayItemsSummary";

interface IProps {
  isOpen: boolean;
  date: Date | null;
  items: ICalendarItem[];
  onClose: () => void;
  onSelectItem: (item: ICalendarItem) => void;
  onCreateItem: (date: Date) => void;
}

const CalendarDayItemsModal = ({
  isOpen,
  date,
  items,
  onClose,
  onSelectItem,
  onCreateItem,
}: IProps) => {
  if (!isOpen || !date) return null;

  return (
    <FixedModal
      isOpen={isOpen}
      close={onClose}
      size="48rem"
      contentClassName="gap-6 p-5 sm:p-6"
      panelClassName="rounded-[28px]"
    >
      <CalendarDayItemsSummary date={date} items={items} />

      <CalendarDayItemsList items={items} onSelectItem={onSelectItem} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onCreateItem(date)}
          className="cursor-pointer rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-light transition-all duration-300 hover:opacity-90"
        >
          Adicionar atividade neste dia
        </button>

        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-2xl border border-foreground/20 bg-light px-4 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-secondary/10"
        >
          Fechar
        </button>
      </div>
    </FixedModal>
  );
};

export default CalendarDayItemsModal;
