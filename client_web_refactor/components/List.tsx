import React from "react";

interface IListProps<T> {
    dataSource: T[];
    renderItem: (item: T) => React.ReactNode;
    loading: boolean;
}

const List = <T extends any>(props: IListProps<T>) => {
    return (
        <div />
    );
};

export default List;
