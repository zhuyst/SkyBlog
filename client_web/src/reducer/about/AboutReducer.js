import { GET_ABOUT_RESPONSE, SET_ABOUT, UPDATE_ABOUT_RESPONSE } from '../../action/about/AboutAction';

const initialState = {
  content: {
    text: '',
    selection: null,
  },
  loading: true,
};

const convert = (action, state) => {
  const about = action.about;
  const convertAbout = {
    ...about,
    loading: false,
    content: {
      text: about.content,
      selection: null,
    },
  };
  return Object.assign({}, state, convertAbout);
};

const AboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ABOUT:
      return Object.assign({}, state, action.about);

    case GET_ABOUT_RESPONSE:
      return convert(action, state);

    case UPDATE_ABOUT_RESPONSE:
      return convert(action, state);

    default:
      return state;
  }
};

export default AboutReducer;
