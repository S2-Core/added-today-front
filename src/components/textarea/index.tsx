"use client";

import { TextareaHTMLAttributes } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path,
} from "react-hook-form";

import RequiredDropDown from "../requiredDropDown";

export interface ITextareaProps<T extends FieldValues> extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "name" | "defaultValue"
> {
  name: Path<T>;
  label?: string;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  className?: string;
  title?: string;
  required?: boolean;
}

const Textarea = <T extends FieldValues>({
  name,
  label,
  errors,
  register,
  className,
  title,
  required,
  ...rest
}: ITextareaProps<T>) => {
  const resolvedTitle = title ?? rest.placeholder;
  const error = errors[name]?.message as string | undefined;

  const baseWrapper =
    "relative rounded-md border transition-colors focus-within:border-tertiary";
  const okWrapperColors = "border-foreground text-foreground";
  const errWrapperColors = "border-error placeholder:text-error/50";

  const baseTextarea =
    "w-full px-3 py-2 outline-none transition placeholder:text-sm resize-none min-h-30";
  const okTextareaColors = "text-foreground focus:placeholder:text-tertiary/50";
  const errTextareaColors = "text-error placeholder:text-error/50";

  return (
    <div title={resolvedTitle} className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={name}
          className="flex items-center gap-2 min-w-0 font-medium text-foreground text-sm select-none"
        >
          <span title={label} className="truncate">
            {label}
          </span>
          <RequiredDropDown required={!!required} />
        </label>
      )}

      <div
        className={`${baseWrapper} ${error ? errWrapperColors : okWrapperColors}`}
      >
        <textarea
          id={name}
          aria-invalid={!!error}
          {...register(name)}
          {...rest}
          className={`${baseTextarea} ${error ? errTextareaColors : okTextareaColors} ${className ?? ""}`}
        />
      </div>

      <span
        className={`text-xs select-none text-error ${!error && "opacity-0"}`}
      >
        {error ?? "Null"}.
      </span>
    </div>
  );
};

export default Textarea;
