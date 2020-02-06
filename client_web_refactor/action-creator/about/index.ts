import { useRouter } from "next/router";
import { startSubmit, stopSubmit } from "redux-form";
import msg from "@/action-creator/common/notify";
import { ApiResultCode, IApiResult } from "@/api";
import { fetchGetAbout, fetchUpdateAbout } from "@/api/about";
import { IThunkAction } from "@/store";
import {
  GET_ABOUT_RESPONSE,
  IGetAboutResponseAction,
  ISetAboutAction,
  ISetAboutLoadingAction, IUpdateAboutResponseAction,
  SET_ABOUT,
  SET_ABOUT_LOADING, UPDATE_ABOUT_RESPONSE,
} from "@/action/about";
import { IAbout } from "@/define/about";
import { FORM_ABOUT } from "../form";

export function setAbout(about: IAbout): ISetAboutAction {
  return {
    type: SET_ABOUT,
    about,
  };
}

export function setAboutLoading(loading: boolean): ISetAboutLoadingAction {
  return {
    type: SET_ABOUT_LOADING,
    loading,
  };
}

function getAboutResponse(result: IApiResult<IAbout>): IGetAboutResponseAction {
  return {
    type: GET_ABOUT_RESPONSE,
    about: result.entity,
  };
}

export function getAbout(): IThunkAction {
  return async (dispatch) => {
    dispatch(setAboutLoading(true));

    const result = await fetchGetAbout();
    dispatch(setAboutLoading(false));
    dispatch(getAboutResponse(result));
  };
}

function updateAboutResponse(about: IAbout): IUpdateAboutResponseAction {
  return {
    type: UPDATE_ABOUT_RESPONSE,
    about,
  };
}

export function updateAbout(about: IAbout, back: boolean): IThunkAction {
  return async (dispatch) => {
    dispatch(startSubmit(FORM_ABOUT));

    const result = await fetchUpdateAbout(about);
    dispatch(stopSubmit(FORM_ABOUT, result.errors));

    if (result.code === ApiResultCode.OK) {
      msg.success("更新关于成功");
      dispatch(updateAboutResponse(result.entity));
      if (back) {
        const router = useRouter();
        await router.push("/about");
      }
    } else {
      msg.error(result.message);
    }
  };
}
