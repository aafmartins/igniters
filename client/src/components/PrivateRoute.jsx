import { useContext } from "react";
import { AuthContext } from "./../contexts/auth.context";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute(props) {
  // Destructure the props
  const {
    toRedirect = "/login",
    exact,
    component: Component,
    ...restProps
  } = props;

  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) return <p>Loading ...</p>;

  // If the user is not logged in ❌
  if (!isLoggedIn) return <Redirect to={toRedirect} />;

  // If the user is logged in ✅
  return <Route exact={exact} component={Component} {...restProps} />;
}

export default PrivateRoute;
