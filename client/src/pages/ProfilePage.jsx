import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./../contexts/auth.context";
import '../styles/ProfilePage.css'

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

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

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getUser(userId);
  }, [userId]);

  return (
    <div>
      {!user.name ? (
        <div className="profilePageContainer">
         <img src="/images/loading.png" className="profileImage" alt="" />
        </div>
      ) : (
        <div className="profilePageContainer">
          <h1>Hello, {user.name}!</h1>
          <img src="/images/profile.png" className="profileImage" alt="" />
          <Link to={`/profile/edit/${userId}`}>
            <button className="button-52 profileEditButton">Edit Profile</button>
          </Link>
        </div>
      )}
    </div>
  );
}
