import { LOGIN_CLEAR, LOGIN_RESPONSE, SET_MANAGEMENT, SET_LOGIN_USER } from '../../action/common/LoginAction';
import { UPDATE_USER_INFO_RESPONSE } from '../../action/user/UsersAction';

const initialUser = {
  id: 0,
  username: '',
  nickname: '',
  admin: false,
};

const initialState = {
  ok: null,
  message: null,
  management: false,
  user: initialUser,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MANAGEMENT: {
      return {
        ...state,
        management: action.management,
      };
    }

    case LOGIN_CLEAR: {
      return {
        ...state,
        ok: null,
        user: initialUser,
        management: false,
      };
    }

    case LOGIN_RESPONSE: {
      const ok = action.ok;
      const message = action.message;

      return {
        ...state,
        ok,
        message,
      };
    }

    case SET_LOGIN_USER:
      const user = action.user;
      const management = user.admin;

      return {
        ...state,
        user,
        management,
      };

    case UPDATE_USER_INFO_RESPONSE:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default LoginReducer;
