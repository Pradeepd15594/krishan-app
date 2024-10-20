import { lazy } from 'react';

// project import
import Loadable from './../Components/Loadable';
import MinimalLayout from './../Screens/MinimalLayout';
import { Navigate } from 'react-router-dom';

// render - login
const AuthLogin = Loadable(lazy(() => import('./../Screens/MinimalLayout/Login')));
const Register = Loadable(lazy(() => import('./../Screens/MinimalLayout/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <Navigate to="/login" />
    },
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/register',
      element: <Register />
    }
  ]
};

export default LoginRoutes;
