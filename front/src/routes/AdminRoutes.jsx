import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/AuthUtils";

const adminRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!isAuthenticated() || !user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default adminRoutes;
