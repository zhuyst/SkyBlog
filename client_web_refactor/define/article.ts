import { IUser } from "@/define/user";
import { IClassify } from "@/define/classify";
import { IBaseEntity, IPageInfo } from "@/define/common";

export interface IComment extends IBaseEntity {
  content: string;
  authorId?: number;
  author?: IUser;
}

export interface IArticle extends IBaseEntity {
  title: string;
  subTitle: string;
  content?: string;

  authorId: number;
  author?: IUser;

  classifyId: number;
  classify?: IClassify;

  createDate?: string;
  updateDate?: string;
}

export interface IClassifyWithArticles {
  articles: IPageInfo<IArticle>;
  classify: IClassify;
}
