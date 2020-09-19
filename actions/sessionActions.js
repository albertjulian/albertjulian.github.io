import Auth from '@aws-amplify/auth';
import PopCall from '../utils/popCall';
import reduxStore from '../store';

export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS';
export const SESSION_LOGIN_FAILED = 'SESSION_LOGIN_FAILED';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';

/**
 * Login function
 * @param {string} username
 * @param {string} password
 */
export const login = (username, password) => {
  return async (dispatch) => {
    dispatch({
      type: SESSION_LOGIN,
    });

    try {
      const popCall = new PopCall();

      // sign in on AWS Cognito
      await Auth.signIn(username, password);
      // get profile from backend
      const { data } = await popCall.get('/profile');

      if (
        !data.groups.includes('researcher') &&
        !data.groups.includes('admin')
      ) {
        // eslint-disable-next-line no-throw-literal
        throw {
          code: 'ParticipantNotAuthorizedException',
        };
      }

      return dispatch({
        type: SESSION_LOGIN_SUCCESS,
        payload: {
          email: data && data.email,
          firstName: data && data.name,
          lastName: data && data.family_name,
          companyName: data && data.company_name,
          isAdmin: data && data.groups && data.groups.includes('admin'),
          picture: data && data.picture,
        },
      });
    } catch (err) {
      let errorData = {};
      if (err && err.code === 'NotAuthorizedException') {
        errorData = {
          errorCode: '',
          errorMessage: 'Invalid Email or password.',
        };
      } else if (err && err.code === 'UserNotFoundException') {
        errorData = {
          errorCode: '',
          errorMessage: 'User not found.',
        };
      } else if (err && err.code === 'UserNotConfirmedException') {
        sessionStorage.setItem('newUserEmail', username);
        errorData = {
          errorCode: 'UserNotConfirmedException',
          errorMessage: 'Please confirm your Email and try again.',
        };
      } else if (err && err.code === 'ParticipantNotAuthorizedException') {
        errorData = {
          errorCode: '',
          errorMessage:
            'This account is not registered as Researcher. Please use another account / email.',
        };
      }

      dispatch({
        type: SESSION_LOGIN_FAILED,
        payload: errorData,
      });
      throw err;
    }
  };
};

export const logout = () => async (dispatch) => {
  await Auth.signOut();
  reduxStore.persistor.purge();
  dispatch({
    type: SESSION_LOGOUT,
  });
};
