import React, { useState, useEffect } from "react";
import OrganizationCard from "./OrganizationCard";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [orgs, setOrgs] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleClick = () => {
    axios
      .get(`${API_URL}/search/?q=${searchInput}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setOrgs(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      {orgs.map((organization) => (
        <OrganizationCard key={organization._id} {...organization} />
      ))}
    </div>
  );
}
