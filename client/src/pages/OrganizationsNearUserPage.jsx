import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./../contexts/auth.context";
import axios from "axios";
import OrganizationsNearUserMap from "../components/OrganizationsNearUserMap";
import "../styles/OrganizationsNearMe.css";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export default function OrganizationsNearUserPage(props) {
  const { userToken } = useContext(AuthContext);
  const userId = userToken._id;
  const [user, setUser] = useState({});
  const [orgs, setOrgs] = useState([]);
  const [orgsForMap, setOrgsForMap] = useState([]);

  // Get the token from the localStorage
  const storedToken = localStorage.getItem("authToken");

  const getUser = (userId) => {
    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getAllOrgs = () => {
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
  };

  function mapOrgsArray() {
    let neededOrgs = [];
    orgs.map((org) => {
      if (org.country === user.country) {
        neededOrgs.push(org);
      }
      return neededOrgs;
    });
    setOrgsForMap(neededOrgs);
  }

  useEffect(() => {
    getAllOrgs();
  }, []);

  useEffect(() => {
    getUser(userId);
  }, [userId]);

  useEffect(() => {
    mapOrgsArray();
  }, [user, orgs]);

  return (
    <>
      {orgsForMap.length === 0 ? (
        <div className="divContainer">
          <img src="/images/hero.png" className="heroImg" alt="" />
          <div className="textContainer">
            <h4>Oops, we didn't find any organizations in your area...</h4>
            <Link to="/orgs/create">
              <button className="searchButton button-52 ">
                Let's create one!
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="divContainer">
          <OrganizationsNearUserMap orgs={orgsForMap} {...props} />
          <div className="textContainer">
            <p className="paragraph">
              Hello <b>{user.name}</b>, these are the organizations we found in{" "}
              <b>{user.country}</b>
            </p>
            <Link to="/orgs/create">
              <button className="button-52">Create another organization</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}