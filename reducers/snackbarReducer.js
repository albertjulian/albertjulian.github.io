import * as actionTypes from 'src/actions';

const initialState = {
  show: false,
  message: '',
  variant: 'default',
  anchorOrigin: undefined,
};

const snackbarReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SHOW_SNACKBAR: {
      return {
        ...state,
        ...payload,
      };
    }
    case actionTypes.HIDE_SNACKBAR: {
      return {
        ...state,
        ...payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default snackbarReducer;
