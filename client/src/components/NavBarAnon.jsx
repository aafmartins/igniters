import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbarAnon.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
export default function NavBarAnon() {
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
        <ul class="navbar-nav mr-auto ul">
          <li class="nav-item active ulLi">
            <Link
              className="nav-link"
              to="/orgs"
              data-toggle="collapse"
              data-target="#navbarText"
            >
              <a className="anchors">All Organizations</a>
            </Link>
          </li>
          <li class="nav-item ulLi">
            <Link
              className="nav-link"
              to="/signup"
              data-toggle="collapse"
              data-target="#navbarText"
            >
              <a className="anchors">Sign Up</a>
            </Link>
          </li>
          <li class="nav-item ulLi">
            <Link
              className="nav-link"
              to="/login"
              data-toggle="collapse"
              data-target="#navbarText"
            >
              <a className="anchors">Login</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
