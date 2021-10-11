import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../contexts/auth.context";
import "../styles/navbarPrivate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function NavBarPrivate() {
  const { logOutUser } = useContext(AuthContext);
  return (
    <nav className="navbar fixed-top navbar-light bg-light">
      <Link to="/">
        <img className="logo" src="/images/megaphone.png" alt="" />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <FontAwesomeIcon icon={faBars} className="hambIcon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto ul">
          <li className="nav-item active firstLink">
            <Link
              className="nav-link "
              to="/orgs"
              data-toggle="collapse"
              data-target="#navbarText"
            >
              <a className="anchors">Organizations</a>
            </Link>
          </li>
          <li li className="nav-item ulLi">
            <Link
              className="nav-link"
              to={`/my-orgs`}
              data-toggle="collapse"
              data-target="#navbarText"
            >
              <a className="anchors">My Organizations</a>
            </Link>
          </li>
          <li className="nav-item ulLi">
            <Link
              className="nav-link"
              to="/orgs/create"
              data-toggle="collapse"
              data-target="#navbarText"
            >
              <a className="anchors">Create an organization</a>
            </Link>
          </li>
          <li className="nav-item ulLi">
            <Link
              className="nav-link"
              to="/about"
              data-toggle="collapse"
              data-target="#navbarText"
            >
              <a className="anchors">About us</a>
            </Link>
          </li>
          <li className="nav-item ulLi">
            <Link
              className="nav-link"
              to="/profile"
              data-toggle="collapse"
              data-target="#navbarText"
            >
              <a className="anchors">Profile</a>
            </Link>
          </li>
          <li className="nav-item lastLink ulLi">
            <a
              className="nav-link"
              onClick={logOutUser}
              data-toggle="collapse"
              data-target="#navbarText"
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
