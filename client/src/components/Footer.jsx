import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <div className="footerContainer">
      <div className="footerLinksContainer">
        <Link className="footerLink" to="/about">
          About Us
        </Link>
        {/* <Link className="footerLink" to="/orgs">
          Organizations
        </Link> */}
      </div>
      {/* <div>
        <h6>Illustrations by:</h6>
        <p>
          <a href="https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6">
            Icons 8
          </a>{" "}
          from <a href="https://icons8.com/illustrations">Ouch!</a>
        </p>
      </div> */}
      <div className="creditsContainer">
        {/* <div class="namesMainContainer"> */}
        <a className="headerForNames">
          <b>Proudly made by:</b>
        </a>
        <a href="" className="anchorsInMadeBy">
          Flavian Albert
        </a>
        <a
          href="https://www.linkedin.com/in/monika-geiger/"
          className="anchorsInMadeBy"
        >
          {" "}
          Monika Geiger{" "}
        </a>
        <a
          href="https://www.linkedin.com/in/ana-af-martins/"
          className="anchorsInMadeBy"
        >
          {" "}
          Ana Martins{" "}
        </a>
        <a
          href="https://www.linkedin.com/in/osvaldo-picazo/"
          className="anchorsInMadeBy"
        >
          Osvaldo Picazo
        </a>
      </div>
    </div>
  );
}
