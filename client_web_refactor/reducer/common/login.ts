import {
  LOGIN_CLEAR,
  LOGIN_RESPONSE,
  LoginAction,
  LoginStatus,
  SET_LOGIN_USER,
  SET_MANAGEMENT,
} from "@/action/common/login";
import { UPDATE_USER_INFO_RESPONSE } from "@/action/user";
import { IUser } from "@/define/user";

const initialUser: IUser = {
  id: 0,
  username: "",
  nickname: "",
  admin: false,
};

export interface ILoginState {
  status: LoginStatus;
  message: string;
  management: boolean;
  user: IUser;
}

const initialState: ILoginState = {
  status: LoginStatus.NONE,
  message: "",
  management: false,
  user: initialUser,
};

export default function loginReducer(
  state: ILoginState = initialState,
  action: LoginAction,
): ILoginState {
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
        status: LoginStatus.NONE,
        user: initialUser,
        management: false,
      };
    }

    case LOGIN_RESPONSE: {
      const { status, message } = action;

      return {
        ...state,
        status,
        message,
      };
    }

    case SET_LOGIN_USER: {
      const { user } = action;
      const management = user.admin!;

      return {
        ...state,
        user,
        management,
      };
    }

    case UPDATE_USER_INFO_RESPONSE: {
      const { user } = action;
      return {
        ...state,
        user,
      };
    }

    default:
      return state;
  }
}
