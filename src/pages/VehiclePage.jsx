// This page is the display layout for a selected vehicle.
// The layout includes a navbar for vehicle specific expanded view pages,
// and the container for the various component Displays.
import { useState } from "react";
import Bento from "../components/garageViews/BentoView";
// import Details from "../components/garageViews/DetailsView"; // Uncomment when ready
import "../styling/garage.css";

export default function VehiclePage() {
  const [activeSection, setActiveSection] = useState("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <Bento />;
      // case "details":
      //   return <Details />;
      default:
        return <div>Select a section.</div>;
    }
  };

  return (
    <>
      <div className="vehNav">
        <ul>
          <li>
            <button
              className="btn-link"
              onClick={() => setActiveSection("overview")}
            >
              Overview
            </button>
          </li>
          <li>
            <button
              className="btn-link"
              onClick={() => setActiveSection("details")}
            >
              Details
            </button>
          </li>
          <li>
            <button
              className="btn-link"
              onClick={() => setActiveSection("service")}
            >
              Service
            </button>
          </li>
          <li>
            <button
              className="btn-link"
              onClick={() => setActiveSection("notes")}
            >
              Notes
            </button>
          </li>
        </ul>
      </div>
      <div className="glassmorphism-container">{renderSection()}</div>
    </>
  );
}
