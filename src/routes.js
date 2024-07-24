import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

const Login = lazy(() => import('../src/components/Components/Login'));
const Registration =lazy(() => import('../src/components/Components/Registration'));
const ForgotPass = lazy(() => import('../src/components/Components/Forgotpass'));
const ForgotPasswordOTP = lazy(() => import('../src/components/Components/Forgotpasswordotp'));
const ForgotPassPwd = lazy(() => import('../src/components/Components/Forgotpasspwd'));
const Events = lazy(() => import('./views/ui-elements/basic/Event'));
const BookeventsEvents = lazy(() => import('./views/ui-elements/basic/Bookevents'));
const BankInfo =lazy(() => import('./views/ui-elements/basic/Bankinfo'));
const BasicButton = lazy(() => import('./views/ui-elements/basic/BasicButton'));
const BasicBadges = lazy(() => import('./views/ui-elements/basic/BasicBadges'));
const BasicBreadcrumb = lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'));
const BasicCollapse = lazy(() => import('./views/ui-elements/basic/BasicCollapse'));
const BasicTypography = lazy(() => import('./views/ui-elements/basic/BasicTypography'));
const BasicTabsPills = lazy(() => import('./views/ui-elements/basic/BasicTabsPills'));
const BasicPagination = lazy(() => import('./views/ui-elements/basic/BasicPagination'));
const Widthdrw =lazy(() => import('./views/ui-elements/basic/Widthdrw'));
export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    path: '/login',
    element: Login
  },
  {
    path: '/registration',
    element: Registration
  },
  {
    path: '/forgetpassword',
    element: ForgotPass
  },
  {
    path: '/fpotp',
    element: ForgotPasswordOTP
  },
  {
    path: '/fppwd',
    element: ForgotPassPwd
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        path: '/app/Bankinfo/default',
        element: BankInfo
      },
      {
        path: '/app/categories/default',
        element: BasicButton
      },
      {
        path: '/app/events/default',
        element: Events
      },
      {
        path: '/app/user/default',
        element: BasicBadges
      },
      {
        path: '/app/transactions/default',
        element: BasicBreadcrumb
      },
      {
        path: '/app/user/profile/:id',
        element: BasicCollapse
      },
      {
        path: '/app/category/clue/:id',
        element: BasicTabsPills
      },
      {
        path: '/app/games/default',
        element: BasicTypography
      },
      {
        path: '/app/chat/default',
        element: BasicPagination
      },
      {path: '/app/bookevent',
        element: BookeventsEvents
      },
      {
        path: '/app/Withdrw',
        element: Widthdrw
      }
    ]
  }
];

export default routes;
