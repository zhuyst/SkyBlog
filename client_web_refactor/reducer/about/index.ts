import {AboutAction, GET_ABOUT_RESPONSE, SET_ABOUT, UPDATE_ABOUT_RESPONSE} from "../../action/about";

export interface IAboutState {
    markdownContent: {
        text: string;
        selection: any;
    };
    loading: boolean;
}

const initialState: IAboutState = {
    markdownContent: {
        text: "",
        selection: null,
    },
    loading: true,
};

export default function aboutReducer(state: IAboutState = initialState, action: AboutAction) {
    switch (action.type) {
        case SET_ABOUT:
            return {...state, ...action.about};

        case GET_ABOUT_RESPONSE: case UPDATE_ABOUT_RESPONSE:
            const { about } = action;
            return {
                ...state,
                ...about,
                loading: false,
                markdownContent: {
                    text : about.content,
                    selection: null,
                },
            };

        default:
            return state;
    }
}
