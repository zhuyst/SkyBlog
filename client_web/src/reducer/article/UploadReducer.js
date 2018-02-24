import {SET_UPLOAD_MODAL_SHOW, UPLOAD_RESPONSE} from "../../action/article/UploadAction";

const initialState = {
    uploadModal_show : false,
    response : {
        ok : null,
        message : null,
        url : ""
    }
};

export const UploadReducer = (state = initialState,action) => {
    switch (action.type){
        case SET_UPLOAD_MODAL_SHOW:
            return {
                ...state,
                uploadModal_show: action.show
            };
        case UPLOAD_RESPONSE:
            const result = action.result;

            if(result.code === 200){
                return {
                    ...state,
                    response : {
                        ok : true,
                        message : result.message,
                        url : result.entity.url
                    }
                }
            }
            else {
                return {
                    ...state,
                    response : {
                        ok : false,
                        message : result.message
                    }
                }
            }
        default:
            return state;
    }
};

export default UploadReducer