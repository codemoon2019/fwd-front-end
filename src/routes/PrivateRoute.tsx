import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ component: Component, ...rest }: any) => {
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    //To check if the use is authenticated
    const isAuthenticated = () => {
      //Authentication Logic Here
      return true;
    };
    setAuth(isAuthenticated());
  }, []);

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
