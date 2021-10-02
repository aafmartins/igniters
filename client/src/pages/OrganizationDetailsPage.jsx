import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddReview from "../components/AddReview";
import ReviewCard from "../components/ReviewCard";
import { AuthContext } from "./../contexts/auth.context";

const API_URL = "http://localhost:3000/api";

function OrganizationDetailsPage(props) {
  const [org, setOrg] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { userToken } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState(false);
  const [isCreatedByUser, setIsCreatedByUser] = useState(false);
  const orgId = props.match.params.id;
  const userId = userToken._id;
  const storedToken = localStorage.getItem("authToken");

  const getUser = (userId) => {
    axios
      .get(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        console.log("data from user", response.data.savedOrganizations);
        const savedId = response.data.savedOrganizations;

        for (const org of savedId) {
          if (org === orgId) {
            setIsSaved(true);
          }
        }
      })
      .catch((error) => console.log(error));
  };

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
        console.log("My organization:", response.data);
        setOrg(response.data);
        const creatorId = response.data.creator;

        if (creatorId === userId) {
          setIsCreatedByUser(true);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getOrg();
  }, []);

  useEffect(() => {
    getUser(userId);
  }, [userId]);

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
        </>
      )}

      <Link to="/orgs">
        <button>Back to Organizations</button>
      </Link>
      {/* Below will need to be inside a protected route/condition - only creator
      can access edit! */}
      {isCreatedByUser ? (
        <div>
          <Link to={`/orgs/edit/${orgId}`}>
            <button>Edit Organization</button>
          </Link>
        </div>
      ) : isSaved ? (
        <div>
          <button onClick={handleRemove}>Remove</button>
          <br />
          <br />
          <button onClick={toggleForm}>
            {showForm ? "Hide Review Form" : "Add a Review"}
          </button>
          <br />
          {showForm ? (
            <AddReview
              toggleForm={toggleForm}
              refreshOrg={getOrg}
              orgId={orgId}
            />
          ) : null}

          {org &&
            org.reviews.map((review) => {
              return (
                <ReviewCard refreshOrg={getOrg} key={review._id} {...review} />
              );
            })}
        </div>
      ) : (
        <div>
          <button onClick={handleSave}>Save Organization</button>
          <br />
          <br />
          <button onClick={toggleForm}>
            {showForm ? "Hide Review Form" : "Add a Review"}
          </button>
          <br />
          {showForm ? (
            <AddReview
              toggleForm={toggleForm}
              refreshOrg={getOrg}
              orgId={orgId}
            />
          ) : null}

          {org &&
            org.reviews.map((review) => {
              return (
                <ReviewCard refreshOrg={getOrg} key={review._id} {...review} />
              );
            })}
        </div>
      )}
    </div>
  );
}

export default OrganizationDetailsPage;
