import {Action} from "redux";
import {IApiResult} from "../../api";

export const SET_UPLOAD_MODAL_SHOW = "SET_UPLOAD_MODAL_SHOW";
export interface ISetUploadModalShowAction extends Action<typeof SET_UPLOAD_MODAL_SHOW> {
    show: boolean;
}
export function setUploadModalShow(show: boolean): ISetUploadModalShowAction {
    return {
        type : SET_UPLOAD_MODAL_SHOW,
        show,
    };
}

export interface IUploadResult {
    url: string;
}

export const UPLOAD_RESPONSE = "UPLOAD_RESPONSE";
export interface IUploadResponseAction extends Action<typeof UPLOAD_RESPONSE> {
    result: IApiResult<IUploadResult>;
}
export function uploadResponse(result: IApiResult<IUploadResult>): IUploadResponseAction {
    return {
        type : UPLOAD_RESPONSE,
        result,
    };
}
