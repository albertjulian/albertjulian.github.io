import React from 'react';
import { withStyles } from '@material-ui/styles';
import MuiButton from '@material-ui/core/Button';

const PopButton = withStyles((theme) => ({
  root: (props) => {
    if (props.variant === 'contained') {
      switch (props.color) {
        case 'success':
          return {
            color: 'white',
            backgroundColor: theme.palette.success.main,
            '&:hover': {
              backgroundColor: theme.palette.success.dark,
              '@media (hover: none)': {
                backgroundColor: theme.palette.success.main,
              },
            },
          };
        case 'info':
          return {
            color: theme.palette.info.contrastText,
            backgroundColor: theme.palette.info.main,
            '&:hover': {
              backgroundColor: theme.palette.info.dark,
              '@media (hover: none)': {
                backgroundColor: theme.palette.info.main,
              },
            },
          };
        case 'error':
          return {
            color: theme.palette.error.contrastText,
            backgroundColor: theme.palette.error.main,
            '&:hover': {
              backgroundColor: theme.palette.error.dark,
              '@media (hover: none)': {
                backgroundColor: theme.palette.error.main,
              },
            },
          };
        case 'warning':
          return {
            color: 'white',
            backgroundColor: theme.palette.warning.main,
            '&:hover': {
              backgroundColor: theme.palette.warning.dark,
              '@media (hover: none)': {
                backgroundColor: theme.palette.warning.main,
              },
            },
          };
        default:
          return {};
      }
    } else if (props.variant === 'outlined') {
      switch (props.color) {
        case 'success':
          return {
            color: theme.palette.success.main,
            borderColor: theme.palette.success.main,
            '&:hover': {
              borderColor: theme.palette.success.dark,
              '@media (hover: none)': {
                borderColor: theme.palette.success.main,
              },
            },
          };
        case 'info':
          return {
            color: theme.palette.info.main,
            borderColor: theme.palette.info.main,
            '&:hover': {
              borderColor: theme.palette.info.dark,
              '@media (hover: none)': {
                borderColor: theme.palette.info.main,
              },
            },
          };
        case 'error':
          return {
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main,
            '&:hover': {
              borderColor: theme.palette.error.dark,
              '@media (hover: none)': {
                borderColor: theme.palette.error.main,
              },
            },
          };
        case 'warning':
          return {
            color: theme.palette.warning.main,
            borderColor: theme.palette.warning.main,
            '&:hover': {
              borderColor: theme.palette.warning.dark,
              '@media (hover: none)': {
                borderColor: theme.palette.warning.main,
              },
            },
          };
        default:
          return {};
      }
    } else if (props.variant === 'text') {
      switch (props.color) {
        case 'success':
          return {
            color: theme.palette.success.main,
          };
        case 'info':
          return {
            color: theme.palette.info.main,
          };
        case 'error':
          return {
            color: theme.palette.error.main,
          };
        case 'warning':
          return {
            color: theme.palette.warning.main,
          };
        default:
          return {};
      }
    }

    return {};
  },
}))((props) => {
  const { color, ...rest } = props;
  let defaultColor;
  if (!['success', 'info', 'error', 'warning'].includes(color)) {
    defaultColor = color;
  }

  return <MuiButton {...rest} color={defaultColor} />;
});

export default PopButton;
