import { Dispatch } from "redux";
import { change, startSubmit, stopSubmit } from "redux-form";
import msg from "./notify";
import {
  ApiResultCode, FAIL_RESULT, getToken, IApiResult, removeToken, setToken,
} from "@/api";
import { fetchLogin, fetchRefresh } from "@/api/auth";
import { IUser } from "@/define/user";
import { IThunkAction } from "@/store";
import { FORM_LOGIN, FORM_USERINFO } from "../form";
import { getAccessCount } from "../log/accessLog";
import { setLoginModalShow } from "./modal";
import {
  ILoginClearAction,
  ILoginResponseAction,
  ISetLoginUserAction, ISetManagementAction,
  LOGIN_CLEAR, LOGIN_RESPONSE,
  LoginStatus,
  SET_LOGIN_USER, SET_MANAGEMENT,
} from "@/action/common/login";
import { IAuthResponse } from "@/define/auth";

export function loginClear(): ILoginClearAction {
  return {
    type: LOGIN_CLEAR,
  };
}

export function setLoginUser(user: IUser): ISetLoginUserAction {
  user.password = undefined;
  return {
    type: SET_LOGIN_USER,
    user,
  };
}

export function loginResponse(status: LoginStatus, message: string): ILoginResponseAction {
  return {
    type: LOGIN_RESPONSE,
    status,
    message,
  };
}

export function afterLogin(
  result: IApiResult<IAuthResponse | null>,
  dispatch: Dispatch, alert: boolean,
) {
  let status = LoginStatus.ERROR;
  let message = "";

  if (result.code === ApiResultCode.OK) {
    dispatch(setLoginModalShow(false));

    const { entity } = result;

    const { user } = entity!;
    dispatch(setLoginUser(user));

    setToken(entity!);

    dispatch(change(FORM_USERINFO, "id", user.id));
    dispatch(change(FORM_USERINFO, "username", user.username));
    dispatch(change(FORM_USERINFO, "nickname", user.nickname));

    if (alert) {
      msg.success("登录成功");
    }

    status = LoginStatus.SUCCESS;
  } else if (result.code === ApiResultCode.Unauthorized) {
    status = LoginStatus.NONE;
  } else {
    msg.error(result.message);
    message = result.message;
  }

  dispatch(loginResponse(status, message));
}

export function login(username: string, password: string): IThunkAction {
  return async (dispatch) => {
    dispatch(startSubmit(FORM_LOGIN));
    try {
      const result = await fetchLogin(username, password);
      dispatch(stopSubmit(FORM_LOGIN));
      afterLogin(result, dispatch, true);
    } catch (e) {
      afterLogin(FAIL_RESULT, dispatch, true);
    }
  };
}

export function logout(): IThunkAction {
  return (dispatch) => {
    removeToken();

    msg.info("登出成功");
    dispatch(loginClear());
  };
}

export function setManagement(management: boolean): ISetManagementAction {
  return {
    type: SET_MANAGEMENT,
    management,
  };
}

export function checkUserLoginState(): IThunkAction {
  return async (dispatch) => {
    const token = getToken();

    try {
      const result = await fetchRefresh(token);
      if (result.code === ApiResultCode.Unauthorized) {
        removeToken();
      }

      afterLogin(result, dispatch, false);
      dispatch(getAccessCount());
    } catch (e) {
      afterLogin(FAIL_RESULT, dispatch, false);
    }
  };
}
