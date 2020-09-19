export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_SNACKBAR = 'HIDE_SNACKBAR';

export const showSnackbar = (
  message = '',
  variant = 'default',
  anchorOrigin,
) => (dispatch) => {
  dispatch({
    type: SHOW_SNACKBAR,
    payload: {
      show: true,
      message,
      variant,
      anchorOrigin,
    },
  });
};

export const hideSnackbar = () => (dispatch) => {
  dispatch({
    type: SHOW_SNACKBAR,
    payload: {
      show: false,
    },
  });
};
