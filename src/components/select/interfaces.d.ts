import { SelectHTMLAttributes } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export interface IItems<T> {
  label: string;
  value: T;
}

interface IProps<T extends FieldValues>
  extends SelectHTMLAttributes<HTMLSelectElement> {
  name: Path<T>;
  label: string;
  items: IItems[];
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
}
