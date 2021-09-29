import { useContext } from "react";
import { AuthContext } from "./../contexts/auth.context";
import { Redirect, Route } from "react-router-dom";

function AnonRoute(props) {
  const { toRedirect = "/", exact, component: Component, ...restProps } = props;

  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) return <p>Loading ...</p>;

  // If the user is already logged in, redirect him to home page
  if (isLoggedIn) return <Redirect to={toRedirect} />;

  // If the user is not logged in yet, allow him to see the page
  return <Route exact={exact} component={Component} {...restProps} />;
}

export default AnonRoute;
