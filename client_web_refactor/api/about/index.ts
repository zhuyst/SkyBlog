import {
  ABOUT_API_URL, httpGet, httpPut, IApiResult,
} from "@/api";

export interface IAbout {
  content: string;
}

export const fetchGetAbout = () => httpGet<IAbout>(`${ABOUT_API_URL}/public/`);

export const fetchUpdateAbout = (about: IAbout): Promise<IApiResult<IAbout>> => httpPut<IAbout>(`${ABOUT_API_URL}/`, about);
