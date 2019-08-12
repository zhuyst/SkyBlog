import { message as msg } from "antd";
import { useRouter } from "next/router";
import {Action} from "redux";
import {startSubmit, stopSubmit} from "redux-form";
import {ApiResultCode, IApiResult} from "../../api";
import {fetchGetAbout, fetchUpdateAbout, IAbout} from "../../api/about";
import {IThunkAction} from "../../store";
import {FORM_ABOUT} from "../form";

export const SET_ABOUT = "SET_ABOUT";
export interface ISetAboutAction extends Action<typeof SET_ABOUT> {
    about: IAbout;
}
export function setAbout(about: IAbout): ISetAboutAction {
    return {
        type : SET_ABOUT,
        about,
    };
}

export const SET_ABOUT_LOADING = "SET_ABOUT_LOADING";
export interface ISetAboutLoadingAction extends Action<typeof SET_ABOUT_LOADING> {
    loading: boolean;
}
export function setAboutLoading(loading: boolean): ISetAboutLoadingAction {
    return {
        type : SET_ABOUT_LOADING,
        loading,
    };
}

export const GET_ABOUT_RESPONSE = "GET_ABOUT_RESPONSE";
export interface IGetAboutResponseAction extends Action<typeof GET_ABOUT_RESPONSE> {
    about: IAbout;
}
function getAboutResponse(result: IApiResult<IAbout>): IGetAboutResponseAction {
    return {
        type : GET_ABOUT_RESPONSE,
        about : result.entity,
    };
}

export function getAbout(about: IAbout): IThunkAction {
    return async (dispatch) => {
        dispatch(setAboutLoading(true));

        const result = await fetchGetAbout(about);
        dispatch(setAboutLoading(false));
        dispatch(getAboutResponse(result));
    };
}

export const UPDATE_ABOUT_RESPONSE = "UPDATE_ABOUT_RESPONSE";
export interface IUpdateAboutResponseAction extends Action<typeof UPDATE_ABOUT_RESPONSE> {
    about: IAbout;
}
function updateAboutResponse(about: IAbout): IUpdateAboutResponseAction {
    return {
        type : UPDATE_ABOUT_RESPONSE,
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

export type AboutAction = ISetAboutAction | IGetAboutResponseAction | IUpdateAboutResponseAction;
