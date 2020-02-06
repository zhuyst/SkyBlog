import { IArticle } from "@/define/article";
import { IBaseEntity } from "@/define/common";

export interface IClassify extends IBaseEntity {
  name: string;
  articles?: IArticle[];
}
