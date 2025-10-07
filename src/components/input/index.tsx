"use client";

import { useRef, useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";

import RequiredDropDown from "../requiredDropDown";

import { IProps } from "./interfaces";

const Input = <T extends FieldValues>({
  name,
  label,
  errors,
  register,
  type = "text",
  hide = true,
  className,
  title,
  required,
  ...rest
}: IProps<T>) => {
  const resolvedTitle = title ?? rest.placeholder;

  const error = errors[name]?.message as string | undefined;

  const [showPassword, setShowPassword] = useState(false);

  const { ref: rhfRef, ...field } = register(name, {
    valueAsDate: type === "date",
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const mergedRef = (el: HTMLInputElement | null) => {
    rhfRef(el);
    inputRef.current = el;
  };

  const handleOpenCalendar = () => {
    const input = inputRef.current;
    if (!input) return;

    if (typeof (input as any).showPicker === "function") {
      (input as any).showPicker();
      return;
    }
    input.focus();
  };

  const handleNumberMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (!value) {
      e.target.value = "";
      return;
    }

    value = (Number(value) / 100).toFixed(2);
    value = value.replace(".", ",");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    e.target.value = value;
  };

  const handlePhoneMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    let digits = e.target.value.replace(/\D/g, "");

    if (!digits) {
      e.target.value = "";
      field.onChange({ target: "" });
      return;
    }

    let country = "";
    let rest = digits;

    if (digits.length <= 3) {
      country = digits;

      rest = "";
    } else {
      country = digits.slice(0, digits.length > 11 ? digits.length - 11 : 1);

      rest = digits.slice(country.length);
    }

    rest = rest.slice(0, 11);

    let formatted = `+${country}`;

    if (rest.length > 0) {
      if (rest.length <= 2) formatted += ` ${rest}`;
      else if (rest.length <= 7)
        formatted += ` ${rest.slice(0, 2)} ${rest.slice(2)}`;
      else
        formatted += ` ${rest.slice(0, 2)} ${rest.slice(2, 7)} ${rest.slice(7)}`;
    }

    e.target.value = formatted;

    field.onChange({ target: digits });
  };

  const baseWrapper = `relative rounded-md border transition-colors focus-within:border-tertiary ${type === "percentage" ? "after:content-['%'] after:absolute after:top-1/2 after:-translate-y-1/2 after:right-3 after:text-sm after:pointer-events-none" : ""}`;
  const okWrapperColors =
    "border-foreground text-foreground after:text-foreground/50";
  const errWrapperColors = `border-error placeholder:text-error/50 ${type === "date" ? "text-error focus-within:text-tertiary" : ""}`;

  const baseInput =
    "w-full px-3 py-2 outline-none transition placeholder:text-sm";
  const okInputColors =
    "border-foreground text-foreground focus:placeholder:text-tertiary/50 after:text-tertiary";
  const errInputColors = `border-error placeholder:text-error/50 after:text-text-error/50 ${type === "date" ? "text-error" : ""}`;

  return (
    <div title={resolvedTitle} className="flex flex-col gap-1 w-full">
      {type === "checkbox" ? (
        <label
          title={label}
          className="flex items-center gap-2 w-fit font-medium text-sm cursor-pointer select-none"
        >
          <input
            id={name}
            type="checkbox"
            aria-invalid={!!error}
            {...register(name)}
            {...rest}
            className={`w-4 h-4 accent-primary outline-none cursor-pointer ${className ?? ""} ${error ? "border-error" : ""}`}
          />

          {label}
        </label>
      ) : type === "percentage" ? (
        <div className="flex flex-col gap-2 w-full">
          {label && (
            <label
              htmlFor={name}
              className="flex items-center gap-2 min-w-0 font-medium text-foreground text-sm"
            >
              <span title={label} className="flex-1 w-0 truncate select-none">
                {label}
              </span>

              <RequiredDropDown required={!!required} />
            </label>
          )}

          <div
            className={`relative ${baseWrapper} ${
              error ? errWrapperColors : okWrapperColors
            }`}
          >
            <input
              id={name}
              type="text"
              aria-invalid={!!error}
              ref={mergedRef}
              {...field}
              {...rest}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                let raw = e.target.value.replace(/\D/g, "");

                if (!raw) {
                  e.target.value = "";
                  field.onChange(e);
                  return;
                }

                let num = Math.min(Number(raw), Infinity);
                let formatted = (num / 100).toFixed(2).replace(".", ",");
                e.target.value = formatted;

                field.onChange(e);
              }}
              className={`pr-8 ${baseInput} ${
                error ? errInputColors : okInputColors
              } ${className ?? ""}`}
            />
          </div>

          <span className={`text-xs text-error ${!error && "opacity-0"}`}>
            {error ?? "Null"}.
          </span>
        </div>
      ) : (
        <>
          {label && (
            <label
              htmlFor={name}
              className="flex items-center gap-2 min-w-0 font-medium text-foreground text-sm select-none"
            >
              <span title={label} className="flex-1 w-0 truncate">
                {label}
              </span>
              <RequiredDropDown required={!!required} />
            </label>
          )}

          <div
            className={`${baseWrapper} ${
              error ? errWrapperColors : okWrapperColors
            }`}
          >
            <input
              id={name}
              aria-invalid={!!error}
              type={
                type === "password" && hide
                  ? showPassword
                    ? "text"
                    : "password"
                  : type === "float"
                    ? "text"
                    : type
              }
              min={type === "number" ? 0 : undefined}
              step={type === "number" ? (rest.step ?? "1") : undefined}
              ref={mergedRef}
              {...field}
              {...rest}
              onKeyDown={
                type === "number"
                  ? (e) => {
                      if (e.key === "," || e.key === ".") {
                        e.preventDefault();
                      }
                    }
                  : undefined
              }
              onInput={
                type === "float"
                  ? handleNumberMask
                  : type === "tel"
                    ? handlePhoneMask
                    : type === "number"
                      ? (e: React.ChangeEvent<HTMLInputElement>) => {
                          e.target.value = e.target.value.replace(/\D/g, "");
                        }
                      : undefined
              }
              className={`${baseInput} ${
                error ? errInputColors : okInputColors
              } ${className ?? ""}`}
            />

            {type === "date" && (
              <button
                type="button"
                title="Escolher data"
                tabIndex={-1}
                onClick={handleOpenCalendar}
                className="top-1/2 right-3 absolute text-foreground/60 text-xl -translate-y-1/2 cursor-pointer"
              >
                <IoCalendarOutline />
              </button>
            )}

            {type === "password" && hide && (
              <button
                type="button"
                title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="top-1/2 right-3 absolute text-foreground/60 text-xl -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
              </button>
            )}
          </div>

          <span className={`text-xs text-error ${!error && "opacity-0"}`}>
            {error ?? "Null"}.
          </span>
        </>
      )}
    </div>
  );
};

export default Input;
