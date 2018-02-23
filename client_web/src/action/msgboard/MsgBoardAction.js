import {startSubmit,stopSubmit} from 'redux-form'

import {error, success} from "../common/NotifyAction";
import {_delete, _get, _post, MSG_BOARD_API_URL} from "../../Api";
import {FORM_MSG, MSG_PAGE_SIZE} from "../../Constant";

export const LIST_MSG_RESPONSE = "LIST_MSG_RESPONSE";

export const INSERT_MSG_RESPONSE = "INSERT_MSG_RESPONSE";
export const DELETE_MSG_RESPONSE = "DELETE_MSG_RESPONSE";

export const insertMsg = (msg, pageNum) => dispatch => {
    dispatch(startSubmit(FORM_MSG));

    const url = MSG_BOARD_API_URL + "/";
    return _post(url,msg)
        .then(result => {
            dispatch(stopSubmit(FORM_MSG,result.errors));

            if(result.code === 200){
                dispatch(success("新增留言成功"));
                dispatch(insertMsgResponse(result));

                reloadMsg(pageNum,dispatch);
            }
            else {
                dispatch(error(result.message));
            }
        });
};

const insertMsgResponse = result => {
    return {
        type : INSERT_MSG_RESPONSE,
        comment : result.entity
    }
};

export const listMsg = (pageNum,pageSize) => dispatch => {
    const url = MSG_BOARD_API_URL + "/public/list/";
    return _get(url,{
        pageNum : pageNum,
        pageSize: pageSize
    }).then(result => dispatch(listMsgResponse(result)))
};

const listMsgResponse = result => {
    return {
        type : LIST_MSG_RESPONSE,
        page : result.entity
    }
};

export const deleteMsg = (id,pageNum) => dispatch => {
    dispatch(startSubmit(FORM_MSG));

    const url = MSG_BOARD_API_URL + `/${id}`;
    return _delete(url)
        .then(result => {
            dispatch(stopSubmit(FORM_MSG,result.errors));

            if(result.code === 200){
                dispatch(success("删除评论成功"));
                dispatch(deleteMsgResponse(id));

                reloadMsg(pageNum,dispatch);
            }
            else {
                dispatch(error(result.message));
            }
        })
};

const deleteMsgResponse = result => {
    return {
        type : DELETE_MSG_RESPONSE,
        result : result
    }
};

const reloadMsg = (pageNum,dispatch) => {
    // 重新加载大小为 pageNum*pageSize 的评论列表
    const pageSize = pageNum * MSG_PAGE_SIZE;
    dispatch(listMsg(1,pageSize))
};
