import { Action } from "redux";

export const SET_UPLOAD_MODAL_SHOW = "SET_UPLOAD_MODAL_SHOW";
export interface ISetUploadModalShowAction extends Action<typeof SET_UPLOAD_MODAL_SHOW> {
  show: boolean;
}

export enum UploadStatus {
  NONE, SUCCESS, ERROR
}

export interface IUploadResponse {
  status: UploadStatus;
  message?: string;
  url?: string;
}

export const UPLOAD_RESPONSE = "UPLOAD_RESPONSE";
export interface IUploadResponseAction extends Action<typeof UPLOAD_RESPONSE>, IUploadResponse {}

export type UploadAction = ISetUploadModalShowAction | IUploadResponseAction;
