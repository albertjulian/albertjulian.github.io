import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  stepLabel: {
    fontSize: 14,
  },
  iconContainer: {
    paddingRight: 0,
    color: '#FFC107',
  },
  icon: {
    height: 32,
    width: 32,
    marginRight: 15,
    '&$completed': {
      color: '#EE7824',
    },
    '&$active': {
      color: '#EE7824',
    },
  },
  active: {}, // needed so &$active will work
  completed: {}, // needed so &$completed will work
  textLabel: {
    fontSize: 12,
  },
  backgroundTransparent: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'transparent',
  },
  connector: {
    paddingLeft: 20,
    paddingRight: 20,
  },
}));

export default function PopStepper({ steps, activeStep }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        className={classes.backgroundTransparent}
        connector={
          <StepConnector
            classes={{
              root: classes.connector,
            }}
          />
        }
      >
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel
                classes={{
                  label: classes.stepLabel,
                  iconContainer: classes.iconContainer,
                }}
                StepIconProps={{
                  classes: {
                    root: classes.icon,
                    active: classes.active,
                    completed: classes.completed,
                    text: classes.textLabel,
                  },
                }}
                {...labelProps}
              >
                <div style={{ fontWeight: 600 }}>{label}</div>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}

PopStepper.propTypes = {
  steps: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
};
