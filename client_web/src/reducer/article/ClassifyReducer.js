import {
  DELETE_CLASSIFY_RESPONSE, INSERT_CLASSIFY_RESPONSE,
  LIST_CLASSIFY_RESPONSE, SET_CLASSIFY_LOADING, SET_CLASSIFY_SHOW, UPDATE_CLASSIFY_RESPONSE,
} from '../../action/article/ClassifyAction';

const initialState = {
  list: [],
  loading: true,
  show: false,
};

const ClassifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLASSIFY_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case LIST_CLASSIFY_RESPONSE:
      return {
        ...state,
        list: action.list,
        loading: false,
      };

    case INSERT_CLASSIFY_RESPONSE:
      return {
        ...state,
        list: action.list,
        loading: false,
      };

    case DELETE_CLASSIFY_RESPONSE:
      return {
        ...state,
        list: action.list,
        loading: false,
      };

    case UPDATE_CLASSIFY_RESPONSE:
      return {
        ...state,
        list: action.list,
        loading: false,
      };

    case SET_CLASSIFY_SHOW:
      return {
        ...state,
        show: action.show,
      };

    default:
      return state;
  }
};

export default ClassifyReducer;
