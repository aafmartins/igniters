import React from "react";
import { Link } from "react-router-dom";

export default function NavBarAnon() {
  return (
    <div>
      <nav>
        <Link to="/">
          <button className="button-52">Home</button>
        </Link>
        <Link to="/orgs">
          <button>All Organizations</button>
        </Link>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </nav>
    </div>
  );
}
