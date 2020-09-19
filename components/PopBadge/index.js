import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: 3,
    textAlign: 'center',
    display: 'inline-block',
    padding: '4px 10px',
    textTransform: 'uppercase',
    color: 'white',
  },
  // might need to move this to palette
  statusPending: {
    backgroundColor: theme.palette.info.main, // #2196F3',
  },
  statusInProgress: {
    backgroundColor: theme.palette.warning.main, // '#FFC107',
  },
  statusCompleted: {
    backgroundColor: theme.palette.success.main, // #27AE60',
  },
  statusUnfulfilled: {
    backgroundColor: theme.palette.error.main,
  },
}));

function PopBadge({ study }) {
  const classes = useStyles();
  const requiredParticipants = parseInt(study.requiredParticipants, 10) || 0;
  const participantDone = parseInt(study.participantDone, 0) || 0;
  let statusText = 'Pending';
  let studyStatusColor = classes.statusPending;

  if (participantDone === requiredParticipants) {
    statusText = 'Fulfilled';
    studyStatusColor = classes.statusCompleted;
  } else if (study.status === 'ACTIVE') {
    statusText = 'In Progress';
    studyStatusColor = classes.statusInProgress;
  } else if (study.status === 'STOP') {
    statusText = 'Unfulfilled';
    studyStatusColor = classes.statusUnfulfilled;
  }

  return (
    <div className={clsx(classes.container, studyStatusColor)}>
      <Typography
        variant="body2"
        style={{
          color: 'white',
        }}
      >
        {statusText}
      </Typography>
    </div>
  );
}

PopBadge.propTypes = {
  study: PropTypes.object,
};

export default PopBadge;
