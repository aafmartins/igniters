import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./../contexts/auth.context";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

export default function OrganizationsNearUserPage(props) {
  const { userToken } = useContext(AuthContext);
  const userId = userToken._id;
  const [user, setUser] = useState({});
  const [orgs, setOrgs] = useState([]);
  const [orgsForMap, setOrgsForMap] = useState([]);
  let neededOrgs = [];
  // Get the token from the localStorage
  const storedToken = localStorage.getItem("authToken");

  const getUserAndOrgs = (userId) => {
    axios
      .get(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        console.log("user data", response.data);
        axios
          .get(`${API_URL}/orgs`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })
          .then((response) => {
            // setOrgs(response.data);
            console.log(response.data);
            // const orgs = response.data;

            response.data.map((org) => {
              if (org.country === user.country) {
                console.log(org.country, user.country);
                neededOrgs.push(org);
              }
              // return neededOrgs;
            });

            console.log("orgs after mapping", neededOrgs);
            
          })
          .catch((error) => console.log(error));
      });
  };
  // const getUser = (userId) => {
  //   // Send the token through the request "Authorization" Headers
  //   axios
  //     .get(`${API_URL}/users/${userId}`, {
  //       headers: {
  //         Authorization: `Bearer ${storedToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       setUser(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // const getAllOrgs = () => {
  //   axios
  //     .get(`${API_URL}/orgs`, {
  //       headers: {
  //         Authorization: `Bearer ${storedToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       setOrgs(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // function mapOrgsArray() {
  //   orgs.map((org) => {
  //     console.log(org.country, user.country);
  //     if (org.country === user.country) {
  //       neededOrgs.push(org);
  //     }
  //   });

  //   setOrgsForMap(neededOrgs);
  //   console.log(neededOrgs);
  // }

  // useEffect(() => {
  //   mapOrgsArray();
  // }, []);

  // useEffect(() => {
  //   getAllOrgs();
  //   console.log(neededOrgs);
  // }, []);

  // useEffect(() => {
  //   getUser(userId);
  // }, [userId]);

  useEffect(() => {
    getUserAndOrgs(userId);
  }, [props]);

  return (
    <div>
      <h1>Organizations near you</h1>
      {orgsForMap.map((org) => {
        <p>{org.country}</p>;
      })}
    </div>
  );
}
