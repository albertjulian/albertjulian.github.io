import React, { useState } from 'react';
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
  CardActions,
} from '@material-ui/core';
import TopProvincesChart from 'src/components/Charts/TopProvincesChart';
import { Pagination } from '@material-ui/lab';
import DetailDialog from './detailDialog';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 700,
  },
  chart: {
    minHeight: 320,
  },
}));

function TopProvincesCard({
  className,
  title,
  respondents,
  data,
  ...rest
}) {
  const classes = useStyles();
  const rowsPerPage = 6;
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [detail, setDetail] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const _handleClick = (e, dataPerRow) => {
    setDetail(dataPerRow.cities || []);
    setOpenDialog(true);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        title={title}
      />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.chartContainer}>
          {
            detail && detail.length > 0 &&
            <DetailDialog
              isOpen={openDialog}
              onClose={() => setOpenDialog(false)}
              data={detail}
            />
          }
          {(Boolean(respondents) && data && data.length > 0 && (
            <TopProvincesChart
              className={classes.chart}
              data={data}
              page={page}
              rowsPerPage={rowsPerPage}
              handleClick={_handleClick}
            />
          )) || (
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
        </div>
      </CardContent>
      { Boolean(data) &&
        <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            count={Math.ceil(data.length / rowsPerPage, 10)}
            page={page + 1}
            onChange={handleChangePage}
            variant="text"
            hideNextButton
            hidePrevButton
            color="primary"
          />
        </CardActions>
      }
    </Card>
  );
}

TopProvincesCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.any.isRequired,
  respondents: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default TopProvincesCard;
