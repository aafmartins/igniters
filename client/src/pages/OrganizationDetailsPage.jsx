import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddReview from "../components/AddReview";
import ReviewCard from "../components/ReviewCard";

const API_URL = "http://localhost:3000/api";

function OrganizationDetailsPage(props) {
  const [org, setOrg] = useState(null);
  const [savedOrg, setSavedOrg] = useState([])
  const orgId = props.match.params.id;
   const storedToken = localStorage.getItem("authToken");

  const handleSave = (e) => {
    e.preventDefault();
    // const storedToken = localStorage.getItem("authToken");
console.log('Authorization token', storedToken)
    axios
      .put(`${API_URL}/orgs/${orgId}`, {},{
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
          console.log('This is our organization being saved, we hope?:', response)
          setSavedOrg(response);
      })
      .catch((error) => console.log(error));
  }

  const getOrg = () => {
    // Get the token from the localStorage
    // const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/orgs/${orgId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setOrg(response.data);
      })
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getOrg();
  }, []);

  return (
    <div className="ProjectDetails">
      {!org ? (
        "Loading..."
      ) : (
        <>
          <h1>{org.name}</h1>
          <p>{org.description}</p>
          <button onClick={handleSave}>Save Organization</button>
        </>
      )}

      <AddReview 
        refreshOrg={getOrg} 
        orgId={orgId} 

      />

      <Link to="/orgs">
        <button>Back to Organizations</button>
      </Link>
      {/* Below will need to be inside a protected route/condition - only creator
      can access edit! */}
      <Link to={`/orgs/edit/${orgId}`}>
        <button>Edit Organization</button>
      </Link>

      { org && org.reviews.map((review) => {
        return (
          <ReviewCard key={review._id} {...review} />
          )
        } 
      )}

    </div>
  );
}

export default OrganizationDetailsPage;
