"use client";

import { ElementType, HTMLAttributes, ReactNode } from "react";

interface IProps extends HTMLAttributes<ElementType> {
  Tag: ElementType;
  children?: ReactNode;
}

const Container = ({ Tag, children, className, ...rest }: IProps) => {
  return (
    <Tag {...rest} className={`container mx-auto p-5  ${className ?? ""}`}>
      {children}
    </Tag>
  );
};

export default Container;
