export const SET_FEATURE_FLAG = 'SET_FEATURE_FLAG';
export const GET_FEATURE_FLAG = 'GET_FEATURE_FLAG';

export const setFeatureFlag = (value) => ({
  type: SET_FEATURE_FLAG,
  payload: value,
});

export const getFeatureFlag = () => ({
  type: GET_FEATURE_FLAG,
});
