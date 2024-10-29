import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ParkingMap from "./components/ParkingMap";
import ParkingHistory from "./components/ParkingHistory";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<ParkingMap />} />
          <Route path="/history" element={<ParkingHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
