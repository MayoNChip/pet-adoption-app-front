import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import userContext from "../context/UserContext";

function SecuredRoutes({ children }) {
  const { isLoggedIn, isLoading } = useContext(userContext);

  if (isLoggedIn === null || isLoading === true) {
    return <></>;
  }

  return isLoggedIn === true ? children : <Navigate to="/home" replace />;
}

export default SecuredRoutes;
