import { Navigate } from "react-router-dom";
import { getCurrentUser, decodeToken } from "../../utils/auth";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = getCurrentUser();
  const isValid = user && decodeToken(user.token || "");

  if (!user || !isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
