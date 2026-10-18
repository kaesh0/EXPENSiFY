import { createBrowserRouter } from "react-router-dom";
import {ProtectedLayout,PublicLayout} from "../layouts"
import {
  Login,
  SignUp,
  HomePage,
  Expenses,
  Dashboard,
  Profile,
  NotFound,
} from "../pages";
import App from "../App";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element:<PublicLayout/>,
        children:[
            {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
        ]
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "expenses",
            element: <Expenses />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
export default router;
