import {
  ICampaignCalendarItem,
  ICalendarItem,
  IContentCalendarItem,
  IEarningCalendarItem,
} from "@/contexts/calendar/interfaces";

export interface ICalendarItemCardBaseProps<TItem extends ICalendarItem> {
  title: string;
  item: TItem;
  isMonthView: boolean;
}

export type IContentItemCardProps =
  ICalendarItemCardBaseProps<IContentCalendarItem>;

export type ICampaignItemCardProps =
  ICalendarItemCardBaseProps<ICampaignCalendarItem>;

export type IEarningItemCardProps =
  ICalendarItemCardBaseProps<IEarningCalendarItem>;
