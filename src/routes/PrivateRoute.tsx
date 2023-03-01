import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ component: Component,isAuthenticated, ...rest }: any) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
