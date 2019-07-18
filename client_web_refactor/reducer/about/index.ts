import {AboutAction, GET_ABOUT_RESPONSE, SET_ABOUT, UPDATE_ABOUT_RESPONSE} from "../../action/about";

export interface IAboutState {
    content: {
        text: string;
        selection: any;
    };
    loading: boolean;
}

const initialState: IAboutState = {
    content : {
        text: "",
        selection: null,
    },
    loading : true,
};

function convert(action: AboutAction, state: IAboutState): IAboutState {
    const about = action.about;
    const convertAbout = {
        ...about,
        loading: false,
        content: {
            text : about.content,
            selection: null,
        },
    };
    return {...state, ...convertAbout};
}

export default function aboutReducer(state: IAboutState = initialState, action: AboutAction) {
    switch (action.type) {
        case SET_ABOUT:
            return {...state, ...action.about};

        case GET_ABOUT_RESPONSE: case UPDATE_ABOUT_RESPONSE:
            return convert(action, state);

        default:
            return state;
    }
}
