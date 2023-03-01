import { Route, Navigate } from "react-router-dom";

const RestrictedRoute = ({ component: Component, isAuthenticated, userRole, allowedRoles, ...rest }:any) => (
  <Route
    {...rest}
    render={(props: any) =>
      isAuthenticated && allowedRoles.includes(userRole) ? (
        <Component {...props} />
      ) : (
        <Navigate to="/403" />
      )
    }
  />
);