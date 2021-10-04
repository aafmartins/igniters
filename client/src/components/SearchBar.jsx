import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OrganizationCard from "./OrganizationCard";

// import { AuthContext } from "./../contexts/auth.context";

const API_URL = "http://localhost:3000/api";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [orgs, setOrgs] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  // const [userCountry, setUserCountry] = useState("");
  // const {
  //   userToken: { _id: userId },
  // } = useContext(AuthContext);

  // const getUser = (userId) => {
  //   // Get the token from the localStorage
  //   const storedToken = localStorage.getItem("authToken");

  //   // Send the token through the request "Authorization" Headers
  //   axios
  //     .get(`${API_URL}/users/${userId}`, {
  //       headers: {
  //         Authorization: `Bearer ${storedToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log("data from user", response.data.country);
  //       setUserCountry(response.data.country);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleClick = () => {
    axios
      .get(
        `${API_URL}/search?q=${searchInput}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${storedToken}`,
        //   },
        // }
      )
      .then((response) => {
        console.log("handleClick is through", response.data);
        setOrgs(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllOrgs = () => {
    // if (userLocation === "unknown") {
    axios
      .get(`${API_URL}/orgs`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setOrgs(response.data);
      })
      .catch((error) => console.log(error));
    // } else {
    // axios
    //   .get(`${API_URL}/search/?q=${userLocation}`, {
    //     headers: {
    //       Authorization: `Bearer ${storedToken}`,
    //     },
    //   })
    //   .then((response) => {
    //     setOrgs(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // }
  };

  // useEffect(() => {
  //   getUser(userId);
  // }, [userId]);

  useEffect(() => {
    getAllOrgs();
  }, [searchInput]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search here"
        value={searchInput}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleClick}>
        Search
      </button>
      {orgs.length ? (
        orgs.map((organization) => (
          <OrganizationCard key={organization._id} {...organization} />
        ))
      ) : (
        <div>
          <p>No organizations found.</p>
          <p>
            Would you like to create a page for an organization at this
            location?
          </p>
          <Link to="/orgs/create">
            <button>Create an organization</button>
          </Link>
        </div>
      )}
    </div>
  );
}
