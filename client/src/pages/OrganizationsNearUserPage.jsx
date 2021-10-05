import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OrganizationCard from "./OrganizationCard";

// import { AuthContext } from "./../contexts/auth.context";

const API_URL = "http://localhost:3000/api";

export default function OrganizationsNearUserPage() {
  const [user, setUser] = useState({});

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
