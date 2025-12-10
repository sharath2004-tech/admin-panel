/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  LoadScript,
} from "@react-google-maps/api";
import React from "react";
interface MapProps {
  lat: number;
  lng: number;
}

const MapPreview: React.FC<MapProps> = ({ lat, lng }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY,
  });

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY}
      id="script-loader"
    >
      <div className="w-full">
        {isLoaded ? (
          <div>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "300px" }}
              center={{ lat, lng }}
              zoom={18}
              // options={{ disableDefaultUI: true }}
            >
              <Marker position={{ lat, lng }} />
            </GoogleMap>
          </div>
        ) : (
          <h2 className="font-medium">Loading</h2>
        )}
      </div>
    </LoadScript>
  );
};

export default MapPreview;
