import FixedModal from "../../../fixedModal";

import CalendarItemDetailsActions from "./calendarItemDetailsActions";
import CalendarItemDetailsContent from "./calendarItemDetailsContent";
import { ICalendarItemDetailsModalProps } from "./calendarItemModal.types";

const CalendarItemDetailsModal = ({
  item,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: ICalendarItemDetailsModalProps) => {
  if (!item) return null;

  return (
    <FixedModal
      isOpen={isOpen}
      close={onClose}
      size="52rem"
      contentClassName="gap-6 p-5 sm:p-6"
      panelClassName="rounded-[28px]"
    >
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium uppercase tracking-wide text-primary">
          Visualização da atividade
        </span>

        <h2 className="font-title text-2xl font-semibold text-foreground">
          {item.title}
        </h2>

        <span className="text-sm text-foreground/60">
          Confira os detalhes antes de editar ou remover.
        </span>
      </div>

      <CalendarItemDetailsContent item={item} />

      <CalendarItemDetailsActions
        onEdit={onEdit}
        onDelete={onDelete}
        onClose={onClose}
      />
    </FixedModal>
  );
};

export default CalendarItemDetailsModal;
