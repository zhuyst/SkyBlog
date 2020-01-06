export interface IPageInfo<T> {
  list: T[];
  pageNum: number;
  pageSize?: number;
  pages: number;
  total: number;
}
