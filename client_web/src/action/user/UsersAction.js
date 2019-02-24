import { startSubmit, stopSubmit } from 'redux-form';

import {
  USER_API_URL, _post, _put, _get, _delete, _patch,
} from '../../Api';
import { FORM_REGISTER, FORM_USERINFO, USER_PAGE_SIZE, UserRole, UserStatus } from '../../Constant';
import { setRegisterModalShow, setUserInfoModalShow } from '../common/ModalAction';
import { success, error } from '../common/NotifyAction';
import { afterLogin, setLoginUser } from '../common/LoginAction';

export const LIST_USERS_RESPONSE = 'LIST_USERS_RESPONSE';
export const GET_USER_INFO_RESPONSE = 'GET_USER_INFO_RESPONSE';

export const REGISTER_USER_RESPONSE = 'REGISTER_USER_RESPONSE';
export const DELETE_USER_RESPONSE = 'DELETE_USER_RESPONSE';

export const UPDATE_USER_INFO_RESPONSE = 'UPDATE_USER_INFO_RESPONSE';
export const UPDATE_USER_ROLE_RESPONSE = 'UPDATE_USER_ROLE_RESPONSE';
export const UPDATE_USER_STATUS_RESPONSE = 'UPDATE_USER_STATUS_RESPONSE';

export const registerUser = user => (dispatch) => {
  const url = `${USER_API_URL}/public/`;

  dispatch(startSubmit(FORM_REGISTER));
  return _post(url, user)
    .then((result) => {
      dispatch(stopSubmit(FORM_REGISTER, result.errors));

      if (result.code === 200) {
        dispatch(setRegisterModalShow(false));
        dispatch(success('注册成功，开始登录'));
        dispatch(registerUserResponse(result));
        afterLogin(result, dispatch, true);
      } else {
        dispatch(error(result.message));
      }
    });
};

const registerUserResponse = (result) => {
  return {
    type: REGISTER_USER_RESPONSE,
    result,
  };
};

export const listUsers = (pageNum, pageSize) => (dispatch) => {
  const url = `${USER_API_URL}/list/`;
  return _get(url, {
    pageNum,
    pageSize,
  }).then(result => dispatch(listUsersResponse(result)));
};

const listUsersResponse = (result) => {
  return {
    type: LIST_USERS_RESPONSE,
    page: result.entity,
  };
};

export const deleteUser = id => (dispatch) => {
  const url = `${USER_API_URL}/${id}`;
  return _delete(url)
    .then(result => dispatch(deleteUserResponse(result)));
};

const deleteUserResponse = (result) => {
  return {
    type: DELETE_USER_RESPONSE,
    result,
  };
};

export const getUserInfo = id => (dispatch) => {
  const url = `${USER_API_URL}/${id}`;
  return _get(url)
    .then(result => dispatch(getUserInfoResponse(result)));
};

const getUserInfoResponse = (result) => {
  return {
    type: GET_USER_INFO_RESPONSE,
    user: result.entity,
  };
};

export const updateUserInfo = user => (dispatch) => {
  const url = `${USER_API_URL}/${user.id}`;

  dispatch(startSubmit(FORM_USERINFO));
  return _put(url, user)
    .then((result) => {
      dispatch(stopSubmit(FORM_USERINFO, result.errors));

      if (result.code === 200) {
        dispatch(setUserInfoModalShow(false));
        dispatch(setLoginUser(result.entity));
        dispatch(success('修改个人信息成功'));
        dispatch(updateUserInfoResponse(result));
      } else {
        dispatch(error(result.message));
      }
    });
};

const updateUserInfoResponse = (result) => {
  return {
    type: UPDATE_USER_INFO_RESPONSE,
    user: result.entity,
  };
};

export const updateUserRole = (id, roleId, pageNum) => (dispatch) => {
  const url = `${USER_API_URL}/role/${id}`;
  return _patch(url, {
    role_id: roleId,
  }).then((result) => {
    if (result.code === 200) {
      dispatch(updateUserRoleResponse(result));
      if (roleId === UserRole.ADMIN.id) {
        dispatch(success('提升为管理员成功'));
      } else if (roleId === UserRole.VISITOR.id) {
        dispatch(success('降低为访客成功'));
      }

      dispatch(listUsers(pageNum, USER_PAGE_SIZE));
    } else {
      dispatch(error(result.message));
    }
  });
};

const updateUserRoleResponse = (result) => {
  return {
    type: UPDATE_USER_ROLE_RESPONSE,
    result,
  };
};

export const updateUserStatus = (id, statusId, pageNum) => (dispatch) => {
  const url = `${USER_API_URL}/status/${id}`;
  return _patch(url, {
    status_id: statusId,
  }).then((result) => {
    if (result.code === 200) {
      dispatch(updateUserStatusResponse(result));
      if (statusId === UserStatus.NORMAL.id) {
        dispatch(success('解除锁定成功'));
      } else if (statusId === UserStatus.LOCKED.id) {
        dispatch(success('锁定账户成功'));
      }

      dispatch(listUsers(pageNum, USER_PAGE_SIZE));
    } else {
      dispatch(error(result.message));
    }
  });
};

const updateUserStatusResponse = (result) => {
  return {
    type: UPDATE_USER_STATUS_RESPONSE,
    result,
  };
};
