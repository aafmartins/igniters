import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  return (
    <div className="footerContainer">
      <div className="footerLinksContainer">
        <Link className="footerLink" to="/about">
          About Us
        </Link>
        <Link className="footerLink" to="/orgs">
          Organizations
        </Link>
      </div>
      <div>
        <h6>Illustrations by:</h6>
        <p>
          <a href="https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6">
            Icons 8
          </a>{" "}
          from <a href="https://icons8.com/illustrations">Ouch!</a>
        </p>
      </div>
      <div className="creditsContainer">
        <h6>Proudly made by:</h6>
        <p>Flavian Albert</p>
        <p>Monika Geiger</p>
        <p>Ana Martins</p>
        <p>Osvaldo Picazo</p>
        <p></p>
      </div>
    </div>
  );
}
