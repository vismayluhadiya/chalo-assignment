import { useRef } from "react";
import { useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import mapServices from "@tomtom-international/web-sdk-services";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const popupOffsets = {
  top: [0, 0],
  bottom: [0, -50],
  left: [25, -35],
  right: [-25, -35],
};
const TOM_TOM_KEY = "lShoCSsBrDekAITrQwqPHTfXZI47gzFH";

const Map = ({ stops }) => {
  const mapElement = useRef();

  const mapZoom = 3;

  useEffect(() => {
    let map = tt.map({
      key: TOM_TOM_KEY,
      container: mapElement.current,
      center: [stops[0].longitude, stops[0].latitude],
      zoom: mapZoom,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
    });

    const locations = [];

    stops.forEach((stop) =>
      locations.push(stop.longitude + "," + stop.latitude)
    );

    mapServices.services
      .calculateRoute({
        key: TOM_TOM_KEY,
        locations: locations.join(":"),
      })
      .then(function (response) {
        var geojson = response.toGeoJson();
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          paint: {
            "line-color": "#00d7ff",
            "line-width": 2,
          },
        });
        var bounds = new tt.LngLatBounds();
        geojson.features[0].geometry.coordinates.forEach((point) =>
          bounds.extend(tt.LngLat.convert(point))
        );
        map.fitBounds(bounds, { padding: 20 });
      });

    stops.forEach((stop) => {
      let marker = new tt.Marker({
        draggable: false,
      })
        .setLngLat([stop.longitude, stop.latitude])
        .addTo(map);
      let popup = new tt.Popup({ offset: popupOffsets }).setHTML(stop.name);
      marker.setPopup(popup);
    });

    return () => map.remove();
  }, [stops]);

  //   useEffect(() => {
  //     if (!longitude || !latitude) {
  //       setDefaultCoordinates();
  //     }
  //   }, [latitude, longitude]);

  //   const setDefaultCoordinates = () => {
  //     const defLatitude = 0;
  //     const defLongitude = 0;
  //     if (location) {
  //       defLatitude = location.getCurrentPosition(
  //         (position) => position.coords.latitude
  //       );
  //       defLongitude = location.getCurrentPosition(
  //         (position) => position.coords.longitude
  //       );
  //     }
  //     setMapLatitude(defLatitude);
  //     setMapLongitude(defLongitude);
  //   };

  //   const increaseZoom = () => {
  //     if (mapZoom < MAX_ZOOM) {
  //       setMapZoom(mapZoom + 1);
  //     }
  //   };

  //   const decreaseZoom = () => {
  //     if (mapZoom > 1) {
  //       setMapZoom(mapZoom - 1);
  //     }
  //   };

  //   const updateMap = () => {
  //     map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
  //     map.setZoom(mapZoom);
  //   };

  return <div ref={mapElement} className="mapDiv" />;
};

export default Map;
