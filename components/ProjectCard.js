import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, Grid, Typography, colors } from '@material-ui/core';
import PopButton from 'src/components/PopButton';
import projectIcon from 'src/assets/images/project-icon.png';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px',
  },
  content: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
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
  projectIcon: {
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
  textStudyProcess: {
    color: colors.amber[500],
  },
  textScheduled: {
    color: '#9B51E0', // custom color (purple)
  },
  textQuotationAndAgreement: {
    color: colors.orange[500],
  },
  textReportProcessing: {
    color: '#56CCF2', // custom color (blue)
  },
  textReportReview: {
    color: '#2D9CDB', // custom color (blue)
  },
  textProjectDone: {
    color: colors.green[500],
  },
  textDefault: {
    color: colors.grey[900], // default color for other projects status
  },
}));

function ProjectCard({ project, className, viewProjectDetails, ...rest }) {
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Grid container alignItems="center">
        {/* grid 3 */}
        <Grid item xs={3}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={3} classes={{ root: classes.centerContent }}>
              <img
                src={projectIcon}
                alt="Project Icon"
                className={classes.projectIcon}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" noWrap>
                {project.title}
              </Typography>
              <Typography variant="body2" noWrap>{project.companyName}</Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* grid 5 */}
        <Grid item xs={5}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Typography variant="h6">{project.type}</Typography>
              <Typography variant="body2">Project Type</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">
                {project &&
                project.startDate &&
                project.startDate !== 'Invalid date'
                  ? project.startDate
                  : '-'}
              </Typography>
              <Typography variant="body2">Start Date</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">
                {project &&
                project.endDate &&
                project.endDate !== 'Invalid date'
                  ? project.endDate
                  : '-'}
              </Typography>
              <Typography variant="body2">End Date</Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* grid 4 */}
        <Grid item xs={4}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={5}>
              <Typography variant="h6">{project.totalStudy || '-'}</Typography>
              <Typography variant="body2">Total Study</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h6"
                className={
                  (project.status === 'Study Process' &&
                    classes.textStudyProcess) ||
                  (project.status === 'Scheduled' && classes.textScheduled) ||
                  (project.status === 'Quotation & Agreement' &&
                    classes.textQuotationAndAgreement) ||
                  (project.status === 'Report Process' &&
                    classes.textReportProcessing) ||
                  (project.status === 'Report Review' &&
                    classes.textReportReview) ||
                  (project.status === 'Project Done' &&
                    classes.textProjectDone) ||
                  classes.textDefault
                }
              >
                {project.status || 'Pending'}
              </Typography>
              <Typography variant="body2">Status</Typography>
            </Grid>
            <Grid item xs={3}>
              <PopButton
                color="info"
                size="small"
                variant="outlined"
                onClick={() => viewProjectDetails(project.id)}
              >
                View
              </PopButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired,
  viewProjectDetails: PropTypes.func,
};

export default ProjectCard;
