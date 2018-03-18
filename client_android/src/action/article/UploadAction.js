export const SET_UPLOAD_MODAL_SHOW = "SET_UPLOAD_MODAL_SHOW";
export const UPLOAD_RESPONSE = "UPLOAD_RESPONSE";

export const setUploadModalShow = show => {
    return {
        type : SET_UPLOAD_MODAL_SHOW,
        show : show
    }
};

export const uploadResponse = result => {
    return {
        type : UPLOAD_RESPONSE,
        result : result
    }
};