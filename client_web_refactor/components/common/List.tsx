import React from "react";
import { Spinner } from "react-bootstrap";
import { IBaseProps } from "@/components/interfaces";
import BPagination, { IBPaginationProps } from "./BPagination";

import "./List.scss";

interface IListProps<T> extends IBaseProps {
  dataSource: T[];
  dataKey?: keyof T;
  renderItem: (item: T) => React.ReactNode;
  loading: boolean;
  pagination?: IBPaginationProps;
}

const List = <T extends any>(props: IListProps<T>) => {
  let content;
  if (props.loading) {
    content = (
      <div className="b-list-loading">
        <Spinner animation="grow" variant="primary" />
      </div>
    );
  } else {
    content = (
      <>
        <div className="b-list-content">
          {props.dataSource.map((item, index) => {
            const key = props.dataKey ? item[props.dataKey] : index;
            return (
              <div className="b-list-item" key={key}>
                {props.renderItem(item)}
              </div>
            );
          })}
        </div>
        {props.pagination && (<BPagination {...props.pagination} />)}
      </>
    );
  }

  return (
    <div className={`b-list${props.className ? ` ${props.className}` : ""}`}>
      {content}
    </div>
  );
};

export default List;
