import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./ParkingMap.css";

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function ParkingMap() {
  const [parkedLocation, setParkedLocation] = useState(null);

  const saveParking = (location) => {
    const parkingData = {
      lat: location.lat,
      lng: location.lng,
      timestamp: new Date().toISOString(),
    };

    // Save to local storage
    const history = JSON.parse(localStorage.getItem("parkingHistory") || "[]");
    history.push(parkingData);
    localStorage.setItem("parkingHistory", JSON.stringify(history));

    setParkedLocation(location);
  };

  return (
    <div className="map-container">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        {parkedLocation && (
          <Marker position={parkedLocation}>
            <Popup>Your car is parked here!</Popup>
          </Marker>
        )}
      </MapContainer>
      <button
        className="park-here-button"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              saveParking({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            (error) => {
              console.error("Error getting location:", error);
              alert(
                "Unable to get your location. Please enable location services."
              );
            }
          );
        }}
      >
        Park Here
      </button>
    </div>
  );
}

export default ParkingMap;
