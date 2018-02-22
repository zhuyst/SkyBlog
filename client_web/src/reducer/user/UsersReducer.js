import {LIST_USERS_RESPONSE} from "../../action/user/UsersAction";

const initialState = {
    list : [],
    page_num : 1,
    pages : 0,
    total : 0,
};

const UserReducer = (state = initialState,action) =>{
    switch (action.type){
        case LIST_USERS_RESPONSE:
            return Object.assign({},state,action.page);

        default:
            return state;
    }
};

export default UserReducer;