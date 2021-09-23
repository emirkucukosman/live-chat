import React, { Fragment, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoadingScreen from "src/components/LoadingScreen";

export const renderRoutes = (routes: any[] = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            exact={route.exact}
            path={route.path}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? renderRoutes(route.routes) : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes: any[] = [
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFoundView")),
  },
  {
    path: "/room",
    routes: [
      {
        exact: true,
        path: "/room/chat/:room",
        component: lazy(() => import("src/views/room/ChatRoomView")),
      },
      {
        exact: true,
        path: "/room/create",
        component: lazy(() => import("src/views/room/CreateRoomView")),
      },
    ],
  },
  {
    path: "*",
    routes: [
      {
        exact: true,
        path: "/",
        component: lazy(() => import("src/views/home/HomeView")),
      },
      {
        component: () => <Redirect to="/404" />,
      },
    ],
  },
];

export default routes;
