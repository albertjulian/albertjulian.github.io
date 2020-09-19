import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import TopProvincesChart from 'src/components/Charts/TopProvincesChart';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  iconButton: {
    padding: 0,
  },
  dialogContent: {
    padding: 0,
    overflowX: 'hidden',
    minHeight: 100,
    maxHeight: 300,
  },
}));

const DetailDialog = ({
  isOpen,
  onClose,
  data,
}) => {
  const classes = useStyles();

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Grid container className={classes.dialogTitle}>
          <Typography variant="h4">Cities Detail</Typography>
          <IconButton onClick={onClose} className={classes.iconButton}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <Divider />
      <DialogContent
        className={classes.dialogContent}
        style={{
          overflowY: data.length && data.length > 5 ? 'auto' : 'hidden'
        }}
      >
        <Grid container spacing={1} alignItems="center" justify="center">
          <TopProvincesChart
            className={classes.root}
            data={data}
            page={0}
            rowsPerPage={data.length}
          />
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

DetailDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.array,
};

export default DetailDialog;
