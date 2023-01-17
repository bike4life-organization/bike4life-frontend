import Login from "../pages/login/Login";
import SignUp from "../pages/sign-up/SignUp";
import {createBrowserRouter, RouterProvider, useLocation, Navigate} from "react-router-dom";
import {Home} from "../pages/home-page/Home";
import {Suspense} from "react";
import {Loading} from "../components/mapbox";
import CreateRoute from "../pages/new-route/CreateRoutePage";
import MapEdit from "../pages/route-edit/MapEdit";
import FindRoute from "../pages/find-route/FindRoute";
import ViewRoute from "../pages/route-view/ViewRoute";

const AppRouter = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login/>,
        },
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/create-route",
            element: (
                <RequireAuth>
                    <Suspense fallback={<Loading/>}>
                        {" "}
                        <CreateRoute/>{" "}
                    </Suspense>
                </RequireAuth>
            ),
        },
        {
            path: "/sign-up",
            element: <SignUp/>,
        },
        {
            path: "/home",
            element: (
                <RequireAuth>
                    <Home/>
                </RequireAuth>),
        },
        {
            path: "/routes",
            element: (
                <RequireAuth>
                    <FindRoute/>
                </RequireAuth>),
        },
        {
            path: "/edit-route/:id",
            element: (
                <RequireAuth>
                    <MapEdit/>
                </RequireAuth>),
        },
        {
            path: "/view-route/:id",
            element: (
                <RequireAuth>
                    <ViewRoute/>
                </RequireAuth>),
        },
    ]);

    return <RouterProvider router={router}/>;
};

export function RequireAuth({children}: { children: JSX.Element }) {
    let location = useLocation();

    if (!window.sessionStorage.getItem("token")) {
        return <Navigate to="/" state={{from: location}} replace/>;
    } else {
        return children;
    }
}

export default AppRouter;
