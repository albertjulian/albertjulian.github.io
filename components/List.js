import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  page: {
    margin: 15,
  },
  card: {
    marginBottom: 15,
  },
  p24: {
    padding: '10px 24px',
  },
  mb20: {
    marginBottom: 20,
  },
  title: {
    color: '#546E7A',
    padding: '12px 0px',
  },
  listItem: {
    padding: '10px 24px',
    borderTop: 'solid 1px',
    borderTopColor: '#eeeeee',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  displayFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayFlexBetween: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const ListTitle = ({ title, hasMenu, onMenuClick }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className={classes.p24}
    >
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      {hasMenu && onMenuClick && (
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={onMenuClick}
        >
          <MoreVertIcon />
        </IconButton>
      )}
    </Grid>
  );
};

ListTitle.propTypes = {
  title: PropTypes.string,
  hasMenu: PropTypes.bool,
  onMenuClick: PropTypes.func,
};

const ListItem = ({ title, subtitle, icon, customItem, hasBadge, badge }) => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" className={classes.listItem}>
      {!customItem && (
        <>
          {title && (
            <Grid item md={4}>
              <Typography variant="subtitle1">{title}</Typography>
            </Grid>
          )}
          <Grid
            item
            md={title ? 8 : 12}
            xs={12}
            className={
              hasBadge ? classes.displayFlexBetween : classes.displayFlex
            }
          >
            {icon && (
              <img
                src={icon}
                alt="calendar-populix icon"
                className={classes.icon}
              />
            )}
            <Typography variant="subtitle1">{subtitle}</Typography>
            {badge}
          </Grid>
        </>
      )}
      {customItem && (
        <Grid item xs={12}>
          {customItem}
        </Grid>
      )}
    </Grid>
  );
};

ListItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.node,
  customItem: PropTypes.node,
  hasBadge: PropTypes.bool,
  badge: PropTypes.node,
};

export { ListTitle, ListItem };
