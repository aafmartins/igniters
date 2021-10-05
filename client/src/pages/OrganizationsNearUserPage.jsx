import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../contexts/auth.context";
import axios from "axios";
import OrganizationCard from "./OrganizationCard";

// import { AuthContext } from "./../contexts/auth.context";

const API_URL = process.env.REACT_APP_API_URL;

export default function OrganizationsNearUserPage() {
  const { userToken } = useContext(AuthContext);
  const userId = userToken._id;
  // const [user, setUser] = useState({});

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

  useEffect(() => {
    getAllOrgs();
  }, []);

  return <div></div>;
}
