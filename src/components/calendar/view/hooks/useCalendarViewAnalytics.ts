import { usePathname } from "next/navigation";

import { useAnalytics, useAuth } from "@/contexts";
import { ICalendarItem } from "@/contexts/calendar/interfaces";
import {
  trackCalendarCreateClicked,
  trackCalendarDayModalOpened,
  trackCalendarItemOpened,
} from "@/lib/analytics/calendar";

interface ITrackCreateClickedParams {
  triggerSource:
    | "toolbar"
    | "day_header"
    | "day_modal"
    | "date_click"
    | "empty_state"
    | "unknown";
  view: "dayGridWeek" | "dayGridMonth";
}

interface ITrackItemOpenedParams {
  item: ICalendarItem;
  origin: "calendar_grid" | "day_modal" | "details_modal";
}

interface ITrackDayModalOpenedParams {
  date: Date;
  itemsCount: number;
  view: "dayGridWeek" | "dayGridMonth";
  origin?: "date_click" | "more_link";
}

const useCalendarViewAnalytics = () => {
  const pathname = usePathname();

  const { trackEvent } = useAnalytics();
  const { loggedUser, userCurrentPlan } = useAuth();

  const analyticsBase = {
    path: pathname ?? "",
    userId: loggedUser?.id,
    planCode: userCurrentPlan?.currentPlan?.code ?? null,
    isFounder: loggedUser?.isFounder ?? undefined,
  };

  const trackCreateClicked = ({
    triggerSource,
    view,
  }: ITrackCreateClickedParams) => {
    trackCalendarCreateClicked(trackEvent, {
      ...analyticsBase,
      triggerSource,
      view,
    });
  };

  const trackItemOpened = ({ item, origin }: ITrackItemOpenedParams) => {
    trackCalendarItemOpened(trackEvent, {
      ...analyticsBase,
      itemId: item.id,
      itemType: item.type,
      itemSource: item.source,
      origin,
    });
  };

  const trackDayModalOpened = ({
    date,
    itemsCount,
    view,
    origin,
  }: ITrackDayModalOpenedParams) => {
    trackCalendarDayModalOpened(trackEvent, {
      ...analyticsBase,
      date: date.toISOString(),
      itemsCount,
      view,
      origin,
    });
  };

  return {
    analyticsBase,
    trackCreateClicked,
    trackItemOpened,
    trackDayModalOpened,
  };
};

export default useCalendarViewAnalytics;
