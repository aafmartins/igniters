import React, { useState, useEffect } from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function AllOrganizationsMap (props) {
  const {orgs} = props;

  const [lng, setLng] = useState(-35);
  const [lat, setLat] = useState(30);
  const [zoom, setZoom] = useState(1);

useEffect(() => {

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/hribu/ckufjv3c47vjn17mpj3kujvhi", // change style
      center: [lng, lat],
      zoom: zoom,
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on("load", () => {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.

      // orgs data has to be passed as a features property inside an object
      const orgsString = { features: orgs };

      //Add an image to use as a custom marker
      map.loadImage( './images/lifebuoy.png',
      // 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
      (error, image) => {
          if (error) {
            console.log("did not load image")
            throw error
          };
          map.addImage('custom-marker', image);
          // Add a GeoJSON source with 2 points
        });

      map.addSource("organizations", {
        type: "geojson",
        data: orgsString,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "organizations",
        filter: ["has", "point_count"],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#E27BF5",
            100,
            "#E27BF5",
            750,
            "#E27BF5",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "organizations",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      });

      map.addLayer({
        'id': 'unclustered-point',
        'type': 'symbol',
        'source': 'organizations',
        filter: ["!", ["has", "point_count"]],
        'layout': {
            'icon-image': 'custom-marker',
            'icon-size': 0.04
        }
    });

      // inspect a cluster on click
      map.on("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        const clusterId = features[0].properties.cluster_id;
        map
          .getSource("organizations")
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
      });

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      map.on("click", "unclustered-point", (e) => {
        const orgId = e.features[0].properties.id;
        const orgName = e.features[0].properties.name;
        const coordinates = e.features[0].geometry.coordinates.slice();

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        map.easeTo({
          center: e.features[0].geometry.coordinates.slice(),
          zoom: 12,
        });

        // create an element with the popup content
        const PopUpLink = document.createElement('div');
        PopUpLink.innerHTML =`<button id="popup-map-button" style="border:none;background:none;" >${orgName}</button>`;
        PopUpLink.addEventListener('click', (e) => {
          props.history.push(`/orgs/${orgId}`)
        });
        new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setDOMContent(PopUpLink)
        .addTo(map);

      });

      // Once the organizations (map features) are loaded, zoom to fit all orgs
      const featuresLoaded = map.getSource('organizations')._options.data.features;
      if(featuresLoaded.length !== 0) {
        const bounds = new mapboxgl.LngLatBounds();
        const mySource = map.getSource('organizations');
        mySource._options.data.features.forEach((feature) => {
          bounds.extend(feature.geometry.coordinates);
        });
        map.fitBounds(bounds, {padding : 30});
      }

      //
      map.on("mouseenter", "clusters", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "clusters", () => {
        map.getCanvas().style.cursor = "";
      });

      /*
      const mapButton = document.getElementById('map-button');

      mapButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("handle button")
        const featuresLoaded = map.getSource('organizations')._options.data.features;
        if(featuresLoaded.length !== 0) {
          const bounds = new mapboxgl.LngLatBounds();
          const mySource = map.getSource('organizations');
          mySource._options.data.features.forEach((feature) => {
            bounds.extend(feature.geometry.coordinates);
          });
          map.fitBounds(bounds, {padding : 30});
        }
      }, false)

      class ToggleControl extends mapboxgl.GeolocateControl {
            _onSuccess(position) {
                this.map.flyTo({
                    center: [position.coords.longitude, position.coords.latitude],
                    zoom: 17,
                    bearing: 0,
                    pitch: 0
                });
            }

            onAdd(map, cs) {
                this.map = map;
                this.container = document.createElement('div');
                this.container.className = `mapboxgl-ctrl`;
                const button = this._createButton('monitor_button')
                this.container.appendChild(button);
                return this.container;
            }

            _createButton(className) {
                const el = window.document.createElement('button')
                el.className = className;
                el.textContent = 'Use my location';
                el.addEventListener('click', () => {
                    this.trigger();
                });
                this._setup = true;
                return el;
            }
        }
        const toggleControl = new ToggleControl({})
        map.addControl(toggleControl, 'top-left')
        */

    });

  },[orgs]);

  return (
    <>
      <div id="map" style={{ width: "100%", height: "0", padding: "0 0 56% 0" }}></div>
    </>
  )

}