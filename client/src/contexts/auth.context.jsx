import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:3000/api";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const verifyStoredToken = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // If the server verifies that JWT token is valid  ✅
          const userToken = response.data;
          console.log(userToken, "Whats UP?");
          setUserToken(userToken);
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token) ❌
          setIsLoggedIn(false);
          setUserToken(null);
          setIsLoading(false);
        });
    } else {
      // If the token is not available
      setIsLoading(false);
    }
  };

  const logInUser = (token) => {
    localStorage.setItem("authToken", token);
    verifyStoredToken();

    /* 
      After saving the token in the localStorage we call the
      function `verifyStoredToken` which sends a new request to the
      server to verify the token. Upon receiving the response the function 
      `verifyStoredToken` updates the state variables `isLoggedIn`, `user` and `isLoading`
    */
  };

  const logOutUser = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");

    // Update the state variables
    setIsLoggedIn(false);
    setUserToken(null);
  };

  useEffect(() => {
    verifyStoredToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, userToken, logInUser, logOutUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
