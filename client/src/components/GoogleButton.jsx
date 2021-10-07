import React from 'react'
import { useState, useContext } from "react";
import GoogleLogin from 'react-google-login';
import axios from "axios";

import { AuthContext } from "../contexts/auth.context";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export default function GoogleButton(props) {
    const { buttonText } = props;
    const [errorMessage, setErrorMessage] = useState(undefined);

    const { logInUser } = useContext(AuthContext);

    const handleGoogleSuccess = (data) => {
        const {givenName, email} = data.profileObj
        
        const requestBody = {
          email,
          name: givenName,
          password: "GoogleUser1234"
        }
    
        axios
          .post(`${API_URL}/auth/google`, requestBody )
            .then((response) =>{ 
              const token = response.data.authToken;
              logInUser(token);
              props.history.push("/")
            })
            .catch((error) => {
              const errorDescription = error;
              setErrorMessage(errorDescription);
            });
      } 
    
      const handleGoogleFailure = (err) => {
        console.log("Error with google singup", err) 
        setErrorMessage(err)
      }
    
    return (
        <div>
            <GoogleLogin
                clientId = {
                  process.env.REACT_APP_GOOGLE_CLIENT_ID
                }
                clientSecret={process.env.REACT_APP_GOOGLE_CLIENT_SECRET}
                buttonText={buttonText}
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

