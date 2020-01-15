import React from "react";

export interface IBaseProps extends React.HTMLAttributes<HTMLDivElement>{}

export enum LayoutType {
  FULL = "full",
  JUSTIFY = "justify"
}
