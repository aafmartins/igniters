import React, { useState } from "react";
import { Link } from "react-router-dom";

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
      <h1>Home Page</h1>
      <Link to="/orgs-near-you">
        <button>Organizations near you</button>
      </Link>
      <div>
        <form onSubmit={handleClick}>
          <div>
            <label htmlFor="nameOrLocation">Search by Name or Location:</label>
            <input
              type="text"
              placeholder="Search here"
              name="nameOrLocation"
              value={searchInput}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
