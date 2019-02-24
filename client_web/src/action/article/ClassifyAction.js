import { startSubmit, stopSubmit } from 'redux-form';

import { _delete, _get, _post, _put, CLASSIFY_API_URL } from '../../Api';
import { error, success } from '../common/NotifyAction';
import { FORM_CLASSIFY } from '../../Constant';

export const SET_CLASSIFY_SHOW = 'SET_CLASSIFY_SHOW';
export const SET_CLASSIFY_LOADING = 'SET_CLASSIFY_LOADING';

export const LIST_CLASSIFY_RESPONSE = 'LIST_CLASSIFY_RESPONSE';

export const INSERT_CLASSIFY_RESPONSE = 'INSERT_CLASSIFY_RESPONSE';
export const UPDATE_CLASSIFY_RESPONSE = 'UPDATE_CLASSIFY_RESPONSE';
export const DELETE_CLASSIFY_RESPONSE = 'DELETE_CLASSIFY_RESPONSE';

export const setClassifyShow = (show) => {
  return {
    type: SET_CLASSIFY_SHOW,
    show,
  };
};

export const setClassifyLoading = (loading) => {
  return {
    type: SET_CLASSIFY_LOADING,
    loading,
  };
};

export const listClassify = () => (dispatch) => {
  const url = `${CLASSIFY_API_URL}/public/`;
  return _get(url)
    .then((result) => {
      dispatch(listClassifyResponse(result));
      dispatch(setClassifyLoading(false));
    });
};

const listClassifyResponse = (result) => {
  return {
    type: LIST_CLASSIFY_RESPONSE,
    list: result.entity,
  };
};

export const insertClassify = classify => (dispatch) => {
  dispatch(startSubmit(FORM_CLASSIFY));

  const url = `${CLASSIFY_API_URL}/`;
  return _post(url, classify)
    .then((result) => {
      dispatch(stopSubmit(FORM_CLASSIFY, result.errors));

      if (result.code === 200) {
        dispatch(success('新增文章分类成功'));
        dispatch(insertClassifyResponse(result));
        dispatch(setClassifyLoading(false));
        dispatch(setClassifyShow(false));
      } else {
        dispatch(error(result.message));
      }
    });
};

const insertClassifyResponse = (result) => {
  return {
    type: INSERT_CLASSIFY_RESPONSE,
    list: result.entity,
  };
};

export const updateClassify = classify => (dispatch) => {
  dispatch(startSubmit(FORM_CLASSIFY));

  const url = `${CLASSIFY_API_URL}/${classify.id}`;
  return _put(url, classify)
    .then((result) => {
      dispatch(stopSubmit(FORM_CLASSIFY, result.errors));

      if (result.code === 200) {
        dispatch(success('更新文章分类成功'));
        dispatch(updateClassifyResponse(result));
        dispatch(setClassifyLoading(false));
      } else {
        dispatch(error(result.message));
      }
    });
};

const updateClassifyResponse = (result) => {
  return {
    type: UPDATE_CLASSIFY_RESPONSE,
    list: result.entity,
  };
};

export const deleteClassify = id => (dispatch) => {
  dispatch(startSubmit(FORM_CLASSIFY));

  const url = `${CLASSIFY_API_URL}/${id}`;
  return _delete(url)
    .then((result) => {
      dispatch(stopSubmit(FORM_CLASSIFY, result.errors));

      if (result.code === 200) {
        dispatch(success('删除文章分类成功'));
        dispatch(deleteClassifyResponse(result));
        dispatch(setClassifyLoading(false));
      } else {
        dispatch(error(result.message));
      }
    });
};

const deleteClassifyResponse = (result) => {
  return {
    type: DELETE_CLASSIFY_RESPONSE,
    list: result.entity,
  };
};
