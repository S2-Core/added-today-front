import { SelectHTMLAttributes } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export interface IItems<T = string> {
  label: string;
  value: T;
}

export interface Item {
  label: string;
  value: string;
}

export interface IProps<
  T extends FieldValues,
> extends SelectHTMLAttributes<HTMLSelectElement> {
  name: Path<T>;
  label: string;
  items: IItems[];
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  control: Control<T>;
  placeholder?: string;
}
