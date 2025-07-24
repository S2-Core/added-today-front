import { HTMLInputTypeAttribute } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { IItems } from "../select/interfaces";

export interface ICreateInputs<T> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  hide?: boolean;
}

export interface ICreateSelects<T> {
  name: Path<T>;
  label: string;
  className?: string;
  items: IItems[];
}

interface IProps<T extends FieldValues> {
  createForm: UseFormReturn<T, any, T>;
  inputs: ICreateInputs<T>[];
  selects: ICreateSelects<T>[];
  tab: string;
  type: "Mental" | "Usuário";
  defaultImage?: string;
  handleCreate: (data: T) => Promise<void>;
}
