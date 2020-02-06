import { Action } from "redux";
import { IAbout } from "@/define/about";

export const SET_ABOUT = "SET_ABOUT";
export interface ISetAboutAction extends Action<typeof SET_ABOUT> {
  about: IAbout;
}

export const SET_ABOUT_LOADING = "SET_ABOUT_LOADING";
export interface ISetAboutLoadingAction extends Action<typeof SET_ABOUT_LOADING> {
  loading: boolean;
}

export const GET_ABOUT_RESPONSE = "GET_ABOUT_RESPONSE";
export interface IGetAboutResponseAction extends Action<typeof GET_ABOUT_RESPONSE> {
  about: IAbout;
}

export const UPDATE_ABOUT_RESPONSE = "UPDATE_ABOUT_RESPONSE";
export interface IUpdateAboutResponseAction extends Action<typeof UPDATE_ABOUT_RESPONSE> {
  about: IAbout;
}

export type AboutAction = ISetAboutAction | IGetAboutResponseAction | IUpdateAboutResponseAction;
