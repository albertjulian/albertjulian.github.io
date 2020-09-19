import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
// NOTES: pending usage
// import GenericMoreButton from 'src/components/GenericMoreButton';
import Bar from 'src/components/Charts/Bar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  cardContent: {
    height: 'auto',
  },
  cardAction: {
    height: '10%',
  },
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 700,
  },
  chart: {
    padding: theme.spacing(4, 2, 0, 2),
    height: 404,
  },
}));

function BarCard({
  className,
  title,
  data,
  respondents,
  labels,
  horizontal,
  cardClassName,
  ...rest
}) {
  const classes = useStyles();
  const totalRespondents = respondents || 0;

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        // NOTES: pending usage
        // action={<GenericMoreButton />}
        title={title}
      />
      <Divider />
      <CardContent className={classes.content}>
        {(Boolean(totalRespondents) && (
          <PerfectScrollbar>
            <div className={cardClassName || classes.inner}>
              <Bar
                className={classes.chart}
                data={data}
                labels={labels}
                horizontal={horizontal}
                respondents={totalRespondents}
              />
            </div>
          </PerfectScrollbar>
        )) || (
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ minHeight: 400 }}
          >
            <Grid item>
              <Typography>No Data</Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
      {/* <Divider />
      <CardActions className={classes.cardAction}>
        {Boolean(totalRespondents) && (
          <Typography variant="h5">
            {`${totalRespondents} ${totalRespondents > 1 ? 'Respondents' : 'Respondent'}`}
          </Typography>
        )}
      </CardActions> */}
    </Card>
  );
}

BarCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node.isRequired,
  cardClassName: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.number),
  respondents: PropTypes.number,
  labels: PropTypes.arrayOf(PropTypes.string),
  horizontal: PropTypes.bool,
};

export default BarCard;
