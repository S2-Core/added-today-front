import { ReactNode } from "react";

import { MentalStatus, MentalType } from "@/constants/mentals";

import { IUser } from "../users/interfaces";

export interface IUpdateMental {
  title: string;
  theme: string;
}

export interface IMental {
  id: string;
  title: string;
  slug: string;
  theme: string;
  imageUrl: string;
  type: MentalType;
  status: MentalStatus;
  creatorEditable: boolean;
  createdAt: Date;
  deletedAt?: Date;
  userId: string;
  user: IUser;
}

export interface IMentalToManage {
  id: string;
  slug: string;
  imageUrl: string;
  title: string;
  properties: string[];
  isActive: boolean;
  status: MentalStatus;
  creatorEditable: boolean;
  createdAt: Date;
}

export interface IMentalsProps {
  children: ReactNode;
}

export interface IMentalsContext {
  mentals: IMental[] | null;
  mentalsToManage: IMentalToManage[] | null;
  handleUpdateMental: (
    data: Partial<IUpdateMental>,
    mentalId: string
  ) => Promise<void>;
}
