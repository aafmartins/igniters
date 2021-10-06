import { useState, useEffect } from "react";
import axios from "axios";
import OrganizationCard from "./../components/OrganizationCard";
import AllOrganizationsMap from "../components/AllOrganizationsMap";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

function OrganizationListPage() {
  const [orgs, setOrgs] = useState([]);

  const getAllOrgs = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/orgs`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => setOrgs(response.data))
      .catch((error) => console.log(error));
  };

  // get all the organizations only once
  useEffect(() => {
    getAllOrgs();
  }, []);

  return (
    <div>
      <AllOrganizationsMap 
         orgs={orgs}
      />
      {orgs.map((organization) => (
        <OrganizationCard key={organization._id} {...organization} />
      ))}
    </div>
  );
}

export default OrganizationListPage;
