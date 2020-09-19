export const ADD_QUOTA = 'ADD_QUOTA';
export const CHANGE_FORM_CRITERIA = 'CHANGE_FORM_CRITERIA';
export const UPDATE_STUDY_BASIC_INFO = 'UPDATE_STUDY_BASIC_INFO';
export const EDIT_STUDY = 'EDIT_STUDY';
export const REMOVE_QUOTA = 'REMOVE_QUOTA';
export const RESET_CHANGE = 'RESET_CHANGE';
export const SAVE_STUDY_INFO = 'SAVE_STUDY_INFO';
export const SET_BASIC_INFO = 'SET_BASIC_INFO';
export const SET_BASIC_INFO_SNAPSHOT = 'SET_BASIC_INFO_SNAPSHOT';
export const ADD_PORTRAIT = 'ADD_PORTRAIT';
export const EDIT_PORTRAIT = 'EDIT_PORTRAIT';
export const UPDATE_CRITERIA = 'UPDATE_CRITERIA';
export const UPDATE_QUOTA = 'UPDATE_QUOTA';
export const REMOVE_PORTRAIT = 'REMOVE_PORTRAIT';
export const UPDATE_PORTRAIT = 'UPDATE_PORTRAIT';
export const REMOVE_PORTRAIT_QUOTA = 'REMOVE_PORTRAIT_QUOTA';
export const SET_DAILY_QUESTIONS = 'SET_DAILY_QUESTIONS';
export const SET_WHITELIST = 'SET_WHITELIST';
export const SET_CODE = 'SET_CODE';
export const RESET_PORTRAIT = 'RESET_PORTRAIT';

export const setBasicInfo = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_BASIC_INFO, payload });
  };
};

export const setDailyQuestions = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_DAILY_QUESTIONS, payload });
  };
};

export const setWhitelist = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_WHITELIST, payload });
  };
};

export const setCode = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_CODE, payload });
  };
};

export const setEditStudy = (payload) => {
  return (dispatch) => {
    dispatch({ type: EDIT_STUDY, payload });
  };
};

export const onChangeFormCriteria = (name, value) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_FORM_CRITERIA, name, payload: value });
  };
};

export const updateStudyBasicInfo = (name, value) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_STUDY_BASIC_INFO, name, payload: value });
  };
};

export const onSaveFormInfo = (data) => {
  return (dispatch) => {
    dispatch({ type: SAVE_STUDY_INFO, payload: data });
  };
};

export const resetChangeCreateStudy = () => {
  return (dispatch) => {
    dispatch({ type: RESET_CHANGE });
  };
};

export const addQuotaObject = (obj) => {
  return (dispatch) => {
    dispatch({ type: ADD_QUOTA, payload: obj });
  };
};

export const removeQuotaObject = (obj) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_QUOTA, payload: obj });
  };
};

export const setBasicInfoSnapshot = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_BASIC_INFO_SNAPSHOT, payload });
  };
};

export const addPortrait = (payload) => {
  return (dispatch) => {
    dispatch({ type: ADD_PORTRAIT, payload });
  };
};

export const editPortrait = (payload) => {
  return (dispatch) => {
    dispatch({ type: EDIT_PORTRAIT, payload });
  };
};

export const updateCriteria = (payload) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_CRITERIA, payload });
  };
};

export const updateQuota = (payload) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_QUOTA, payload });
  };
};

export const removePortrait = (payload) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_PORTRAIT, payload });
  };
};

export const updatePortrait = (payload) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_PORTRAIT, payload });
  };
};

export const removePortraitQuota = (payload) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_PORTRAIT_QUOTA, payload });
  };
};

export const resetPortrait = () => {
  return (dispatch) => {
    dispatch({ type: RESET_PORTRAIT });
  };
};
