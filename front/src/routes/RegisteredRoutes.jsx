import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/AuthUtils";

const registeredRoutes = ({}) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default registeredRoutes;
