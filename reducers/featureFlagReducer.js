import * as actionTypes from '../actions/featureFlagActions';

const initialState = {};

export default function featureFlagReducer(state = initialState, actions) {
  const { payload, type } = actions;
  switch (type) {
    case actionTypes.SET_FEATURE_FLAG:
      return { ...state, ...payload };
    case actionTypes.GET_FEATURE_FLAG:
      return { ...state, ...payload };
    default:
      return state;
  }
}
