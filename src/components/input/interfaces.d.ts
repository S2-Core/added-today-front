import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";

export type IType = HTMLInputTypeAttribute | "tags";

export interface IProps<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  name: Path<T>;
  label: string;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  hide?: boolean;
  type?: IType;
}
