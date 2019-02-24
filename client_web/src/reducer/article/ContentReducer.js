import {
  GET_ARTICLE_INFO_RESPONSE, INSERT_ARTICLE_RESPONSE, SET_ARTICLE, SET_ARTICLE_LOADING, SET_COMMENTS_LOADING,
  SET_PREVIOUS_COMMENT, UPDATE_ARTICLE_RESPONSE,
} from '../../action/article/ContentAction';
import { concatList } from '../Util';

export const initialArticle = {
  id: 0,
  title: '文章标题',
  sub_title: '文章副标题',

  classify: {
    id: 1,
    name: '未分类',
  },
  classify_id: 1,

  content: {
    text: '#### 文章内容\n`Markdown编辑器`',
    selection: null,
  },
};

const initialComments = {
  list: [],
  page_num: 1,
  pages: 0,
  total: 0,
};

export const initialPreviousComment = {
  id: 0,
  author: {
    id: 0,
    nickname: '',
  },
  content: '',
};

const initialState = {
  comments: initialComments,
  comments_loading: true,

  article: initialArticle,
  article_loading: true,

  previous_comment: initialPreviousComment,
};

const ContentReducer = (state = initialState, action) => {
  let article = action.article;

  let newList;
  let comments;

  switch (action.type) {
    case SET_ARTICLE:
      article = Object.assign({}, state.article, article);
      return convert(article, state);

    case SET_PREVIOUS_COMMENT:
      return {
        ...state,
        previous_comment: action.previous_comment,
      };

    case SET_COMMENTS_LOADING:
      return {
        ...state,
        comments_loading: action.comments_loading,
      };

    case SET_ARTICLE_LOADING:
      return {
        ...state,
        article_loading: action.article_loading,
      };

    case GET_ARTICLE_INFO_RESPONSE:
      return convert(article, state);

    case INSERT_ARTICLE_RESPONSE:
      return convert(article, state);

    case UPDATE_ARTICLE_RESPONSE:
      return convert(article, state);

    case LIST_COMMENTS_RESPONSE:
      comments = action.comments;
      newList = concatList(comments, state.comments.list);

      return {
        ...state,
        comments_loading: false,
        comments: {
          list: newList,
          page_num: comments.page_num,
          pages: comments.pages,
          total: comments.total,
        },
      };
    default:
      return state;
  }
};

const convert = (article, state) => {
  const convertArticle = {
    ...article,
    content: {
      text: article.content,
      selection: null,
    },
  };
  return {
    ...state,
    article: convertArticle,
    article_loading: false,
    comments: initialComments,
    previous_comment: initialPreviousComment,
  };
};

export default ContentReducer;
