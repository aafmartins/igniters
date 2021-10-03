import { useState, useEffect, useRef } from "react";
import axios from "axios";
import OrganizationCard from "./../components/OrganizationCard";

// mmapbox imports
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = process.env.MAPBOX_TOKEN   


const API_URL = "http://localhost:3000/api";

function OrganizationListPage() {
  const [orgs, setOrgs] = useState([]);

  // map Hooks. useRef .current orioerty is initialized to null and when its value changes it does not trigger a re-render
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(9.18);
  const [lat, setLat] = useState(48.77);
  const [zoom, setZoom] = useState(3);

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
    console.log("organizations", orgs)

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-103.5917, 40.6699],
      zoom: 3
      });
       
      map.on('load', () => {
        console.log("map loaded!!!")
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      console.log("this is all organizations", orgs)
      const orgsString = {features: orgs}
      //const orgsString = {features: JSON.stringify(orgs)}
      console.log("organizations string:", orgsString)
      map.addSource('organizations', {
      type: 'geojson',
      
      // add organizations geometry data. it has to be inside a features object
      data: orgsString,
      // data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });
       
      map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'organizations',
      filter: ['has', 'point_count'],
      paint: {
      // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      // with three steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 100
      //   * Yellow, 30px circles when point count is between 100 and 750
      //   * Pink, 40px circles when point count is greater than or equal to 750
      'circle-color': [
      'step',
      ['get', 'point_count'],
      '#E27BF5',
      100,
      '#E27BF5',
      750,
      '#E27BF5'
      ],
      'circle-radius': [
      'step',
      ['get', 'point_count'],
      20,
      100,
      30,
      750,
      40
      ]
      }
      });
       
      map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'organizations',
      filter: ['has', 'point_count'],
      layout: {
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12
      }
      });
       
      map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'organizations',
      filter: ['!', ['has', 'point_count']],
      paint: {
      'circle-color': '#E27BF5',
      'circle-radius': 15,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#E27BF5'
      }
      });
       
      // inspect a cluster on click
      map.on('click', 'clusters', (e) => {
        console.log("cluster point clicked")
      const features = map.queryRenderedFeatures(e.point, {
      layers: ['clusters']
      });
      console.log("features", features)
      const clusterId = features[0].properties.cluster_id;
      map.getSource('organizations').getClusterExpansionZoom(
      clusterId,
      (err, zoom) => {
      if (err) return;
       
      map.easeTo({
      center: features[0].geometry.coordinates,
      zoom: zoom
      });
      }
      );
      });
       
      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      map.on('click', 'unclustered-point', (e) => {
        console.log("e.features", e.features[0])
        const text = e.features[0].properties.popUpMarkup
        const coordinates = e.features[0].geometry.coordinates.slice();
        
        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(
            text
          )
        .addTo(map);
        });
        
        map.on('mouseenter', 'clusters', () => {
          console.log("mouse in over a cluster")
        map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
        });
        });
    //if (map.current) return; 
    // initialize map only once

    /*
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
    */

  });

  return (
    <div>
      <div id='map'  style={{width: "100%", height: "500px"}}></div>
      {/* <div className="map-container"  ref={mapContainer}  id='map'  style={{width: "100%", height: "500px"}}></div> */}
      
      {orgs.map((organization) => (
        <OrganizationCard key={organization._id} {...organization} />
      ))}
      
      {/* <div className="map-container"  ref={mapContainer}  id='map'  style={{width: "400px", height: "300px"}}></div> */}
    
    </div>
  );
}

export default OrganizationListPage;
