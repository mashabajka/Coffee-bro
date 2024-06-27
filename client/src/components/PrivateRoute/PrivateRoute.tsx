import React from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ user, children }) {
  return user?.length ? children : <Navigate to="/admin" />;
}
