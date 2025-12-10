import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  requiredPermissions: string[];
  userPermissions: string[];
  children: React.ReactNode;
}

export const ProtectedRoute = ({
  requiredPermissions,
  userPermissions,
  children,
}: ProtectedRouteProps) => {
  const hasAccess = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  return hasAccess ? children : <Navigate to="/not-found" replace />;
};
