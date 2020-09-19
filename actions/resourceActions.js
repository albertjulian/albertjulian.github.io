/* DOMICILE */
export const SET_DOMICILE = 'SET_DOMICILE';
/* Screening Options */
export const SET_SCREENING_OPTION = 'SET_SCREENING_OPTION';
/* Profile Picture */
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
/* Profile Picture */
export const SET_PROVINCE = 'SET_PROVINCE';

/**
 * Store domicile data
 *
 * @param {array} payload
 */
export const setDomicile = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_DOMICILE, payload });
  };
};

/**
 * Store screening options data
 *
 * @param {array} payload
 */
export const setScreeningOption = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_SCREENING_OPTION, payload });
  };
};

/**
 * Store screening options data
 *
 * @param {object} payload
 */
export const updateProfile = (payload) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_PROFILE, payload });
  };
};

/**
 * Store province data
 *
 * @param {array} payload
 */
export const setProvinces = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_PROVINCE, payload });
  };
};
