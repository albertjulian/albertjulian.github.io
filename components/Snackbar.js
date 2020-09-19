import React from 'react';
import PropTypes from 'prop-types';
import MuiSnackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import Alert from 'src/components/Alert';

const Snackbar = ({
  open,
  onClose,
  message,
  variant,
  anchorOrigin = { vertical: 'top', horizontal: 'center' },
}) => (
  <MuiSnackbar
    open={open}
    autoHideDuration={5000}
    onClose={onClose}
    key="top,center"
    anchorOrigin={anchorOrigin}
    TransitionComponent={Fade}
  >
    <Alert message={message} onClose={onClose} variant={variant} />
  </MuiSnackbar>
);

Snackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  anchorOrigin: PropTypes.object,
};

export default Snackbar;
