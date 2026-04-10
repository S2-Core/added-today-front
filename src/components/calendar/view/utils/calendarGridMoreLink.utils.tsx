interface IHandleCalendarMoreLinkClickProps {
  date: Date;
  jsEvent: Event;
  onOpenDayItemsModal: (date: Date) => boolean;
}

export const handleCalendarMoreLinkClick = ({
  date,
  jsEvent,
  onOpenDayItemsModal,
}: IHandleCalendarMoreLinkClickProps): void => {
  jsEvent.preventDefault();

  onOpenDayItemsModal(date);
};
