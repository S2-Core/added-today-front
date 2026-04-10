"use client";

import { ChangeEvent, useRef, useState } from "react";
import { FieldValues } from "react-hook-form";
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
  preserveDateString = false,
  ...rest
}: IProps<T>) => {
  const resolvedTitle = title ?? rest.placeholder;

  const error = errors[name]?.message as string | undefined;

  const [showPassword, setShowPassword] = useState(false);

  const registerOptions =
    type === "date" && !preserveDateString ? { valueAsDate: true } : undefined;

  const { ref: rhfRef, ...field } = register(name, registerOptions);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const mergedRef = (el: HTMLInputElement | null) => {
    rhfRef(el);
    inputRef.current = el;
  };

  const handleOpenCalendar = () => {
    const input = inputRef.current;
    if (!input) return;

    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }

    input.focus();
  };

  const emitChange = (value: string) => {
    field.onChange({
      target: { name, value },
    });
  };

  const handleNumberMask = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (!value) {
      e.target.value = "";
      emitChange("");
      return;
    }

    value = (Number(value) / 100).toFixed(2);
    value = value.replace(".", ",");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    e.target.value = value;
    emitChange(value);
  };

  const handlePhoneMask = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    let digits = input.value.replace(/\D/g, "");

    if (!digits) {
      input.value = "";
      emitChange("");
      return;
    }

    let country = "";
    let restDigits = digits;

    if (digits.length <= 3) {
      country = digits;
      restDigits = "";
    } else {
      country = digits.slice(0, digits.length > 11 ? digits.length - 11 : 1);
      restDigits = digits.slice(country.length);
    }

    restDigits = restDigits.slice(0, 11);

    let formatted = `+${country}`;

    if (restDigits.length > 0) {
      if (restDigits.length <= 2) formatted += ` ${restDigits}`;
      else if (restDigits.length <= 7)
        formatted += ` ${restDigits.slice(0, 2)} ${restDigits.slice(2)}`;
      else
        formatted += ` ${restDigits.slice(0, 2)} ${restDigits.slice(
          2,
          7,
        )} ${restDigits.slice(7)}`;
    }

    input.value = formatted;
    emitChange(digits);
  };

  const handleDocumentMask = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const digits = input.value.replace(/\D/g, "").slice(0, 14);

    if (!digits) {
      input.value = "";
      emitChange("");
      return;
    }

    let formatted = digits;

    if (digits.length <= 11) {
      formatted = digits
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2");
    } else {
      formatted = digits
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    input.value = formatted;
    emitChange(digits);
  };

  const handleCardNumberMask = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const digits = input.value.replace(/\D/g, "").slice(0, 19);

    if (!digits) {
      input.value = "";
      emitChange("");
      return;
    }

    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();

    input.value = formatted;
    emitChange(digits);
  };

  const handleMonthYearMask = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const digits = input.value.replace(/\D/g, "").slice(0, 6);

    if (!digits) {
      input.value = "";
      emitChange("");
      return;
    }

    let formatted = digits;

    if (digits.length <= 2) {
      formatted = digits;
    } else {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }

    input.value = formatted;
    emitChange(formatted);
  };

  const handleCVVMask = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const digits = input.value.replace(/\D/g, "").slice(0, 4);

    input.value = digits;
    emitChange(digits);
  };

  const baseWrapper = `relative rounded-md border transition-colors focus-within:border-tertiary ${
    type === "percentage"
      ? "after:content-['%'] after:absolute after:top-1/2 after:-translate-y-1/2 after:right-3 after:text-sm after:pointer-events-none"
      : ""
  }`;

  const okWrapperColors =
    "border-foreground text-foreground after:text-foreground/50";

  const errWrapperColors = `border-error placeholder:text-error/50 ${
    type === "date" ? "text-error focus-within:text-tertiary" : ""
  }`;

  const baseInput =
    "w-full px-3 py-2 outline-none transition placeholder:text-sm";

  const okInputColors =
    "border-foreground text-foreground focus:placeholder:text-tertiary/50 after:text-tertiary";

  const errInputColors = `border-error placeholder:text-error/50 after:text-text-error/50 ${
    type === "date" ? "text-error" : ""
  }`;

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
            className={`w-4 h-4 accent-primary outline-none cursor-pointer ${
              className ?? ""
            } ${error ? "border-error" : ""}`}
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const input = e.currentTarget;
                let raw = input.value.replace(/\D/g, "");

                if (!raw) {
                  input.value = "";
                  emitChange("");
                  return;
                }

                const num = Number(raw);
                const formatted = (num / 100).toFixed(2).replace(".", ",");

                input.value = formatted;
                emitChange(formatted);
              }}
              className={`pr-8 ${baseInput} ${
                error ? errInputColors : okInputColors
              } ${className ?? ""}`}
            />
          </div>

          <span
            className={`text-xs text-error select-none ${!error && "opacity-0"}`}
          >
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
              <span title={label} className="truncate">
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
                  : type === "float" ||
                      type === "number" ||
                      type === "document" ||
                      type === "cardNumber" ||
                      type === "month/year" ||
                      type === "cvv"
                    ? "text"
                    : type
              }
              min={type === "number" ? 0 : undefined}
              step={type === "number" ? (rest.step ?? "1") : undefined}
              ref={mergedRef}
              {...field}
              {...rest}
              onKeyDown={
                type === "number" ||
                type === "document" ||
                type === "cardNumber" ||
                type === "cvv"
                  ? (e) => {
                      if (e.key === "," || e.key === ".") e.preventDefault();
                    }
                  : undefined
              }
              onChange={
                type === "float"
                  ? handleNumberMask
                  : type === "tel"
                    ? handlePhoneMask
                    : type === "document"
                      ? handleDocumentMask
                      : type === "cardNumber"
                        ? handleCardNumberMask
                        : type === "month/year"
                          ? handleMonthYearMask
                          : type === "cvv"
                            ? handleCVVMask
                            : type === "number"
                              ? (e: ChangeEvent<HTMLInputElement>) => {
                                  const input = e.currentTarget;
                                  const raw = input.value.replace(/\D/g, "");

                                  if (!raw) {
                                    input.value = "";
                                    emitChange("");
                                    return;
                                  }

                                  const formatted = raw.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ".",
                                  );

                                  input.value = formatted;
                                  emitChange(raw);
                                }
                              : (e) => emitChange(e.currentTarget.value)
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

          <span
            className={`text-xs select-none text-error ${!error && "opacity-0"}`}
          >
            {error ?? "Null"}.
          </span>
        </>
      )}
    </div>
  );
};

export default Input;
