import { ChangeEvent, ReactNode } from "react";

export interface IFormUser {
  name: string;
  email: string;
  phone: string;
}

export interface IUsersProps {
  children: ReactNode;
}

export interface IUsersContext {
  formUsers: IFormUser[] | null;
  usersFile: File | null;
  removeFile: () => void;
  handleFile: (e: ChangeEvent<HTMLInputElement>) => void;
}
