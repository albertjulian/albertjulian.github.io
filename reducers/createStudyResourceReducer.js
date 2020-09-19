import * as actionTypes from 'src/actions';

const initialState = {
  domiciles: null,
  screeningOptions: null,
};

const createStudyResourceReducer = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_DOMICILE:
      return {
        ...state,
        domiciles: payload,
      };
    case actionTypes.SET_SCREENING_OPTION:
      return {
        ...state,
        screeningOptions: payload,
      };
    default:
      return state;
  }
};

export default createStudyResourceReducer;
