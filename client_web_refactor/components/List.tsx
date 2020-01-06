import React from "react";
import { Spinner } from "react-bootstrap";
import BPagination, { IBPaginationProps } from "./BPagination";

interface IListProps<T> {
  className?: string;
  dataSource: T[];
  dataKey?: keyof T;
  renderItem: (item: T) => React.ReactNode;
  loading: boolean;
  pagination?: IBPaginationProps;
}

const List = <T extends any>(props: IListProps<T>) => (
  <div className={`b-list ${props.className}`}>
    {props.loading ? (<Spinner animation="grow" variant="primary" />)
      : (
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
      )}
    {props.pagination && (<BPagination {...props.pagination} />)}
  </div>
);

export default List;
