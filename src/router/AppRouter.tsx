import Login from '../pages/login/Login';
import NewRoute from '../pages/new-route/NewRoute';
import FindRoute from '../pages/find-route/FindRoute';
import SignUp from '../pages/sign-up/SignUp';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const AppRouter = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/routes',
      element: <FindRoute />
    },
    {
      path: '/create-route',
      element: <NewRoute />

    },
    {
      path: '/sign-up',
      element: <SignUp />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter;
