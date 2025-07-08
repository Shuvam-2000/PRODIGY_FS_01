import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRef } from "react";

const ProtectRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Ref to ensure toast runs only once
  const hasShownToast = useRef(false);

  if (!token) {
    if (!hasShownToast.current) {
      toast.error("You are required to login");
      hasShownToast.current = true;
    }
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    if (!hasShownToast.current) {
      toast.error("You are not authorized to access this page");
      hasShownToast.current = true;
    }
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectRoute;
