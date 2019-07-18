import {IPageInfo} from "../../action/common";
import {IUser} from "../auth";
import {IClassify} from "../classify";
import {ARTICLE_API_URL, httpGet, IApiResult} from "../index";

export interface IArticle {
    id: number;

    title: string;
    subTitle: string;
    content?: string;

    authorId: number;
    author: IUser;

    classifyId: number;
    classify: IClassify;

    createDate: string;
    updateDate: string;
}

export function fetchListArticles(pageNum: number, pageSize: number): Promise<IApiResult<IPageInfo<IArticle>>> {
    return httpGet<IPageInfo<IArticle>>(`${ARTICLE_API_URL}/public/list/`, {
        pageNum, pageSize,
    });
}

export interface IClassifyWithArticles {
    articles: IArticle[];
    classify: IClassify;
}

export function fetchListArticlesByClassify(
    classifyId: number, pageNum: number, pageSize: number,
): Promise<IApiResult<IClassifyWithArticles>> {
    return httpGet<IClassifyWithArticles>(`${ARTICLE_API_URL}/public/classify/${classifyId}/`, {
        pageNum, pageSize,
    });
}
