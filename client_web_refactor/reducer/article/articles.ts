import {
  ArticlesAction,
  LIST_ARTICLES_BY_CLASSIFY_RESPONSE, LIST_ARTICLES_RESPONSE,
  SET_ARTICLES_LOADING, SET_CLASSIFY_ARTICLES_LOADING,
} from "@/action/article/articles";
import { IPageInfo } from "@/action/common";
import { ARTICLE_PAGE_SIZE } from "@/action/pageSize";
import { IArticle } from "@/api/article";
import { concatList } from "@/util";

export interface IClassifyWithArticlesState {
  id: number;
  name: string;
  loading: boolean;
  page: IPageInfo<IArticle>;
}

const initialClassify: IClassifyWithArticlesState = {
  loading: true,
  id: 0,
  name: "",
  page: {
    list: [],
    pageNum: 1,
    pageSize: ARTICLE_PAGE_SIZE,
    pages: 0,
    total: 0,
  },
};

export interface IArticlesState {
  loading: boolean;
  page: IPageInfo<IArticle>;
  classify: IClassifyWithArticlesState;
}

const initialState: IArticlesState = {
  page: {
    list: [],
    pageNum: 1,
    pageSize: ARTICLE_PAGE_SIZE,
    pages: 0,
    total: 0,
  },
  loading: true,
  classify: initialClassify,
};

export default function articlesReducer(
  state: IArticlesState = initialState,
  action: ArticlesAction,
): IArticlesState {
  switch (action.type) {
    case SET_ARTICLES_LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }

    case SET_CLASSIFY_ARTICLES_LOADING: {
      return {
        ...state,
        classify: {
          ...state.classify,
          loading: action.loading,
        },
      };
    }

    case LIST_ARTICLES_RESPONSE: {
      const { page } = action;
      const newList = concatList(page, state.page.list);

      return {
        ...state,
        loading: false,
        page: {
          list: newList,
          pageNum: page.pageNum,
          pageSize: page.pageSize,
          pages: page.pages,
          total: page.total,
        },
      };
    }

    case LIST_ARTICLES_BY_CLASSIFY_RESPONSE: {
      const { articles, classify } = action.vo;
      const page = articles;

      const newList = concatList(page, state.classify.page.list);

      return {
        ...state,
        classify: {
          loading: false,
          id: classify.id,
          name: classify.name,
          page: {
            list: newList,
            pageNum: page.pageNum,
            pageSize: page.pageSize,
            pages: page.pages,
            total: page.total,
          },
        },
      };
    }

    default:
      return state;
  }
}
