import { Path } from "react-hook-form";

export interface ICreateInputs<T> {
  name: Path<T>;
  label: string;
  placeholder: string;
}
