import { useState, useEffect, useRef } from "react";
import axios from "axios";
import OrganizationCard from "./../components/OrganizationCard";

// mmapbox imports
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken ='pk.eyJ1IjoiaHJpYnUiLCJhIjoiY2t1Nmsycm5tMmg3MTJucGNoamJxODBrMCJ9.aT4XOnLfqTr3V4EowsmtSg'     //process.env.MAPBOX_TOKEN;

const API_URL = "http://localhost:3000/api";

function OrganizationListPage() {
  const [orgs, setOrgs] = useState([]);

  // map Hooks. useRef .current orioerty is initialized to null and when its value changes it does not trigger a re-render
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(9.18);
  const [lat, setLat] = useState(48.77);
  const [zoom, setZoom] = useState(15);

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

  useEffect(() => {
    //if (map.current) return; 
    // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    console.log("organizations array: ", orgs)

    // create array of orgs markers
    const markersArray = orgs.map(eachOrg => new mapboxgl.Marker())
     console.log("what is in markersArray", markersArray)
    
    for (let i = 0; i < markersArray.length; i ++) {

      let longitude = orgs[i].geometry.coordinates[0]
      let latitude = orgs[i].geometry.coordinates[1]

      markersArray[i]
        .setLngLat([longitude, latitude])
        .addTo(map.current);
    }

  });

  return (
    <div>
      {orgs.map((organization) => (
        <OrganizationCard key={organization._id} {...organization} />
      ))}
      
      <div className="map-container"  ref={mapContainer}  id='map'  style={{width: "400px", height: "300px"}}></div>
    
    </div>
  );
}

export default OrganizationListPage;
