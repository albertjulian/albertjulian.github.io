import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Snackbar from 'src/components/Snackbar';
import { hideSnackbar } from 'src/actions';

const SnackbarWrapper = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar);
  const { show, message, variant, anchorOrigin } = snackbar;

  return (
    <Snackbar
      open={show}
      onClose={() => dispatch(hideSnackbar())}
      message={message}
      variant={variant}
      anchorOrigin={anchorOrigin}
    />
  );
};

export default SnackbarWrapper;
