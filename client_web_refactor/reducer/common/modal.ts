import {
  ModalAction,
  SET_ACCESS_LOG_MODAL_SHOW,
  SET_LOGIN_MODAL_SHOW, SET_REGISTER_MODAL_SHOW, SET_SYS_LOG_MODAL_SHOW, SET_USER_MANAGEMENT_MODAL_SHOW,
  SET_USERINFO_MODAL_SHOW,
} from "@/action/common/modal";

export interface IModalState {
  loginModalShow: boolean;
  registerModalShow: boolean;
  userInfoModalShow: boolean;
  userManagementModalShow: boolean;
  sysLogModalShow: boolean;
  accessLogModalShow: boolean;
}

const initialState: IModalState = {
  loginModalShow: false,
  registerModalShow: false,
  userInfoModalShow: false,
  userManagementModalShow: false,
  sysLogModalShow: false,
  accessLogModalShow: false,
};

export default function navigationReducer(state: IModalState = initialState, action: ModalAction): IModalState {
  const { show } = action;

  switch (action.type) {
    case SET_LOGIN_MODAL_SHOW:
      return {
        ...state,
        loginModalShow: show,
      };

    case SET_REGISTER_MODAL_SHOW:
      return {
        ...state,
        registerModalShow: show,
      };

    case SET_USERINFO_MODAL_SHOW:
      return {
        ...state,
        userInfoModalShow: show,
      };

    case SET_USER_MANAGEMENT_MODAL_SHOW:
      return {
        ...state,
        userManagementModalShow: show,
      };

    case SET_SYS_LOG_MODAL_SHOW:
      return {
        ...state,
        sysLogModalShow: show,
      };

    case SET_ACCESS_LOG_MODAL_SHOW:
      return {
        ...state,
        accessLogModalShow: show,
      };

    default:
      return state;
  }
}
