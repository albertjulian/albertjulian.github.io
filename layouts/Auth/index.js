import React, { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import LoginTop from 'src/assets/svg/loginTop.svg';
import LoginBottom from 'src/assets/svg/loginBottom.svg';
// import LoginTop from 'src/assets/gif/loginTop.gif';
// import LoginBottom from 'src/assets/gif/loginBottom.gif';

const useStyles = makeStyles(() => ({
  container: {
    height: '100vh',
    width: '100vw',
    backgroundImage: 'linear-gradient(180deg, #00417D 0%, #002B5A 100%)',
    display: 'flex',
    '@media all and (-ms-high-contrast:none)': {
      height: 0 // IE11 fix
    }
  },
  content: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
  },
  center: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 2000,
  },
  loginTop: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
  loginBottom: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
  imageLoginTop: {
    width: '774px',
    height: '580px',
    transform: 'rotate(90deg)'
  },
  imageLoginBottom: {
    width: '720px',
    height: '540px',
    transform: 'matrix(-1, 0, 0, 1, 0, 0)',
  }
}));

function Auth({ route }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.loginTop}>
            {/* <img src={LoginTop} alt="error" className={classes.imageLoginTop} /> */}
            <img src={LoginTop} alt="error" />
          </div>
          <div className={classes.center}>
            <Suspense fallback={<LinearProgress />}>
              {renderRoutes(route.routes)}
            </Suspense>
          </div>
          <div className={classes.loginBottom}>
            {/* <img src={LoginBottom} alt="error" className={classes.imageLoginBottom} /> */}
            <img src={LoginBottom} alt="error" />
          </div>
        </div>
      </div>
    </>
  );
}

Auth.propTypes = {
  route: PropTypes.object
};

export default Auth;
