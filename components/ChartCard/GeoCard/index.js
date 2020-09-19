import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import GeoChart from 'src/components/Charts/GeoChart';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  content: {
    padding: 0,
    height: '100%'
  },
  inner: {
    minWidth: 500,
  },
  chart: {
    padding: theme.spacing(4, 2, 0, 2),
    minHeight: 320,
  },
}));

function GeoCard({
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
      <CardHeader title={title} />
      <Divider />
      <CardContent className={classes.content}>
        {totalRespondents ? (
          <PerfectScrollbar>
            <div className={cardClassName || classes.inner}>
              <Box display="flex" justifyContent="center" width="100%" height="100%" alignItems="center">
                <GeoChart className={classes.chart} geoChartData={data} />
              </Box>
            </div>
          </PerfectScrollbar>
        ) : (
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ minHeight: 320 }}
          >
            <Grid item>
              <Typography>No Data</Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

GeoCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node.isRequired,
  cardClassName: PropTypes.string,
  data: PropTypes.object,
  respondents: PropTypes.number,
  labels: PropTypes.arrayOf(PropTypes.string),
  horizontal: PropTypes.bool,
};

export default GeoCard;
