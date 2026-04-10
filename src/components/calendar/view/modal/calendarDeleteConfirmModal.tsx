import FixedModal from "../../../fixedModal";

import { ICalendarDeleteConfirmModalProps } from "./calendarItemModal.types";

const CalendarDeleteConfirmModal = ({
  item,
  isOpen,
  loading,
  onClose,
  onConfirm,
}: ICalendarDeleteConfirmModalProps) => {
  if (!item) return null;

  return (
    <FixedModal
      isOpen={isOpen}
      close={onClose}
      size="32rem"
      contentClassName="gap-6 p-5 sm:p-6"
      panelClassName="rounded-[28px]"
    >
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium uppercase tracking-wide text-error">
          Confirmar exclusão
        </span>

        <h2 className="font-title text-2xl font-semibold text-foreground">
          Deseja deletar esta atividade?
        </h2>

        <p className="text-sm leading-6 text-foreground/70">
          Esta ação removerá <strong>{item.title}</strong> do calendário.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          tabIndex={-1}
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-2xl border border-foreground/20 bg-light px-4 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-secondary/10"
        >
          Cancelar
        </button>

        <button
          tabIndex={-1}
          type="button"
          disabled={loading}
          onClick={() => {
            void onConfirm();
          }}
          className="cursor-pointer rounded-2xl bg-error px-4 py-3 text-sm font-semibold text-light transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Deletando..." : "Confirmar exclusão"}
        </button>
      </div>
    </FixedModal>
  );
};

export default CalendarDeleteConfirmModal;
