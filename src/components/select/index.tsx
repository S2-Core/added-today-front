"use client";

import React, {
  KeyboardEvent,
  Ref,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FieldValues, useWatch } from "react-hook-form";
import RequiredDropDown from "../requiredDropDown";
import { IItems, IProps, Item } from "./interfaces";
import { IoIosArrowDown } from "react-icons/io";

const Select = <T extends FieldValues>({
  name,
  label,
  errors,
  register,
  control,
  className,
  items,
  title,
  required,
  ...rest
}: IProps<T>) => {
  const effectiveTitle = title ?? label;
  const initialValue = rest.defaultValue ?? "";
  const error = errors[name]?.message as string | undefined;
  const isMultiple = !!rest.multiple;

  const { ref: rhfRef, ...field } = register(name);

  const watchedValue = useWatch({ control, name });

  const selectedValues = isMultiple
    ? ((watchedValue ?? rest.defaultValue ?? []) as string[])
    : [String(watchedValue ?? rest.defaultValue ?? "")];

  const wrapperClasses = `relative group text-foreground ${className ?? ""}`;
  const buttonBase =
    "w-full rounded-md border px-3 cursor-pointer py-2.5 pr-10 text-sm text-left outline-none transition bg-background";
  const buttonOk =
    "border-foreground text-foreground focus:border-tertiary focus:text-tertiary group-focus-within:border-tertiary group-focus-within:text-tertiary";
  const buttonErr =
    "border-error text-error focus:border-tertiary focus:text-tertiary group-focus-within:border-tertiary group-focus-within:text-tertiary";

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const hiddenSelectRef = useRef<HTMLSelectElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const placeholder = useMemo<string>(() => `${label ?? "item"}`, [label]);
  const selectedItem = useMemo<Item | undefined>(
    () =>
      items.find((item) => String(item.value) === String(selectedValues[0])),
    [items, selectedValues]
  );

  const buttonLabel = useMemo<string>(() => {
    if (!isMultiple) return selectedItem?.label ?? placeholder;

    if (selectedValues.length === 0) return placeholder;

    if (selectedValues.length === 1) {
      const foundItem = items.find(
        (item: IItems<T>) => String(item.value) === String(selectedValues[0])
      );

      return foundItem?.label ?? placeholder;
    }

    return `${selectedValues.length} itens selecionados`;
  }, [isMultiple, selectedValues, items, placeholder, selectedItem]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent): void => {
      if (!rootRef.current) return;

      const target = e.target as Node;

      if (!rootRef.current.contains(target)) setOpen(false);
    };

    document.addEventListener("mousedown", onDocClick);

    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (!open) return;

    const currentIndex = items.findIndex((item) =>
      selectedValues.includes(String(item.value))
    );

    const index = currentIndex === -1 ? 0 : currentIndex;

    setActiveIndex(index);

    queueMicrotask(() => {
      const activeEl = listRef.current?.children[index] as HTMLElement;

      activeEl?.focus();
    });
  }, [open, items, selectedValues]);

  const commitValue = (value: string): void => {
    if (!hiddenSelectRef.current) return;

    if (isMultiple) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter((selectedValue) => selectedValue !== value)
        : [...selectedValues, value];

      Array.from(hiddenSelectRef.current.options).forEach((opt) => {
        opt.selected = newValues.includes(opt.value);
      });

      hiddenSelectRef.current.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    } else {
      hiddenSelectRef.current.value = value;

      hiddenSelectRef.current.dispatchEvent(
        new Event("change", { bubbles: true })
      );

      setOpen(false);
    }
  };

  const handleChoose = (value: string): void => {
    commitValue(value);

    if (!isMultiple) setOpen(false);
  };

  const onKeyDownButton = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (
      e.key === "ArrowDown" ||
      e.key === "ArrowUp" ||
      e.key === "Enter" ||
      e.key === " "
    ) {
      e.preventDefault();

      setOpen(true);
    }
  };

  const onKeyDownList = (e: KeyboardEvent<HTMLUListElement>): void => {
    if (e.key === "Escape") {
      e.preventDefault();

      setOpen(false);

      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setActiveIndex((prev) => Math.min(items.length - 1, prev + 1));

      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setActiveIndex((prev) => Math.max(0, prev - 1));

      return;
    }

    if (e.key === "Enter" && activeIndex >= 0 && activeIndex < items.length) {
      e.preventDefault();

      handleChoose(String(items[activeIndex].value));

      return;
    }
  };

  const mergeRefs =
    <T,>(...refs: (Ref<T> | undefined)[]): Ref<T> =>
    (el: T) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") ref(el);
        else if (ref) (ref as any).current = el;
      });
    };

  return (
    <div ref={rootRef} title={effectiveTitle} className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={`${name}-dropdown`}
          className="flex items-center gap-2 font-medium text-foreground text-sm cursor-pointer"
        >
          <span className="flex-1 w-0 truncate">{label}</span>

          <RequiredDropDown required={!!required} />
        </label>
      )}

      <div className={wrapperClasses}>
        <button
          id={`${name}-dropdown`}
          type="button"
          title={effectiveTitle}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={!!error}
          onClick={() => setOpen((open) => !open)}
          onKeyDown={onKeyDownButton}
          className={[buttonBase, error ? buttonErr : buttonOk].join(" ")}
        >
          <span
            className={`block w-full overflow-hidden whitespace-nowrap text-ellipsis ${
              selectedValues.length > 0
                ? "text-inherit"
                : "text-muted-foreground"
            }`}
          >
            {buttonLabel}
          </span>

          <span className="top-1/2 right-3 absolute -translate-y-1/2 pointer-events-none">
            <IoIosArrowDown
              size={16}
              aria-hidden="true"
              className={open ? "rotate-180 transition" : "transition"}
            />
          </span>
        </button>

        {open &&
          (items.length > 0 ? (
            <ul
              role="listbox"
              tabIndex={0}
              aria-labelledby={`${name}-dropdown`}
              ref={listRef}
              onKeyDown={onKeyDownList}
              className={[
                "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-background shadow-lg",
                "focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0",
                error ? "border-error" : "border-foreground",
              ].join(" ")}
            >
              {items.map(({ label: itemLabel, value }, idx) => {
                const isActive = idx === activeIndex;

                const isSelected = selectedValues.includes(String(value));

                return (
                  <li
                    key={`${idx}-${itemLabel}-${value}`}
                    role="option"
                    aria-selected={isSelected}
                    className={[
                      "px-3 py-2 text-sm select-none cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis focus:outline-none flex items-center gap-2",
                      isActive
                        ? "bg-gray-2/50 text-foreground"
                        : "hover:bg-gray-2/50 hover:text-foreground bg-background text-foreground",
                      isSelected ? "font-semibold text-tertiary" : "",
                    ].join(" ")}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleChoose(String(value))}
                    tabIndex={-1}
                    title={itemLabel}
                  >
                    {isMultiple && (
                      <input
                        type="checkbox"
                        readOnly
                        checked={isSelected}
                        className="mr-2"
                        tabIndex={-1}
                      />
                    )}
                    {itemLabel}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div
              className={[
                "absolute z-50 mt-1 w-full rounded-md border bg-background shadow-lg px-3 py-2 text-sm text-muted-foreground",
                error ? "border-error" : "border-foreground",
              ].join(" ")}
            >
              Nenhum item disponível
            </div>
          ))}

        <select
          aria-hidden="true"
          tabIndex={-1}
          multiple={isMultiple}
          className="hidden"
          title={effectiveTitle}
          defaultValue={
            isMultiple
              ? Array.isArray(initialValue)
                ? initialValue.map(String)
                : initialValue
                  ? [String(initialValue)]
                  : []
              : initialValue
                ? String(initialValue)
                : ""
          }
          {...rest}
          {...field}
          ref={mergeRefs(hiddenSelectRef, rhfRef)}
        >
          {!isMultiple && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}

          {items.map(({ label: optLabel, value }, i) => (
            <option key={`${i}-${optLabel}-${value}`} value={String(value)}>
              {optLabel}
            </option>
          ))}
        </select>
      </div>

      <span className={`text-xs text-error ${!error && "opacity-0"}`}>
        {error ?? "Null"}
      </span>
    </div>
  );
};

export default Select;
