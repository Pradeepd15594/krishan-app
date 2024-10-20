import { lazy } from 'react';

// project import
import Loadable from './../Components/Loadable';
import Dashboard from './../Screens/Dashboard';
import AppLayout from './../Screens/AppLayout';
import ManageStudents from './../Screens/ManageStudents';
import ManageClasses from '../Screens/ManageClasses';

// render - sample page
const SamplePage = Loadable(lazy(() => import('./../Screens/SamplePage')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <AppLayout />,
  children: [
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: 'dashboard',
      element: <Dashboard />
    },
    {
      path: 'manage-students',
      element: <ManageStudents />
    },
    {
      path: 'manage-classes',
      element: <ManageClasses />
    },
    {
      path: 'dashboard 3',
      children: [
        {
          path: 'default',
          element: <Dashboard />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
  ]
};

export default MainRoutes;
