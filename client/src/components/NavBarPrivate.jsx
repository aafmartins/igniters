import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../contexts/auth.context";

export default function NavBarPrivate() {
  const { userToken, logOutUser } = useContext(AuthContext);
  return (
    <div>
      <nav>
        <Link to="/">
          <button className="button-52">Home</button>
        </Link>
        <Link to="/orgs">
          <button className="button-53">Organizations</button>
        </Link>
        <Link to={`/my-orgs`}>
          <button>My Organizations</button>
        </Link>
        <Link to="/orgs/create">
          <button>Create an organization</button>
        </Link>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
        <button onClick={logOutUser}>Logout, {userToken.name}</button>
      </nav>
    </div>
  );
}
