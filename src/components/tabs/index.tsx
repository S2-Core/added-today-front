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
import { motion } from "motion/react";

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

const Tabs = ({ children, setTab, tab, id, ...rest }: IProps) => {
  const child = Children.map(children, (child) => child);

  const ulRef = useRef<HTMLUListElement | null>(null);
  const [isScrollable, setIsScrollable] = useState<boolean>(false);

  useEffect(() => {
    const checkOverflow = () => {
      const ul = ulRef.current;
      if (ul) {
        setIsScrollable(ul.scrollWidth > ul.clientWidth);
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
            className="relative px-5 py-2 w-fit text-foreground hover:text-secondary active:text-secondary/50 transition-all duration-300 cursor-pointer"
          >
            <p
              className={`w-fit whitespace-nowrap ${tab === props.name ? "text-primary" : ""}`}
            >
              {props.label}
            </p>

            {tab === props.name && (
              <motion.span
                layoutId={`${id}Tabs`}
                transition={{
                  type: "keyframes",
                  stiffness: 500,
                  damping: 30,
                }}
                className="top-9 left-0 absolute bg-primary rounded-full w-full h-1"
              />
            )}
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
