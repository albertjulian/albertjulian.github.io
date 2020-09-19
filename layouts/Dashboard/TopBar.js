/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  colors,
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import { logout } from 'src/actions';
import axios from 'src/utils/axios';
import PopulixLogoutIcon from 'src/assets/svg/logout.svg';
import PopulixForBusinessLogo from 'src/assets/svg/populixForBusinessNew.svg';
import NotificationsPopover from 'src/components/NotificationsPopover';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    backgroundImage: 'linear-gradient(180deg, #00417D 0%, #002B5A 100%)'
  },
  flexGrow: {
    flexGrow: 1,
  },
  search: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 4,
    flexBasis: 300,
    height: 36,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: 'inherit',
  },
  searchInput: {
    flexGrow: 1,
    color: 'inherit',
    '& input::placeholder': {
      opacity: 1,
      color: 'inherit',
    },
  },
  searchPopper: {
    zIndex: theme.zIndex.appBar + 100,
  },
  searchPopperContent: {
    marginTop: theme.spacing(1),
  },
  trialButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900],
    },
  },
  trialIcon: {
    marginRight: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  chatButton: {
    marginLeft: theme.spacing(1),
  },
  notificationsButton: {
    marginLeft: theme.spacing(1),
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600],
  },
  populixBusinessLogo: {
    marginTop: theme.spacing(1),
    width: '50%',
    minWidth: 200,
  },
  logoutButton: {
    marginLeft: theme.spacing(1),
  },
  logoutIcon: {
    marginRight: theme.spacing(1),
  },
}));

function TopBar({ onOpenNavBarMobile, className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const notificationsRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const { loggedIn } = session;

  const handleLogout = async () => {
    dispatch(logout());
  };

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

  useEffect(() => {
    let mounted = true;

    const fetchNotifications = () => {
      axios.get('/api/account/notifications').then((response) => {
        if (mounted) {
          setNotifications(response.data.notifications);
        }
      });
    };

    fetchNotifications();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      history.push('/auth/login');
    }
  }, [loggedIn]);

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <Hidden lgUp>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={onOpenNavBarMobile}
          >
            <MenuIcon />
          </IconButton>
          <RouterLink to="/">
            <img
              src={PopulixForBusinessLogo}
              alt="Populix Logo"
              className={classes.populixBusinessLogo}
            />
          </RouterLink>
          <div className={classes.flexGrow} />
          <IconButton
            className={classes.logoutButton}
            color="inherit"
            onClick={handleLogout}
          >
            <img src={PopulixLogoutIcon} alt="logout" />
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          {/* Hide Notification temporary
            {user && user.isAdmin && (
              <IconButton
                className={classes.notificationsButton}
                color="inherit"
                onClick={handleNotificationsOpen}
                ref={notificationsRef}
              >
                <Badge
                  badgeContent={notifications.length}
                  classes={{ badge: classes.notificationsBadge }}
                  variant="dot"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}
          */}
          <RouterLink to="/">
            <img
              src={PopulixForBusinessLogo}
              alt="Populix Logo"
              className={classes.populixBusinessLogo}
              style={{ marginLeft: 40 }}
            />
          </RouterLink>
          <div className={classes.flexGrow} />
          <Button
            className={classes.logoutButton}
            color="inherit"
            onClick={handleLogout}
            startIcon={
              <img
                src={PopulixLogoutIcon}
                alt="logout"
                className={classes.logoutIcon}
              />
            }
          >
            Sign out
          </Button>
        </Hidden>
      </Toolbar>
      <NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notifications}
        onClose={handleNotificationsClose}
        open={openNotifications}
      />
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func,
};

export default TopBar;
