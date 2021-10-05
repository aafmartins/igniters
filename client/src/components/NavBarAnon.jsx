import React from "react";
import { Link } from "react-router-dom";
import '../styles/navbarAnon.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars  } from '@fortawesome/free-solid-svg-icons'
export default function NavBarAnon() {
  return (
   
      <nav className="navbar navbar-light bg-light">
        <Link to="/">
          <img className="logo" src="/images/megaphone.png" alt="" />
        </Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <FontAwesomeIcon icon={faBars} className="hambIcon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link className="nav-link" to="/orgs">
                  <a className="anchors">All Organizations</a>
                </Link>
              </li>
              <li class="nav-item ">
                <Link className="nav-link" to="/signup">
                  <a className="anchors">Signup</a>
                </Link>
              </li>
              <li class="nav-item" >
                <Link className="nav-link" to="/login">
                  <a className="anchors">Login</a>
                </Link>
              </li>
            </ul>
          </div>
      </nav>
 
  );
}
