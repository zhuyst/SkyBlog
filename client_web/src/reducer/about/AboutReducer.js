import {GET_ABOUT_RESPONSE, UPDATE_ABOUT_RESPONSE} from "../../action/about/AboutAction";

const initialState = {
    content : ""
};

const AboutReducer = (state = initialState,action) => {
    switch (action.type){
        case GET_ABOUT_RESPONSE:
            return Object.assign({},state,action.about);

        case UPDATE_ABOUT_RESPONSE:
            return Object.assign({},state,action.about);

        default:
            return state;
    }
};

export default AboutReducer