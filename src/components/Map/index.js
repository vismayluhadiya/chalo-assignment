import GoogleMapReact from "google-map-react";
import { useSelector } from "react-redux";
const Map = () => {
  const routes = useSelector((state) => state.routes.routes || null);

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "300px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        yesIWantToUseGoogleMapApiInternals
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <div lat={59.955413} lng={30.337844} text={"A"} /* Kreyser Avrora */ />

        {/* <AnyReactComponent lat={59.955413} lng={30.337844} text="hdhdhhd" /> */}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
