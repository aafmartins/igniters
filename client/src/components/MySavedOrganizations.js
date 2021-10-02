import { useState, useEffect } from "react";
import axios from "axios";
import OrganizationCard from "./../components/OrganizationCard";

const API_URL = "http://localhost:3000/api";

function MySavedOrganizations(props) {
  const [savedOrgs, setSavedOrgs] = useState([]);

  const getAllSavedOrgs = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/my-saved-orgs`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setSavedOrgs(response.data.savedOrganizations);
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllSavedOrgs();
  }, []);

  return (
    <div>
      {savedOrgs.map((organization) => (
        <div>
          <OrganizationCard key={organization._id} {...organization} />
        </div>
      ))}
    </div>
  );
}

export default MySavedOrganizations;
