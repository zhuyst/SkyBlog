import React from "react";
import { Pagination } from "react-bootstrap";

export interface IBPaginationProps {
  onChange: (page: number) => void;
  pages: number;
  pageNum: number;
}

const BPagination = (props: IBPaginationProps) => {
  const items = [];
  for (let i = 1; i <= props.pages; i++) {
    items.push((
      <Pagination.Item key={i} active={props.pageNum === i}>{i}</Pagination.Item>
    ));
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => props.onChange(1)} />
      <Pagination.Prev onClick={() => props.onChange(props.pageNum - 1)} />
      {items}
      <Pagination.Next onClick={() => props.onChange(props.pageNum + 1)} />
      <Pagination.Last onClick={() => props.onChange(props.pages)} />
    </Pagination>
  );
};

export default BPagination;
