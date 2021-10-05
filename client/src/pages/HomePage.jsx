import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/homePage.css";

function HomePage(props) {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleClick = (e) => {
    props.history.push({
      pathname: "/search",
      state: searchInput,
    });
  };

  return (
    <div>
      <div className="homeHeader">
        <h1 className="homePageSlogan">Home Page Slogan</h1>
        <img className="heroImage" src="/images/hero.png" alt="Rocket Lady" />
      </div>

      <div className="homeButtonsContainer">
        <div>
          <form onSubmit={handleClick}>
            <div>
              {/* <label htmlFor="nameOrLocation">
                Search by Name or Location:
              </label> */}
              <input
                type="text"
                placeholder="Search by organization name or location"
                name="nameOrLocation"
                value={searchInput}
                onChange={handleChange}
              />
            </div>

            <Link to="/orgs-near-you">
              <button className="button-52">Organizations near you</button>
            </Link>

            {/* <button type="submit">Search</button> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
