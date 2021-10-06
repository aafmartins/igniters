import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./../contexts/auth.context";
import axios from "axios";
import OrganizationsNearUserMap from "../components/OrganizationsNearUserMap";
import "../styles/OrganizationsNearMe.css"
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
        console.log(response)
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
      console.log(org.country, user.country);
      if (org.country === user.country) {
        console.log(org.country, user.country)
        neededOrgs.push(org);
      }
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
  }, [user,orgs]);

  return (
    <>
{orgsForMap.length === 0 ?
  <div className="divContainer">
      <p className="paragraph">Is there no organizations in your area? Let's create one! </p>
      <Link to="/orgs/create">
        <img src="/images/hero.png" className="heroImg" alt="" />
        <button className="button-52">Create an organization</button>
      </Link>   

  </div> 
  :
    <div className="divContainer">
      <OrganizationsNearUserMap orgs={orgsForMap}/>
      <p className="paragraph">Hello <b>{user.name}</b>, these are the organizations that we found in <b>{user.country}</b></p>
      <Link to="/orgs/create">
        <button className="button-52">Create an organization</button>
      </Link>   
    </div>
}

</>

  );
}
