import React from "react";
import { Spinner } from "react-bootstrap";

interface IListProps<T> {
  dataSource: T[];
  dataKey?: keyof T;
  renderItem: (item: T) => React.ReactNode;
  loading: boolean;
}

const List = <T extends any>(props: IListProps<T>) => (
  <div className="b-list">
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
  </div>
);

export default List;
