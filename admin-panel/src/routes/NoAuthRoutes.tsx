import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
const Login = React.lazy(() => import("@/pages/auth/Login"));
const ForgotPassword = React.lazy(() => import("@/pages/auth/ForgotPassword"));
const NoAuthRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default NoAuthRoutes;
