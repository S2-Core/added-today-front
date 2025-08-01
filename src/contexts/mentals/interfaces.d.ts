import { ReactNode } from "react";

import { MentalStatus, MentalType } from "@/constants/mentals";

import { IUser } from "../users/interfaces";

export interface IUpdateMental {
  imageUrl: File[] | string | null;
  title: string;
  theme: string;
  status: MentalStatus;
  type: MentalType;
  creatorEditable: boolean;
}

export interface ICreateMental {
  imageUrl: File[] | string | null;
  title: string;
  slug: string;
  theme: string;
  status: MentalStatus;
  type: MentalType;
  creatorEditable: boolean;
}

export interface IHomeMental {
  name: string;
  description: string;
  background: string;
}

export interface IMental {
  id: string;
  title: string;
  slug: string;
  theme: string;
  imageUrl?: string | null;
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
  handleDeactivateMental: (mentalId: string) => Promise<void>;
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
  handleCreateMental: (data: ICreateMental) => Promise<void>;
  handleRestoreMental: (mentalId: string) => Promise<void>;
}
