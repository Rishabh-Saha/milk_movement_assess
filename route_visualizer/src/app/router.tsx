import { RouteObject, Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../components/Home";
import RouteSessionDetails from "../components/RouteSessionDetails";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/route-sessions" />,
      },
      {
        path: "/route-sessions",
        element: <Home />,
        children: [
          {
            path: ":routeSessionId",
            element: <RouteSessionDetails />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
