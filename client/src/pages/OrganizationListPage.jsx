import { useState, useEffect } from "react";
import axios from "axios";
import OrganizationCard from "./../components/OrganizationCard";

const API_URL = "http://localhost:3000/api";

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

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllOrgs();
  }, []);

  return (
    <div>
      {orgs.map((organization) => (
        <OrganizationCard key={organization._id} {...organization} />
      ))}
    </div>
  );
}

export default OrganizationListPage;
