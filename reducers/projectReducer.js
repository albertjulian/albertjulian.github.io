import * as actionTypes from 'src/actions';

const initialState = {
  formBasicInfo: {
    type: '',
    title: '',
    objective: '',
    clientEmail: '',
    clientName: '',
    companyName: '',
    isInternalProject: false,
  },
};

const projectReducer = (state = initialState, actions) => {
  const { payload, type } = actions;
  switch (type) {
    case actionTypes.SET_PROJECT_BASIC_INFO:
      return {
        ...state,
        formBasicInfo: {
          ...payload,
        },
      };
    default:
      return state;
  }
};

export default projectReducer;
