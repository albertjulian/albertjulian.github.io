import FolderIcon from '@material-ui/icons/FolderOutlined';
import AssessmentOutlined from '@material-ui/icons/AssessmentOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';

const loadProjectRouteConfig = (isAdmin) => {
  return [
    {
      title: 'Project',
      href: '/projects',
      icon: FolderIcon,
      items: [
        {
          title: 'Browse',
          href: '/projects/browse',
        },
        ...((isAdmin && [
          {
            title: 'Create',
            href: '/projects/create',
          },
        ]) ||
          []),
      ],
    },
  ];
};

const loadStudyRouteConfig = (isAdmin) => {
  return (
    (isAdmin && [
      {
        title: 'Study',
        href: '/studies',
        icon: AssessmentOutlined,
        items: [
          {
            title: 'Browse',
            href: '/studies/browse',
          },
          {
            title: 'Daily Question',
            href: '/studies/create/dailyquestion',
          },
        ],
      },
    ]) ||
    []
  );
};

const loadUserManagementConfig = (isAdmin) => {
  return (
    (isAdmin && [
      {
        title: 'User Management',
        href: '/user-management',
        icon: PeopleIcon,
      },
    ]) ||
    []
  );
};

const loadPanelExplorerDashboardConfig = (isAdmin) => {
  return (
    (isAdmin && [
      {
        title: 'Panel Explorer',
        href: '/panel-explorer',
        icon: PersonIcon,
      },
    ]) ||
    []
  );
};

const loadCriteriaRouteConfig = (isAdmin) => {
  return (
    (isAdmin && [
      {
        title: 'Criteria Management',
        href: '/criteria',
        icon: PersonIcon,
        items: [
          {
            title: 'Browse Criteria',
            href: '/criteria/browse',
          },
          {
            title: 'Create Criteria',
            href: '/criteria/create',
          },
          {
            title: 'Browse Screening Logic',
            href: '/screening-logic/browse',
          },
        ],
      },
    ]) ||
    []
  );
};

const loadProfileRouteConfig = (isAdmin) => {
  return (
    (isAdmin && [
      {
        title: 'Profile',
        href: '/profile',
        icon: PersonIcon,
        items: [
          {
            title: 'General',
            href: '/profile/general',
          },
          {
            title: 'Security',
            href: '/profile/security',
          },
        ],
      },
    ]) ||
    []
  );
};

const getNavConfig = (isAdmin = false) => {
  return [
    {
      subheader: 'Pages',
      items: [
        ...loadProjectRouteConfig(isAdmin),
        ...loadStudyRouteConfig(isAdmin),
        ...loadCriteriaRouteConfig(isAdmin),
        ...loadPanelExplorerDashboardConfig(isAdmin),
        ...loadUserManagementConfig(isAdmin),
        ...loadProfileRouteConfig(isAdmin),
      ],
    },
  ];
};

export default getNavConfig;
