import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/auth/sign-in" />;
  }
  return <Outlet />;
};
