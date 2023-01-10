import Login from "../pages/login/Login";
import SignUp from "../pages/sign-up/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home-page/Home";
import Pricing from "../pages/pricing/Pricing";
import { Suspense } from "react";
import { Loading } from "../components/mapbox";
import CreateRoute from "../pages/new-route/CreateRoutePage";
import MapEdit from "../pages/route-edit/MapEdit";
import FindRoute from "../pages/find-route/FindRoute";
import ViewRoute from "../pages/route-view/ViewRoute";

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
      path: "/create-route",
      element: (
        <Suspense fallback={<Loading />}>
          {" "}
          <CreateRoute />{" "}
        </Suspense>
      ),
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/pricing",
      element: <Pricing />,
    },
    {
      path: "/routes",
      element: <FindRoute />,
    },
    {
      path: "/edit-route/:id",
      element: <MapEdit />,
    },
    {
      path: "/view-route/:id",
      element: <ViewRoute />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
