import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { IItems } from "../select/interfaces";
import { IType } from "../input/interfaces";

export interface ICreateInput<T> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: IType;
  className?: string;
  hide?: boolean;
  required: boolean;
}

export interface ICreateTagInput<T> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
  required: boolean;
}

export interface ICreateSelects<T> {
  name: Path<T>;
  label: string;
  className?: string;
  items: IItems[];
  required: boolean;
}

interface IProps<T extends FieldValues> {
  createForm: UseFormReturn<T, any, T>;
  inputs?: ICreateInput<T>[];
  tagInputs?: ICreateTagInput<T>[];
  selects?: ICreateSelects<T>[];
  tab: string;
  type: "Mental" | "Usuário" | "Oportunidade";
  defaultImage?: string;
  handleCreate: (data: T) => Promise<void>;
}
