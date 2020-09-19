import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Auth from '@aws-amplify/auth';
import reduxStore from '../store';

function AuthGuard({ children }) {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  useEffect(() => {
    Auth.currentAuthenticatedUser().catch(() => {
      if (process.env.REACT_APP_GOOGLE_TAG_MANAGER_ID) {
        window.dataLayer.push({ userId: 0 });
      }
      reduxStore.persistor.purge();
      history.push('/auth/login');
    });
  }, [history]);

  if (process.env.REACT_APP_GOOGLE_TAG_MANAGER_ID) {
    Auth.currentAuthenticatedUser().then((currentAuthenticatedUser) => {
      if (user) {
        window.dataLayer.push({
          userGroup: user.isAdmin ? 'Admin' : 'Researcher',
        });
      }
      window.dataLayer.push({ userId: currentAuthenticatedUser.username });
    });
  }
  return <>{children}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
