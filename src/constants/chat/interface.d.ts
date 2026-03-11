import { IconType } from "react-icons";

interface IMentalIcon {
  Icon: IconType;
  color: string;
}

interface IMentalDetails {
  description: string;
  specialties: string[];
}

export interface IChatMental {
  id: string;
  icon: IMentalIcon;
  name: string;
  subtitle: string;
  disabled: boolean;
  defaultSelected: boolean;
  details: IMentalDetails;
}
