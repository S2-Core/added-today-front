import { ReactNode } from "react";
import { BsCameraVideo } from "react-icons/bs";
import { FiDollarSign, FiTarget, FiPlayCircle } from "react-icons/fi";
import {
  FaInstagram,
  FaLinkedinIn,
  FaRegChartBar,
  FaTiktok,
} from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaArrowTrendUp } from "react-icons/fa6";

import { IContentCalendarItem } from "@/contexts/calendar/interfaces";

export const getContentCardIcon = (): ReactNode => <BsCameraVideo size={25} />;

export const getPlatformCardIcon = (
  platform: IContentCalendarItem["platform"] | "OTHER",
): ReactNode => {
  if (platform === "INSTAGRAM") {
    return <FaInstagram size={25} />;
  }

  if (platform === "YOUTUBE") {
    return <AiOutlineYoutube size={25} />;
  }

  if (platform === "LINKEDIN") {
    return <FaLinkedinIn size={25} />;
  }

  if (platform === "TIKTOK") {
    return <FaTiktok size={25} />;
  }

  return <FiPlayCircle size={25} />;
};

export const getEarningsCardIcon = (): ReactNode => <FiDollarSign size={25} />;

export const getCampaignsCardIcon = (): ReactNode => <FiTarget size={25} />;

export const getGrowthCardIcon = (): ReactNode => <FaArrowTrendUp size={25} />;

export const getAverageTicketCardIcon = (): ReactNode => (
  <FaRegChartBar size={25} />
);
