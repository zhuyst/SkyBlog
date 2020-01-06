import {
  ArticleAction,
  GET_ARTICLE_INFO_RESPONSE,
  INSERT_ARTICLE_RESPONSE,
  SET_ARTICLE, SET_ARTICLE_LOADING, UPDATE_ARTICLE_RESPONSE,
} from "../../action/article/article";
import { IArticle } from "../../api/article";

export interface IArticleState extends IArticle {
  loading: boolean;
  markdownContent: {
    text: string;
    selection: any;
  };
}

export const initialState: IArticleState = {
  loading: true,

  id: 0,
  title: "文章标题",
  subTitle: "文章副标题",

  authorId: null,

  classify: {
    id: 1,
    name: "未分类",
  },
  classifyId: 1,

  markdownContent: {
    text: "#### 文章内容\n`Markdown编辑器`",
    selection: null,
  },
};

export default function articleReducer(state: IArticleState = initialState, action: ArticleAction): IArticleState {
  switch (action.type) {
    case SET_ARTICLE:
    case GET_ARTICLE_INFO_RESPONSE:
    case INSERT_ARTICLE_RESPONSE:
    case UPDATE_ARTICLE_RESPONSE: {
      const { article } = action;
      return {
        ...state,
        ...article,
        loading: false,
        markdownContent: {
          text: article.content,
          selection: null,
        },
      };
    }

    case SET_ARTICLE_LOADING: {
      const { loading } = action;
      return { ...state, loading };
    }

    default:
      return state;
  }
}
