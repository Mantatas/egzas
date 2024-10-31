import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/AuthUtils";

const unregisteredRoutes = ({}) => {
  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default unregisteredRoutes;
