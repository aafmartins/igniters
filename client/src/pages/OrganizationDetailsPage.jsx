import "../styles/organizationDetailsPage.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddReview from "../components/AddReview";
import ReviewCard from "../components/ReviewCard";
import { AuthContext } from "./../contexts/auth.context";
import { randomImageUrl } from "../javascripts/randomImageUrl";
import OrganizationDetailsMap from "../components/OrganizationDetailsMap";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

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
        `${API_URL}/user-org/save-org`,
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
        `${API_URL}/user-org/remove-saved-org`,
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
    <div className="orgDetailsContainer">
      {!org ? (
        <img
          src="../../public/images/loading.png"
          alt="Loading"
          className="loadingImg"
        />
      ) : (
        <>
          <div>
            <img src={randomImageUrl()} alt="" className="orgHeaderImg" />
          </div>

          <div className="mainDetailsContainer">
            <div className="nameAndDescriptionContainer">
              <h1>{org.name}</h1>
              <p>{org.description}</p>
            </div>
            <div className="orgContactsAndDetails">
              <div className="orgDetailsSubContainer">
                <h6>Contact Details</h6>
                <a href={org.url}>APAV</a>
                {/* <br /> */}
                {/* <a href={org.email}>{org.email}</a> */}
                <p>{org.email}</p>
                <p className="address">
                  {org.street} <br /> {org.city}, {org.country}
                </p>
              </div>
              <div className="orgDetailsUl orgDetailsSubContainer">
                <ul>
                  <h6>Categories</h6>
                  {org.categories.map((category) => {
                    return <li>{category}</li>;
                  })}
                </ul>
                <div>
                  <h6>Main language</h6>
                  <p>{org.mainIdiom}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="mapAndButtonsContainer">
        <OrganizationDetailsMap org={org} />
        {/* <Link to="/orgs">
          <button>Back to Organizations</button>
        </Link> */}
        <div className="buttonsContainer">
          {isCreatedByUser ? (
            <div>
              <Link to={`/orgs/edit/${orgId}`}>
                <button className="button-52 orgDetailsButtons">Edit</button>
              </Link>
            </div>
          ) : isSaved ? (
            <div>
              <button className="button-52" onClick={handleRemove}>
                Remove
              </button>
              <br />
              <br />
              <button className="button-52" onClick={toggleForm}>
                {showForm ? "Hide Form" : "Review"}
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
                    <ReviewCard
                      refreshOrg={getOrg}
                      key={review._id}
                      {...review}
                    />
                  );
                })}
            </div>
          ) : (
            <div>
              <button
                className="button-52 orgDetailsButtons"
                onClick={handleSave}
              >
                Save
              </button>
              <br />
              <br />
              <button
                className="button-52 orgDetailsButtons"
                onClick={toggleForm}
              >
                {showForm ? "Hide Form" : "Review"}
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
                    <ReviewCard
                      refreshOrg={getOrg}
                      key={review._id}
                      {...review}
                    />
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrganizationDetailsPage;
