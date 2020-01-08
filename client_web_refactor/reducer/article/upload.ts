import {
  IUploadResponse, SET_UPLOAD_MODAL_SHOW, UPLOAD_RESPONSE, UploadAction,
} from "@/action/article/upload";

export interface IUploadState {
  uploadModalShow: boolean;
  response: IUploadResponse;
}

const initialState: IUploadState = {
  uploadModalShow: false,
  response: {
    ok: null,
    message: null,
    url: "",
  },
};

export default function uploadReducer(
  state: IUploadState = initialState,
  action: UploadAction,
): IUploadState {
  switch (action.type) {
    case SET_UPLOAD_MODAL_SHOW:
      return {
        ...state,
        uploadModalShow: action.show,
      };
    case UPLOAD_RESPONSE:
      return {
        ...state,
        response: {
          ok: action.ok,
          message: action.message,
          url: action.url,
        },
      };

    default:
      return state;
  }
}
