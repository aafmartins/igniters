import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddReview from "../components/AddReview";
import ReviewCard from "../components/ReviewCard";

const API_URL = "http://localhost:3000/api";

function OrganizationDetailsPage(props) {
  const [org, setOrg] = useState(null);
  const [showForm, setShowForm] = useState(false);
  // const [isSaved, setIsSaved] = useState(false);
  const orgId = props.match.params.id;

  const storedToken = localStorage.getItem("authToken");

  const handleSave = (e) => {
    e.preventDefault();

    axios
      .put(
        `${API_URL}/save-org`,
        { orgId },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      // .then(() => {
      //   setIsSaved(true);
      // })
      .then(() => {
        props.history.push("/my-orgs");
      })
      .catch((error) => console.log(error));
  };

  const handleRemove = () => {
    // Send the token through the request "Authorization" Headers
    axios
      .put(
        `${API_URL}/remove-saved-org`,
        { orgId },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        props.history.push("/my-orgs");
      })
      .catch((err) => console.log(err));
  };

  const getOrg = () => {
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

  //function to toggle the form AddReview hidden or showing style
  const toggleForm = () => {
    setShowForm(!showForm);
  };

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

      <Link to="/orgs">
        <button>Back to Organizations</button>
      </Link>
      {/* Below will need to be inside a protected route/condition - only creator
      can access edit! */}
      <Link to={`/orgs/edit/${orgId}`}>
        <button>Edit Organization</button>
      </Link>
      {/* {!isSaved ? <button onClick={handleRemove}>Remove</button> : null} */}
      <button onClick={handleRemove}>Remove</button>
      <br />
      <br />
      <button onClick={toggleForm}>
        {showForm ? "Hide Review Form" : "Add a Review"}
      </button>
      <br />
      {showForm ? (
        <AddReview toggleForm={toggleForm} refreshOrg={getOrg} orgId={orgId} />
      ) : null}

      {org &&
        org.reviews.map((review) => {
          return (
            <ReviewCard refreshOrg={getOrg} key={review._id} {...review} />
          );
        })}
    </div>
  );
}

export default OrganizationDetailsPage;
