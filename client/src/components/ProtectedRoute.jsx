import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const ProetectedRoute = ({ children }) => {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProetectedRoute;
