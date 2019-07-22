import {Action} from "redux";
import {ApiResultCode, IApiResult} from "../../api";

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

export interface IUploadResponse {
    ok: boolean;
    message: string;
    url?: string;
}

export const UPLOAD_RESPONSE = "UPLOAD_RESPONSE";
export interface IUploadResponseAction extends Action<typeof UPLOAD_RESPONSE>, IUploadResponse {}
export function uploadResponse(result: IApiResult<IUploadResult>): IUploadResponseAction {
    const isSuccess = result.code === ApiResultCode.OK;

    const action: IUploadResponseAction = {
        type : UPLOAD_RESPONSE,
        ok: isSuccess,
        message : result.message,
    };

    if (isSuccess) {
        action.url = result.entity.url;
    }

    return action;
}

export type UploadAction = ISetUploadModalShowAction | IUploadResponseAction;
