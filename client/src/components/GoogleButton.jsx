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
                clientId="1075856615959-jb5bsiohdhef5en7l0blehp1pj4ru57h.apps.googleusercontent.com"
                buttonText={buttonText}
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

