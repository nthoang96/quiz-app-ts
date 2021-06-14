import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { selectDisplayName } from "../store/store";

interface ProtectedRouteProps extends RouteProps {}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ ...rest }) => {
  const displayName = useSelector(selectDisplayName);
  if (displayName) {
    return <Route {...rest} />;
  }
  return <Redirect to="/" />;
};

export default ProtectedRoute;
