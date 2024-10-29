import React from "react";
import "./ParkingHistory.css";

function ParkingHistory() {
  const history = JSON.parse(localStorage.getItem("parkingHistory") || "[]");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const openInMaps = (lat, lng) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  return (
    <div className="history-container">
      <h2>Parking History</h2>
      {history.length === 0 ? (
        <p>No parking history available</p>
      ) : (
        <div className="history-list">
          {history.reverse().map((parking, index) => (
            <div key={index} className="history-item">
              <div className="history-info">
                <span className="history-date">
                  {formatDate(parking.timestamp)}
                </span>
                <button
                  className="view-map-button"
                  onClick={() => openInMaps(parking.lat, parking.lng)}
                >
                  View in Maps
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ParkingHistory;
