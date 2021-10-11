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
      <img className="heroImage" src="/images/hero.png" alt="Rocket Lady" />
      <div className="homeButtonsContainer">
        <h2 className="homePageSlogan">Welcome to Igniters</h2>
        <p className="aboutUsInHomePage">A repository of women's rights organizations, <b>Igniters</b> is a power
        tool for women around the world! 💪 Users can search and review
        organizations, save useful resources, and create a page for their own
        organization.</p>
        <div>
          <form onSubmit={handleClick}>
            <div className="searchBarContainer">
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
          ) : (
            <div className="orgsNearYouLinkContainer">
              <Link className="nav-link" to="/signup">
                <button className="button-52">Sign Up</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
