import Login from "../pages/login/Login";
import FindRoute from "../pages/routes/find-route/FindRoute";
import SignUp from "../pages/sign-up/SignUp";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewRoute from "../pages/routes/new-route/NewRoute";
import EditRoute from "../pages/routes/edit-route/EditRoute";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/routes",
      element: <FindRoute />,
    },
    {
      path: "/create-route",
      element: <NewRoute />,
    },
    {
      path: "/edit-route/:id",
      element: <EditRoute />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
