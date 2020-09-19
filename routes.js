/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from './layouts/Auth';
import ErrorLayout from './layouts/Error';

import DashboardLayout from './layouts/Dashboard';

import { Create as CreateStudy } from './views/Studies/Create';
import StudyList from './views/Studies/StudyList';
import StudyDetails from './views/Studies/Details';
import StudyPortraitDetails from './views/Studies/StudyPortraitDetails';
import DailyQuestion from './views/Studies/Create/DailyQuestion';

import Profile from './views/Profile';
import General from './views/Profile/General';
import Security from './views/Profile/Security';

import CreateProject from './views/Projects/Create';
import CreateQuotation from './views/Projects/CreateQuotation';
import ProjectDetails from './views/Projects/Details';
import ProjectList from './views/Projects/ProjectList';

import UserList from './views/UserManagement/UserList';
import UserDetail from './views/UserManagement/UserDetail';
import UserDetailEdit from './views/UserManagement/UserEdit';

import PanelExplorerDashboard from './views/PanelExplorerDashboard';

import CriteriaCreate from './views/Criteria/Create';
import CriteriaList from './views/Criteria/List';
import CriteriaDetail from './views/Criteria/Detail';
import CriteriaLogicList from './views/Criteria/ListScreeningLogic';
import CriteriaLogicDetail from './views/Criteria/DetailLogic';

import AuthGuard from './components/AuthGuard';

export default [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/projects/browse" />,
  },
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('src/views/Login')),
      },
      {
        path: '/auth/register',
        exact: true,
        component: lazy(() => import('src/views/Register')),
      },
      {
        path: '/auth/register/confirm',
        exact: true,
        component: lazy(() => import('src/views/RegisterConfirmation')),
      },
      {
        path: '/auth/forgot',
        exact: true,
        component: lazy(() =>
          import('src/views/auth/ForgotPassword/SendVerificationCode'),
        ),
      },
      {
        path: '/auth/forgot/verification',
        exact: true,
        component: lazy(() =>
          import('src/views/auth/ForgotPassword/InputVerificationCode'),
        ),
      },
      {
        path: '/auth/forgot/new-password',
        exact: true,
        component: lazy(() =>
          import('src/views/auth/ForgotPassword/NewPassword'),
        ),
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('src/views/Error401')),
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('src/views/Error404')),
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('src/views/Error500')),
      },
      {
        component: () => <Redirect to="/errors/error-404" />,
      },
    ],
  },
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/studies/:studyGroupId/details',
        exact: true,
        component: () => (
          <AuthGuard>
            <StudyDetails />
          </AuthGuard>
        ),
      },
      {
        path: '/studies/:studyGroupId/details/:tab',
        exact: true,
        component: () => (
          <AuthGuard>
            <StudyDetails />
          </AuthGuard>
        ),
      },
      {
        path: '/studies/:studyGroupId/portrait/:studyId/details',
        exact: true,
        component: () => (
          <AuthGuard>
            <StudyPortraitDetails />
          </AuthGuard>
        ),
      },
      {
        path: '/studies/:studyGroupId/portrait/:studyId/details/:tab',
        exact: true,
        component: () => (
          <AuthGuard>
            <StudyPortraitDetails />
          </AuthGuard>
        ),
      },
      {
        path: '/studies/browse',
        exact: true,
        component: () => (
          <AuthGuard>
            <StudyList />
          </AuthGuard>
        ),
      },
      {
        path: '/studies/create',
        exact: true,
        component: () => (
          <AuthGuard>
            <CreateStudy />
          </AuthGuard>
        ),
      },
      {
        path: '/studies/create/dailyquestion',
        exact: true,
        component: () => (
          <AuthGuard>
            <DailyQuestion />
          </AuthGuard>
        ),
      },
      {
        path: '/profile/general',
        exact: true,
        component: () => (
          <AuthGuard>
            <General />
          </AuthGuard>
        ),
      },
      {
        path: '/profile/security',
        exact: true,
        component: () => (
          <AuthGuard>
            <Security />
          </AuthGuard>
        ),
      },
      {
        path: '/profile/:id',
        exact: true,
        component: lazy(() => (
          <AuthGuard>
            <Profile />
          </AuthGuard>
        )),
      },
      {
        path: '/profile/:id/:tab',
        exact: true,
        component: lazy(() => (
          <AuthGuard>
            <Profile />
          </AuthGuard>
        )),
      },
      {
        path: '/projects/browse',
        exact: true,
        component: () => (
          <AuthGuard>
            <ProjectList />
          </AuthGuard>
        ),
      },
      {
        path: '/projects/create',
        exact: true,
        component: () => (
          <AuthGuard>
            <CreateProject />
          </AuthGuard>
        ),
      },
      {
        path: '/projects/:id/quotation/create',
        exact: true,
        component: () => (
          <AuthGuard>
            <CreateQuotation />
          </AuthGuard>
        ),
      },
      {
        path: '/projects/:id/details/',
        exact: true,
        component: () => (
          <AuthGuard>
            <ProjectDetails />
          </AuthGuard>
        ),
      },
      {
        path: '/projects/:id/details/:tab',
        exact: true,
        component: () => (
          <AuthGuard>
            <ProjectDetails />
          </AuthGuard>
        ),
      },
      {
        path: '/user-management',
        exact: true,
        component: () => (
          <AuthGuard>
            <UserList />
          </AuthGuard>
        ),
      },

      {
        path: '/user-management/:userId/details/',
        exact: true,
        component: () => (
          <AuthGuard>
            <UserDetail />
          </AuthGuard>
        ),
      },
      {
        path: '/user-management/:userId/details/:tab',
        exact: true,
        component: () => (
          <AuthGuard>
            <UserDetail />
          </AuthGuard>
        ),
      },
      {
        path: '/user-management/:email/edit',
        exact: true,
        component: () => (
          <AuthGuard>
            <UserDetailEdit />
          </AuthGuard>
        ),
      },
      {
        path: '/panel-explorer',
        exact: true,
        component: () => (
          <AuthGuard>
            <PanelExplorerDashboard />
          </AuthGuard>
        ),
      },
      {
        path: '/criteria/create',
        exact: true,
        component: () => (
          <AuthGuard>
            <CriteriaCreate />
          </AuthGuard>
        ),
      },
      {
        path: '/criteria/browse',
        exact: true,
        component: () => (
          <AuthGuard>
            <CriteriaList />
          </AuthGuard>
        ),
      },
      {
        path: '/criteria/:criteriaId/details',
        exact: true,
        component: () => (
          <AuthGuard>
            <CriteriaDetail />
          </AuthGuard>
        ),
      },
      {
        path: '/screening-logic/browse',
        exact: true,
        component: () => (
          <AuthGuard>
            <CriteriaLogicList />
          </AuthGuard>
        ),
      },
      {
        path: '/screening-logic/:screeningLogicId/details',
        exact: true,
        component: () => (
          <AuthGuard>
            <CriteriaLogicDetail />
          </AuthGuard>
        ),
      },
    ],
  },
];
