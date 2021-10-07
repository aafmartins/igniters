import React, { useState, useContext } from "react";
import { AuthContext } from "./../contexts/auth.context";
import { Link } from "react-router-dom";

import "../styles/homePage.css";

function HomePage(props) {
  const [searchInput, setSearchInput] = useState("");
  const { isLoggedIn } = useContext(AuthContext);

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
        {/* <h1 className="homePageSlogan">Home Page Slogan</h1> */}
        <img className="heroImage" src="/images/hero.png" alt="Rocket Lady" />
      </div>

      <div className="homeButtonsContainer">
        <h2 className="homePageSlogan">Welcome to Igniters</h2>
        <div>
          <form onSubmit={handleClick}>
            <div className="searchBarContainer">
              {/* <label htmlFor="nameOrLocation">
                Search by Name or Location:
              </label> */}
              <input
                className="searchBarInput"
                type="text"
                placeholder="Search organizations by name or location"
                name="nameOrLocation"
                value={searchInput}
                onChange={handleChange}
              />
              <img src="/images/telescope.png" className="searchImg" alt="" />
            </div>
            <button className="searchButton button-52 " type="submit">
              Search
            </button>
          </form>

          {isLoggedIn ? (
            <div className="orgsNearYouLinkContainer">
              <Link to="/orgs-near-you">
                <button className=" button-52">Organizations near you</button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
