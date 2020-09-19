import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import PopulixForBusinessLogo from 'src/assets/svg/populixForBusinessNew.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    backgroundImage: 'linear-gradient(180deg, #00417D 0%, #002B5A 100%)'
  },
  populixBusinessLogo: {
    marginTop: theme.spacing(1),
    width: '50%',
    minWidth: 200,
    marginLeft: 40,
  },
}));

function Topbar({ className, ...rest }) {
  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
    >
      <Toolbar>
        <RouterLink to="/">
          <img src={PopulixForBusinessLogo} alt="Populix Logo" className={classes.populixBusinessLogo} />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
}

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
