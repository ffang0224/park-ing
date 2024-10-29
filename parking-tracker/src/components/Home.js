import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>Never Forget Where You Parked</h1>
      <p>Track your parking spots with ease using ParkingBuddy</p>
      <div className="cta-buttons">
        <Link to="/map" className="cta-button primary">
          Park Now
        </Link>
        <Link to="/history" className="cta-button secondary">
          View History
        </Link>
      </div>
    </div>
  );
}

export default Home;
