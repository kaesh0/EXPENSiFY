import { Routes, Route } from "react-router-dom";
import {
  Login,
  SignUp,
  HomePage,
  Expenses,
  Dashboard,
  Profile,
  NotFound,
} from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            {" "}
            <Login />{" "}
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            {" "}
            <SignUp />{" "}
          </PublicRoute>
        }
      />
      <Route
        path="/expenses"
        element={
          <ProtectedRoute>
            {" "}
            <Expenses />{" "}
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            {" "}
            <Profile />{" "}
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {" "}
            <Dashboard />{" "}
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default AppRoutes;
