import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddReview from "../components/AddReview";
import ReviewCard from "../components/ReviewCard";
import { AuthContext } from "./../contexts/auth.context";

// mmapbox imports
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken =
  "pk.eyJ1IjoiaHJpYnUiLCJhIjoiY2t1Nmsycm5tMmg3MTJucGNoamJxODBrMCJ9.aT4XOnLfqTr3V4EowsmtSg"; //process.env.MAPBOX_TOKEN;

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

  // map Hooks. useRef .current orioerty is initialized to null and when its value changes it does not trigger a re-render
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(9.181851961805604);
  const [lat, setLat] = useState(48.77806893750751);
  const [zoom, setZoom] = useState(15);

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
        console.log("My organization:", response.data);
        setOrg(response.data);
        const creatorId = response.data.creator;

        if (creatorId === userId) {
          setIsCreatedByUser(true);
        }

        // set coordinates for map
        setLng(response.data.geometry.coordinates[0]);
        setLat(response.data.geometry.coordinates[1]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getOrg();
  }, []);

  useEffect(() => {
    //if (map.current) return;
    // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    // add marker to the organization location
    const marker1 = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map.current);
  });

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

      <div
        className="map-container"
        ref={mapContainer}
        id="map"
        style={{ width: "400px", height: "300px" }}
      ></div>

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
