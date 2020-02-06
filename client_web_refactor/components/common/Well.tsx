import React from "react";
import classNames from "classnames";
import { IBaseProps } from "@/define/common";

import "./Well.scss";

export default (props: IBaseProps) => (
  <div className={classNames("b-well", props.className)}>
    {props.children}
  </div>
);
