import * as actionTypes from 'src/actions';
import { PURGE } from 'redux-persist';

const initialState = {
  loggedIn: false,
  user: null,
  error: null,
  isError: false,
  isLoading: false,
};

const sessionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SESSION_LOGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionTypes.SESSION_LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        user: payload,
        error: null,
        isError: false,
        isLoading: false,
      };
    }
    case actionTypes.SESSION_LOGIN_FAILED: {
      return {
        ...state,
        loggedIn: false,
        user: null,
        error: payload,
        isError: true,
        isLoading: false,
      };
    }
    case actionTypes.SESSION_LOGOUT: {
      return {
        ...initialState,
      };
    }
    case PURGE: {
      return {
        ...initialState,
      };
    }
    case actionTypes.UPDATE_PROFILE: {
      return {
        ...state,
        user: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default sessionReducer;
