import { useState, useEffect, useContext } from "react";
import React from "react";
import axios from "axios";
import AddOrganization from "./../components/AddOrganization";
import { AuthContext } from "./../contexts/auth.context";

const API_URL = "http://localhost:3000/api";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const {
    userToken: { _id: userId },
  } = useContext(AuthContext);

  const getUser = (userId) => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUser(response.data);
        console.log("My user:", user);
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getUser(userId);
  }, [userId]);

  return <div>{!user.name ? "Loading profile..." : <AddOrganization />}</div>;
}
