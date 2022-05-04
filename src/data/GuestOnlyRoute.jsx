import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export function GuestOnlyRoute({ isAuthenticated, children }) {
  let location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
