import * as actionTypes from 'src/actions';

const initialState = {
  provinces: null,
};

const resourceReducer = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_PROVINCE:
      return {
        ...state,
        provinces: payload,
      };
    default:
      return state;
  }
};

export default resourceReducer;
