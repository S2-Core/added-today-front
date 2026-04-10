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
import { IoIosArrowDown } from "react-icons/io";

import RequiredDropDown from "../requiredDropDown";
import { IItems, IProps, Item } from "./interfaces";

const Select = <T extends FieldValues>({
  name,
  label,
  errors,
  register,
  control,
  className,
  items,
  title,
  placeholder,
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
    "w-full rounded-md border bg-background px-3 py-2.5 pr-10 text-left text-sm outline-none transition cursor-pointer";
  const buttonOk =
    "border-foreground text-foreground focus:border-tertiary focus:text-tertiary group-focus-within:border-tertiary group-focus-within:text-tertiary";
  const buttonErr =
    "border-error text-error focus:border-tertiary focus:text-tertiary group-focus-within:border-tertiary group-focus-within:text-tertiary";

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const hiddenSelectRef = useRef<HTMLSelectElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const resolvedPlaceholder = useMemo<string>(
    () => placeholder ?? `Selecione ${label?.toLowerCase() ?? "um item"}`,
    [label, placeholder],
  );

  const selectedItem = useMemo<Item | undefined>(
    () =>
      items.find((item) => String(item.value) === String(selectedValues[0])),
    [items, selectedValues],
  );

  const hasSelectedValue = isMultiple
    ? selectedValues.length > 0
    : selectedValues[0] !== "" && selectedValues[0] !== "undefined";

  const buttonLabel = useMemo<string>(() => {
    if (!isMultiple) {
      return selectedItem?.label ?? resolvedPlaceholder;
    }

    if (selectedValues.length === 0) {
      return resolvedPlaceholder;
    }

    if (selectedValues.length === 1) {
      const foundItem = items.find(
        (item) => String(item.value) === String(selectedValues[0]),
      );

      return foundItem?.label ?? resolvedPlaceholder;
    }

    return `${selectedValues.length} itens selecionados`;
  }, [isMultiple, items, resolvedPlaceholder, selectedItem, selectedValues]);

  useEffect(() => {
    const onDocClick = (event: MouseEvent): void => {
      if (!rootRef.current) return;

      const target = event.target as Node;

      if (!rootRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocClick);

    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (!open) return;

    const currentIndex = items.findIndex((item) =>
      selectedValues.includes(String(item.value)),
    );

    const index = currentIndex === -1 ? 0 : currentIndex;

    setActiveIndex(index);

    queueMicrotask(() => {
      const activeElement = listRef.current?.children[index] as HTMLElement;
      activeElement?.focus();
    });
  }, [open, items, selectedValues]);

  const commitValue = (value: string): void => {
    if (!hiddenSelectRef.current) return;

    if (isMultiple) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter((selectedValue) => selectedValue !== value)
        : [...selectedValues, value];

      Array.from(hiddenSelectRef.current.options).forEach((option) => {
        option.selected = newValues.includes(option.value);
      });

      hiddenSelectRef.current.dispatchEvent(
        new Event("change", { bubbles: true }),
      );

      return;
    }

    hiddenSelectRef.current.value = value;
    hiddenSelectRef.current.dispatchEvent(
      new Event("change", { bubbles: true }),
    );
    setOpen(false);
  };

  const handleChoose = (value: string): void => {
    commitValue(value);

    if (!isMultiple) {
      setOpen(false);
    }
  };

  const onKeyDownButton = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowUp" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      setOpen(true);
    }
  };

  const onKeyDownList = (event: KeyboardEvent<HTMLUListElement>): void => {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(items.length - 1, prev + 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(0, prev - 1));
      return;
    }

    if (
      event.key === "Enter" &&
      activeIndex >= 0 &&
      activeIndex < items.length
    ) {
      event.preventDefault();
      handleChoose(String(items[activeIndex].value));
    }
  };

  const mergeRefs =
    <TRef,>(...refs: (Ref<TRef> | undefined)[]): Ref<TRef> =>
    (element: TRef) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(element);
          return;
        }

        if (ref) {
          ref.current = element;
        }
      });
    };

  return (
    <div ref={rootRef} title={effectiveTitle} className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={`${name}-dropdown`}
          className="flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground"
        >
          <span className="truncate">{label}</span>
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
          onClick={() => setOpen((currentOpen) => !currentOpen)}
          onKeyDown={onKeyDownButton}
          className={[buttonBase, error ? buttonErr : buttonOk].join(" ")}
        >
          <span
            className={[
              "block w-full overflow-hidden text-ellipsis whitespace-nowrap",
              hasSelectedValue ? "text-inherit" : "text-foreground/50",
            ].join(" ")}
          >
            {buttonLabel}
          </span>

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
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
              {items.map(({ label: itemLabel, value }, index) => {
                const isActive = index === activeIndex;
                const isSelected = selectedValues.includes(String(value));

                return (
                  <li
                    key={`${index}-${itemLabel}-${value}`}
                    role="option"
                    aria-selected={isSelected}
                    className={[
                      "flex cursor-pointer items-center gap-2 overflow-hidden whitespace-nowrap px-3 py-2 text-sm text-ellipsis select-none focus:outline-none",
                      isActive
                        ? "bg-gray-2/50 text-foreground"
                        : "bg-background text-foreground hover:bg-gray-2/50 hover:text-foreground",
                      isSelected ? "font-semibold text-tertiary" : "",
                    ].join(" ")}
                    onMouseDown={(event) => event.preventDefault()}
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
                "absolute z-50 mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground/50 shadow-lg",
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
              {resolvedPlaceholder}
            </option>
          )}

          {items.map(({ label: optionLabel, value }, index) => (
            <option
              key={`${index}-${optionLabel}-${value}`}
              value={String(value)}
            >
              {optionLabel}
            </option>
          ))}
        </select>
      </div>

      <span className={`text-xs text-error ${!error ? "opacity-0" : ""}`}>
        {error ?? "Null"}
      </span>
    </div>
  );
};

export default Select;
