/* eslint-disable no-restricted-globals */
/* eslint-disable function-paren-newline */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, LinearProgress, colors } from '@material-ui/core';

import PopBadge from 'src/components/PopBadge/index';

import studyIcon from 'src/assets/svg/study.svg';

import PopButton from 'src/components/PopButton';

const useStyles = makeStyles((theme) => ({
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarNotComplete: {
    backgroundColor: colors.amber[500],
  },
  progressBarComplete: {
    backgroundColor: '#27ae60',
  },
  progressBarRoot: {
    height: 8,
  },
  textPrimary: {
    color: '#329BFF',
  },
  studyIcon: {
    width: 50,
    maxWidth: 50,
    transform: 'translateX(-5px)',
    [theme.breakpoints.down('sm')]: {
      width: 40,
    },
  },
}));

function StudyList({
  studies,
  studyGroupTitle,
  studyType,
  studyGroupRedirectFrom,
  viewStudyDetails,
}) {
  const classes = useStyles();

  // remove last border bottom for study list
  const countStudies =
    studies[0] &&
    studies[0].SurveyQuestions &&
    studies[0].SurveyQuestions.length > 0
      ? studies[0].SurveyQuestions.length
      : studies.length;

  return studyType !== 'Daily Question' ? (
    <Grid container>
      {studies.map((study, idx) => (
        <Grid container key={study.id} spacing={1} alignItems="center">
          {/* grid 1 */}
          <Grid item xs={1} />
          {/* grid 2 */}
          <Grid item xs={2}>
            <Grid container alignItems="center">
              <Grid
                item
                xs={12}
                style={{
                  borderBottom:
                    countStudies !== idx + 1 ? '1px solid #EEE' : '',
                }}
              >
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={3}>
                    <img
                      src={studyIcon}
                      alt="study icon"
                      className={classes.studyIcon}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h6" noWrap>
                      {study.title && study.title.substring(0, 25)}
                    </Typography>
                    <Typography variant="body2" noWrap>{studyGroupTitle}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* grid 5 */}
          <Grid
            item
            xs={5}
            style={{
              borderBottom: countStudies !== idx + 1 ? '1px solid #EEE' : '',
            }}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={11} style={{ height: 20 }}>
                <LinearProgress
                  variant="determinate"
                  value={Number(
                    study.studyPercentage && !isNaN(study.studyPercentage)
                      ? Number(study.studyPercentage)
                      : 0,
                  )}
                  classes={{
                    root: classes.progressBarRoot,
                    barColorPrimary:
                      parseFloat(
                        study.studyPercentage && !isNaN(study.studyPercentage)
                          ? Number(study.studyPercentage)
                          : 0,
                      ) === 100 || study.status === 'STOP'
                        ? classes.progressBarComplete
                        : classes.progressBarNotComplete,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  {study.studyPercentage && !isNaN(study.studyPercentage)
                    ? Number(study.studyPercentage)
                    : 0}
                  % of required participants
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* grid 4 */}
          <Grid
            item
            xs={4}
            style={{
              borderBottom: countStudies !== idx + 1 ? '1px solid #EEE' : '',
            }}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={5}>
                <Typography variant="h6">
                  {`${
                    study.status === 'ACTIVE' || study.status === 'STOP'
                      ? study.participantDone
                      : '-'
                  } / ${study.requiredParticipants}`}
                </Typography>
                <Typography variant="body2">Participants</Typography>
              </Grid>
              <Grid item xs={4}>
                <PopBadge study={study} />
              </Grid>
              <Grid item xs={3}>
                <PopButton
                  size="small"
                  color="info"
                  variant="outlined"
                  onClick={() => {
                    if (studyGroupRedirectFrom) {
                      sessionStorage.setItem(
                        'studyGroupRedirectFrom',
                        studyGroupRedirectFrom,
                      );
                    } else {
                      sessionStorage.removeItem('studyGroupRedirectFrom');
                      sessionStorage.setItem(
                        'portraitRedirectFrom',
                        'studyList',
                      );
                    }
                    viewStudyDetails(study);
                  }}
                >
                  View
                </PopButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  ) : (
    <Grid container>
      {studies &&
        studies.map(({ SurveyQuestions }) =>
          SurveyQuestions.map((survey, idx) => (
            <Grid
              container
              key={survey.content}
              spacing={1}
              alignItems="center"
            >
              {/* grid 1 */}
              <Grid item xs={1} />
              {/* grid 7 */}
              <Grid item xs={7}>
                <Grid container alignItems="center">
                  <Grid
                    item
                    xs={12}
                    style={{
                      borderBottom:
                        countStudies !== idx + 1 ? '1px solid #EEE' : '',
                    }}
                  >
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={1}>
                        <img
                          src={studyIcon}
                          alt="study icon"
                          className={classes.studyIcon}
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Typography variant="h6">
                          {survey.content &&
                            JSON.parse(survey.content).question.substring(
                              0,
                              90,
                            )}
                        </Typography>
                        <Typography variant="body2">Daily Question</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* grid 4 */}
              <Grid
                item
                xs={4}
                style={{
                  borderBottom:
                    countStudies !== idx + 1 ? '1px solid #EEE' : '',
                }}
              >
                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="h6">
                      {`${
                        survey.status === 'ACTIVE' || survey.status === 'STOP'
                          ? survey.participantDone
                          : '-'
                      }`}
                    </Typography>
                    <Typography variant="body2">Participants</Typography>
                  </Grid>
                  <Grid item xs={3} style={{ textAlign: 'center' }} />
                </Grid>
              </Grid>
            </Grid>
          )),
        )}
    </Grid>
  );
}

StudyList.propTypes = {
  studies: PropTypes.array,
  studyGroupTitle: PropTypes.string,
  studyType: PropTypes.string,
  studyGroupRedirectFrom: PropTypes.number,
  viewStudyDetails: PropTypes.func,
};

export default StudyList;
