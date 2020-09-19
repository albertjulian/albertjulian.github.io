/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import { Redirect } from 'react-router-dom';
import DashboardLayout from './layouts/Dashboard';
import DashboardDefaultView from './views/DashboardDefault';

// import AuthGuard from './components/AuthGuard';

export default [
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/dashboards/default',
        exact: true,
        component: DashboardDefaultView,
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
];
