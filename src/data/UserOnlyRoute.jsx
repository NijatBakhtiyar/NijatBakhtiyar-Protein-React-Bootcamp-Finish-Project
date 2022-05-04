import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export function UserOnlyRoute({ isAuthenticated, children }) {
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
