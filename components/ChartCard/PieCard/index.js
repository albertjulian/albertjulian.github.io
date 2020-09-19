import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import Pie from 'src/components/Charts/Pie';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  cardContent: {
    height: '80%',
  },
  cardAction: {
    height: '10%',
  },
  content: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  chartContainer: {
    padding: theme.spacing(3),
  },
  chart: {
    height: 281,
  },
  statsContainer: {
    display: 'flex',
    width: '100%',
  },
  statsItem: {
    width: '50%',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3, 2),
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
  chartLabel: {
    position: 'relative',
    marginLeft: 16,
    top: 4,
  },
}));

function PieCard({ className, title, respondents, data, ...rest }) {
  const classes = useStyles();
  const totalRespondents = respondents || 0;

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        // TODO: we dont need this yet
        // action={<GenericMoreButton />}
        title={title}
      />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.chartContainer}>
          {(Boolean(totalRespondents) && (
            <Pie className={classes.chart} data={data} respondents={totalRespondents} />
          )) || (
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ minHeight: 280 }}
            >
              <Grid item>
                <Typography>No Data</Typography>
              </Grid>
            </Grid>
          )}
        </div>
        <Divider />
        <div className={classes.statsContainer}>
          {data.map((earning, index) => (
            <div className={classes.statsItem} key={earning.id || index}>
              {earning.icon}
              <div className={classes.chartLabel}>
                <Typography
                  align="center"
                  component="h6"
                  gutterBottom
                  variant="overline"
                >
                  {earning.label}
                </Typography>
                <Typography align="center" variant="h4">
                  {(totalRespondents &&
                    `${parseFloat((earning.value / totalRespondents) * 100).toFixed(2)} %`) ||
                    '-'}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

PieCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.any.isRequired,
  respondents: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default PieCard;
