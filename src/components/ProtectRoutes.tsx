// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  // Replace this with your actual authentication check
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  console.log("isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/manage" replace />;
  }

  return children;
};

export default ProtectedRoute;
