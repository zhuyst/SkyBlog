import { ApiResultCode, IApiResult } from "@/api";
import {
  ISetUploadModalShowAction,
  IUploadResponseAction,
  SET_UPLOAD_MODAL_SHOW, UPLOAD_RESPONSE,
  UploadStatus,
} from "@/action/article/upload";

export function setUploadModalShow(show: boolean): ISetUploadModalShowAction {
  return {
    type: SET_UPLOAD_MODAL_SHOW,
    show,
  };
}

export interface IUploadResult {
  url: string;
}

export interface IUploadResponse {
  status: UploadStatus;
  message?: string;
  url?: string;
}

export function uploadResponse(result: IApiResult<IUploadResult>): IUploadResponseAction {
  const isSuccess = result.code === ApiResultCode.OK;

  const action: IUploadResponseAction = {
    type: UPLOAD_RESPONSE,
    status: isSuccess ? UploadStatus.SUCCESS : UploadStatus.ERROR,
    message: result.message,
  };

  if (isSuccess) {
    action.url = result.entity.url;
  }

  return action;
}
