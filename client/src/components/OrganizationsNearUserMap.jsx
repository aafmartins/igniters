import { useEffect } from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = "pk.eyJ1IjoiaHJpYnUiLCJhIjoiY2t1Nmsycm5tMmg3MTJucGNoamJxODBrMCJ9.aT4XOnLfqTr3V4EowsmtSg";

export default function OrganizationsNearUserMap(props) {
    const {orgs} = props;

    useEffect(() => {

        const map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11", // change style
          center: [-35, 30],
          zoom: 1,
        });
    
        map.on("load", () => {
          
          // Add a new source from our GeoJSON
          // Add an image to use as a custom marker
          map.loadImage( './images/lifebuoy.png',
            // 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
            (error, image) => {
                if (error) throw error;
                map.addImage('custom-marker', image);
                // Add a GeoJSON source with 2 points
                map.addSource('organizations', {
                    'type': 'geojson',
                    'data': { 
                      'type' : 'FeatureCollection',
                      'features' : orgs}
                });

                // Add a symbol layer
                map.addLayer({
                    'id': 'points',
                    'type': 'symbol',
                    'source': 'organizations',
                    'layout': {
                        'icon-image': 'custom-marker',
                        'icon-size': 0.05
                        // get the title name from the source's "title" property
                        // 'text-field': ['get', 'title'],
                        // 'text-font': [
                        //     'Open Sans Semibold',
                        //     'Arial Unicode MS Bold'
                        // ],
                        // 'text-offset': [0, 1.25],
                        // 'text-anchor': 'top'
                    }
                });
            }
          );          
    
          // When a click event occurs on a feature in
          // the unclustered-point layer, open a popup at
          // the location of the feature, with
          // description HTML from its properties.
          map.on("click", "points", (e) => {
            const popUpMarkup = e.features[0].properties.popUpMarkup;
            const coordinates = e.features[0].geometry.coordinates.slice();
    
            // Ensure that if the map is zoomed out such that
            // multiple copies of the feature are visible, the
            // popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            
            map.easeTo({
              center: e.features[0].geometry.coordinates.slice(),
              zoom: 10,
            });
    
            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(popUpMarkup)
              .addTo(map);
    
          });
    
          // Once the organizations (map features) are loaded, zoom to fit all orgs

          if(orgs.length !== 0) {
            const bounds = new mapboxgl.LngLatBounds();
            orgs.forEach((org) => {
              bounds.extend(org.geometry.coordinates);
            });
            map.fitBounds(bounds, {padding : 80});
          }
    
    
        });
    
      },[orgs]);
    

    return (
        <div id="map" style={{ width: "100%", height: "500px" }}></div>
    )
}
