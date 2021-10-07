import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OrganizationCard from "../components/OrganizationCard";
import OrganizationsNearUserMap from "../components/OrganizationsNearUserMap";

import "../styles/searchPage.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export default function SearchPage(props) {
  const search = props.location.state;

  const [searchInput, setSearchInput] = useState(search);
  const [categoryInput, setCategoryInput] = useState("");
  const [orgs, setOrgs] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  const handleSelectChange = (e) => {
    e.preventDefault();
    setCategoryInput(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .get(`${API_URL}/search?q=${searchInput}&category=${categoryInput}`, {
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

  const getAllOrgs = () => {
    axios
      .get(`${API_URL}/search?q=${searchInput}&category=`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setOrgs(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllOrgs();
  }, []);

  return (
    <div>
      {orgs.length ? (
        <>
          <OrganizationsNearUserMap orgs={orgs} {...props} />
          <div>
            <form
              className="searchFormContainer searchForm"
              onSubmit={handleClick}
            >
              <div className="searchContainer">
                {/* <label htmlFor="nameOrLocation">
                  Search by name or location:
                </label> */}
                <input
                  className="searchInput searchPagePlaceholder"
                  type="text"
                  placeholder="Search by name or location"
                  name="nameOrLocation"
                  value={searchInput}
                  onChange={handleChange}
                />
                <img
                  src="/images/telescope.png"
                  className="searchImg searchImgInSearchPage"
                  alt=""
                />
              </div>
              <div className="searchContainer">
                {/* <label htmlFor="categories">Search by category:</label> */}
                <select
                  className="searchBarInput customSelect"
                  name="categories"
                  id="categories"
                  onChange={handleSelectChange}
                >
                  <option
                    // style="font-size: 20px; color:#4a54f1; text-align:center; padding-top:100px;"
                    disable="true"
                    value=""
                  >
                    Search by category
                  </option>
                  <option value="Activism">Activism</option>
                  <option value="Gender Discrimination">
                    Gender Discrimination
                  </option>
                  <option value="Human Rights">Human Rights</option>
                  <option value="Inequality">Inequality</option>
                  <option value="Malnutrition">Malnutrition</option>
                  <option value="Maternal Health">Maternal Health</option>
                  <option value="Reproductive Rights">
                    Reproductive Rights
                  </option>
                  <option value="Social Solidarity">Social Solidarity</option>
                  <option value="Victim Support">Victim Support</option>
                  <option value="Victim Protection">Victim Protection</option>
                  <option value="Women in Tech">Women in Tech</option>
                </select>
                <img
                  src="/images/telescope.png"
                  className="searchImg searchImgInSearchPage"
                  alt=""
                />
              </div>
              <button className="searchPageButton button-52 " type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="container-fluid">
            {orgs.map((organization) => (
              <OrganizationCard key={organization._id} {...organization} />
            ))}
          </div>
        </>
      ) : (
        <div>
          <p>No organizations found.</p>
          <p>Would you like to create a page for an organization?</p>
          <Link to="/orgs/create">
            <button className="searchButton button-52 ">
              Create an Organization
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
