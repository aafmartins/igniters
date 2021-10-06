import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./../contexts/auth.context";
import axios from "axios";
import OrganizationsNearUserMap from "../components/OrganizationsNearUserMap";

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
    <div>
      <h1>Organizations near you</h1>
      <OrganizationsNearUserMap orgs={orgsForMap} />
    </div>
  );
}
