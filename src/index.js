import * as React from 'react';
import './index.css';
import * as ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Layout from './layouts/Layout';
import AuthLayout from './auth/Layout';
import Dashboard from './pages/Dashboard';
import Client from './pages/Client';
import Loans from './pages/Loans';
import Emi from './pages/Emi';
import Calculator from './pages/Calculator';
import Contact from './pages/Contact';
import Users from './pages/Users';
import reportWebVitals from './reportWebVitals';
import Login from './auth/Login';
import Register from './auth/Register';

const router = createHashRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '/',
            Component: Dashboard,
          },
          {
            path: '/client',
            Component: Client,
          },
          {
            path: '/loan',
            Component: Loans,
          },
          {
            path: '/emi',
            Component: Emi,
          },
          {
            path: '/calculator',
            Component: Calculator,
          },
          {
            path: '/contact',
            Component: Contact,
          },
          {
            path: '/users',
            Component: Users,
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();