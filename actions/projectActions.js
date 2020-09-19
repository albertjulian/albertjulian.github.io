export const SET_PROJECT_BASIC_INFO = 'SET_PROJECT_BASIC_INFO';

export const setProjectBasicInfo = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_PROJECT_BASIC_INFO, payload });
  };
};
