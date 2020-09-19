import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Link, Typography, Grid, Fab as FloatButton } from '@material-ui/core';
import clsx from 'clsx';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import studyGroupIcon from 'src/assets/images/study-group.png';
import PopButton from 'src/components/PopButton';
import { isScreeningAllUser } from 'src/utils/helper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    maxWidth: '100%',
  },
  button: {
    borderRadius: '2px',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  noShadow: {
    boxShadow: 'none',
  },
  buttonXs: {
    height: 20,
    width: 20,
    minHeight: 0,
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
      height: 15,
      width: 15,
    },
  },
  iconXs: {
    fontSize: 10,
  },
  studyGroupIcon: {
    width: '100%',
    maxWidth: 50,
    [theme.breakpoints.down('sm')]: {
      width: 40,
    },
  },
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // might want to move this to palette
  textPrimary: {
    color: '#329BFF',
  },
  textInProgress: {
    color: '#FFC107',
  },
  textSuccess: {
    color: '#27AE60',
  },
}));

function StudyGroup({
  studyGroup,
  studyGroupRedirectFrom,
  viewStudyGroupDetails,
}) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Grid container alignItems="center">
      {/* grid 3 */}
      <Grid item xs={3}>
        <Grid container spacing={1} alignItems="center">
          {/* floating button */}
          <Grid item xs={1}>
            {!isScreeningAllUser(studyGroup) && (
              <FloatButton
                disableRipple
                disableFocusRipple
                size="small"
                className={clsx(classes.buttonXs, classes.noShadow)}
              >
                {!studyGroup.isOpen ? (
                  <AddIcon classes={{ root: classes.iconXs }} />
                ) : (
                  <RemoveIcon classes={{ root: classes.iconXs }} />
                )}
              </FloatButton>
            )}
          </Grid>
          <Grid item xs={3} classes={{ root: classes.centerContent }}>
            <img
              src={studyGroupIcon}
              alt="study group icon"
              className={classes.studyGroupIcon}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6" noWrap>
              {studyGroup.title}
            </Typography>
            <Typography noWrap>
              {studyGroup.ProjectId && studyGroup.ProjectName ? (
                <Link
                  style={{ color: '#2196F3', fontSize: '13px' }}
                  size="small"
                  onClick={() => {
                    history.push(
                      `/projects/${studyGroup.ProjectId}/details/overview`,
                    );
                  }}
                >
                  {studyGroup.ProjectName}
                </Link>
              ) : (
                '-'
              )}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* grid 5 */}
      <Grid item xs={5}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="h6">{studyGroup.type}</Typography>
            <Typography variant="body2">Study Type</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">{studyGroup.startDate}</Typography>
            <Typography variant="body2">Start Date</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">{studyGroup.endDate}</Typography>
            <Typography variant="body2">End Date</Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* grid 4 */}
      <Grid item xs={4}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={5}>
            {studyGroup.type !== 'Daily Question' && (
              <>
                <Typography variant="h6">
                  {isScreeningAllUser(studyGroup)
                    ? 'ALL USER'
                    : studyGroup.totalParticipants}
                </Typography>
                <Typography variant="body2">Total Participant</Typography>
              </>
            )}
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h6"
              className={
                (studyGroup.status === 'Pending' && classes.textPrimary) ||
                (studyGroup.status === 'In Progress' &&
                  classes.textInProgress) ||
                (studyGroup.status === 'Completed' && classes.textSuccess)
              }
            >
              {studyGroup.status}
            </Typography>
            <Typography variant="body2">Status</Typography>
          </Grid>
          <Grid item xs={3}>
            <PopButton
              style={{ color: '#2196F3', border: '1px solid #2196F3' }}
              size="small"
              variant="outlined"
              onClick={() => {
                if (studyGroupRedirectFrom) {
                  sessionStorage.setItem(
                    'studyGroupRedirectFrom',
                    studyGroupRedirectFrom,
                  );
                } else {
                  sessionStorage.removeItem('studyGroupRedirectFrom');
                }
                viewStudyGroupDetails(studyGroup.id);
              }}
            >
              View
            </PopButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

StudyGroup.propTypes = {
  studyGroup: PropTypes.object,
  studyGroupRedirectFrom: PropTypes.number,
  viewStudyGroupDetails: PropTypes.func,
};

export default StudyGroup;
