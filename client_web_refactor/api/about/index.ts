import {
  ABOUT_API_URL, httpGet, httpPut, IApiResult,
} from "../index";

export interface IAbout {
  content: string;
}

export const fetchGetAbout = (about: IAbout) => httpGet<IAbout>(`${ABOUT_API_URL}/public/`, about);

export const fetchUpdateAbout = (about: IAbout): Promise<IApiResult<IAbout>> => httpPut<IAbout>(`${ABOUT_API_URL}/`, about);
