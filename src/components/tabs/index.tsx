"use client";

import {
  Children,
  Dispatch,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface ITabProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  name: string;
  label: string;
}

interface IProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactElement<ITabProps> | ReactElement<ITabProps>[];
  setTab: Dispatch<SetStateAction<string>>;
  tab: string;
}

export const Tab = ({ children }: ITabProps) => <>{children}</>;

const Tabs = ({ children, setTab, tab, ...rest }: IProps) => {
  const child = Children.map(children, (child) => child);

  const ulRef = useRef<HTMLUListElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const el = ulRef.current;
      if (el) {
        setIsScrollable(el.scrollWidth > el.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [children]);

  return (
    <div className="flex flex-col gap-8">
      <ul
        ref={ulRef}
        className={`gap-5 grid grid-flow-col auto-cols-auto sm:pb-0 w-full overflow-x-auto select-none ${
          isScrollable ? "justify-start" : "justify-center"
        }`}
        style={{
          scrollbarWidth: "none",
        }}
        {...rest}
      >
        {child.map(({ props, key }, i) => (
          <button
            key={`${props.name}-${i}-${key}`}
            type="button"
            tabIndex={-1}
            onClick={() => setTab(props.name)}
            className="relative px-5 py-2 w-fit cursor-pointer"
          >
            <p className="w-fit whitespace-nowrap">{props.label}</p>

            <span
              className="bottom-0 left-0 absolute rounded-full w-full h-1 transition-all duration-500"
              style={{
                backgroundColor:
                  tab === props.name ? "var(--primary)" : "var(--secondary)",
              }}
            />
          </button>
        ))}
      </ul>

      {child.map((child) => {
        return (
          child.props.name === tab && (
            <div key={child.key} {...child.props}>
              {child}
            </div>
          )
        );
      })}
    </div>
  );
};

export default Tabs;
