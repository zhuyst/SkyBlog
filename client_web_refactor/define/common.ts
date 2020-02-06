import React from "react";

export interface IBaseProps extends React.HTMLAttributes<HTMLDivElement>{}

export enum LayoutType {
  FULL = "full",
  JUSTIFY = "justify"
}

export interface IBaseEntity {
  id: number;
}

export interface IPageInfo<T> {
  list: T[];
  pageNum: number;
  pageSize: number;
  pages: number;
  total: number;
}
