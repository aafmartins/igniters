import { useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = "pk.eyJ1IjoiaHJpYnUiLCJhIjoiY2t1Nmsycm5tMmg3MTJucGNoamJxODBrMCJ9.aT4XOnLfqTr3V4EowsmtSg"; //process.env.MAPBOX_TOKEN;

export default function OrganizationDetailsMap(props) {
    const {org} = props;
    let lng = -35;
    let lat = 30;

    useEffect(() => {
        if(org) {
            lng = org.geometry.coordinates[0]
            lat = org.geometry.coordinates[1]

        const map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/hribu/ckufjv3c47vjn17mpj3kujvhi",
          center: [lng, lat],
          zoom: 10,
        });

        map.addControl(new mapboxgl.NavigationControl());

        map.on("load", () => {
            // Add a new source from our GeoJSON
            // Add an image to use as a custom marker
            map.loadImage( '/images/lifebuoy.png',
              //'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
              (error, image) => {
                  if (error) throw error;
                  map.addImage('custom-marker', image);
                  // Add a GeoJSON source with 2 points
                  map.addSource('organizations', {
                      'type': 'geojson',
                      'data': { 
                        'type' : 'FeatureCollection',
                        'features' : [ org ]  
                      }
                  });
  
                  // Add a symbol layer
                  map.addLayer({
                      'id': 'points',
                      'type': 'symbol',
                      'source': 'organizations',
                      'layout': {
                          'icon-image': 'custom-marker',
                          'icon-size': 0.04
                      }
                  });
              }
            );                
          });
        }

    }, [org]);

    return (
        <div id="map" style={{ width: "100%", height: "0", padding: "0 0 56% 0" }}></div>
    )
}
