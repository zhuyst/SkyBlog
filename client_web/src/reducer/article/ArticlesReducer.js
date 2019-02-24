import {
  LIST_ARTICLES_BY_CLASSIFY_RESPONSE, LIST_ARTICLES_RESPONSE,
  SET_ARTICLES_LOADING, SET_CLASSIFY_ARTICLES_LOADING,
} from '../../action/article/ArticlesAction';
import { concatList } from '../Util';

const initialClassify = {
  loading: true,
  id: 0,
  name: '',
  page: {
    list: [],
    page_num: 1,
    pages: 0,
    total: 0,
  },
};

const initialState = {
  page: {
    list: [],
    page_num: 1,
    pages: 0,
    total: 0,
  },
  loading: true,
  classify: initialClassify,
};

const ArticlesReducer = (state = initialState, action) => {
  let page;
  let newList;

  switch (action.type) {
    case SET_ARTICLES_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case SET_CLASSIFY_ARTICLES_LOADING:
      return {
        ...state,
        classify: {
          ...state.classify,
          loading: action.loading,
        },
      };

    case LIST_ARTICLES_RESPONSE:
      page = action.page;
      newList = concatList(page, state.page.list);

      return {
        ...state,
        loading: false,
        page: {
          list: newList,
          page_num: page.page_num,
          pages: page.pages,
          total: page.total,
        },
      };

    case LIST_ARTICLES_BY_CLASSIFY_RESPONSE:
      const vo = action.vo;
      const classify = vo.classify;
      page = vo.articles;

      newList = concatList(page, state.classify.page.list);

      return {
        ...state,
        classify: {
          loading: false,
          id: classify.id,
          name: classify.name,
          page: {
            list: newList,
            page_num: page.page_num,
            pages: page.pages,
            total: page.total,
          },
        },
      };

    default:
      return state;
  }
};

export default ArticlesReducer;
