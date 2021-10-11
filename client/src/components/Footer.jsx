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
      </div>
     
      <div className="creditsContainer">   
        <a className="headerForNames">
          <b>Proudly made by:</b>
        </a>
        <a href="https://github.com/hribu" className="anchorsInMadeBy">
          Flavian Albert
        </a>
        <a
          href="https://www.linkedin.com/in/monika-geiger/"
          className="anchorsInMadeBy"
        >
          Mónika Geiger
        </a>
        <a
          href="https://www.linkedin.com/in/ana-af-martins/"
          className="anchorsInMadeBy"
        >
          Ana Martins
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
