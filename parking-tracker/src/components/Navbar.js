import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>ParkingBuddy</h1>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/map">Park Now</Link>
        <Link to="/history">History</Link>
      </div>
    </nav>
  );
}

export default Navbar;
