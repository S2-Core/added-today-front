"use client";

import { HTMLAttributes, ReactNode } from "react";

interface IProps extends HTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

const Form = ({ children, className, ...rest }: IProps) => {
  return (
    <form role="form" className={`w-full ${className ?? ""}`} {...rest}>
      {children}
    </form>
  );
};

export default Form;
