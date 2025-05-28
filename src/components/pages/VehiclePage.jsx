// This page is the display layout for a selected vehicle. The layout includes a navbar
// for vehicle specific expanded view pages, and the container for the various component Displays.

import { useParams } from "react-router-dom";
import { useGetMyCarsQuery } from "../../app/carSlice.js";
import { useGetSharedCarsQuery } from "../../app/sharedVehiclesSlice";
import { useAboutMeQuery } from "../../app/userSlice";
import { useState } from "react";
import Overview from "../garageViews/Overview.jsx";
import VehicleDetails from "../garageViews/VehicleDetails.jsx";
import Maintenance from "./Maintenance.jsx";
import AllReminders from "../garageViews/AllReminders.jsx";
import VehicleSettings from "../garageViews/VehicleSettings.jsx";
import "../../styling/garage.css";

export default function VehiclePage() {
  const [activeComp, setActiveComp] = useState("overview");
  const { data: cars } = useGetMyCarsQuery();
  const { vin } = useParams();
  const { data: me } = useAboutMeQuery();
  const userId = me?.user?.id;
  const { data: sharedCars } = useGetSharedCarsQuery({
    userId: userId,
  });
  const car = cars?.find((car) => car.vin === vin);
  const sharedCar = sharedCars?.data.find((car) => car.vin === vin);
  if (!car && !sharedCar) {
    return <p>Vehicle not found.</p>;
  } else if (sharedCar) {
    console.log("Shared Car: ", sharedCar);
    return (
      <div className="vehiclePage">
        <div className="glassmorphism-container">
          <Maintenance />
        </div>
      </div>
    );
  }

  // switch statement utilized to switch between imported component displays upon nav btn click
  // TO-DO: make and import components
  const renderComp = () => {
    switch (activeComp) {
      case "overview":
        return (
          // <div>
          //   <Overview />
          // </div>
          <div className="glassmorphism-container">
            <VehicleDetails car={car} />
          </div>
        );
      case "details":
        return (
          <div className="glassmorphism-container">
            <VehicleDetails car={car} />
          </div>
        );
      case "service":
        return (
          <div className="glassmorphism-container">
            <Maintenance />
          </div>
        );
      case "notes":
        return (
          <div className="glassmorphism-container">
            <AllReminders />
          </div>
        );
      case "settings":
        return (
          <div className="glassmorphism-container">
            <VehicleSettings car={car} />
          </div>
        );
    }
  };

  return (
    <div className="vehiclePage">
      <div className="glassmorphism-container">
        <div className="vehNav">
          <ul>
            <li>
              <button
                className={`btn-link ${
                  activeComp === "overview" ? "active-link" : ""
                }`}
                onClick={() => setActiveComp("overview")}
              >
                Overview
              </button>
            </li>
            {/* <li>
              <button
                className={`btn-link ${
                  activeComp === "details" ? "active-link" : ""
                }`}
                onClick={() => setActiveComp("details")}
              >
                Details
              </button>
            </li> */}
            <li>
              <button
                className={`btn-link ${
                  activeComp === "service" ? "active-link" : ""
                }`}
                onClick={() => setActiveComp("service")}
              >
                Service
              </button>
            </li>
            <li>
              <button
                className={`btn-link ${
                  activeComp === "notes" ? "active-link" : ""
                }`}
                onClick={() => setActiveComp("notes")}
              >
                Notes
              </button>
            </li>
            <li>
              <button
                className={`btn-link ${
                  activeComp === "settings" ? "active-link" : ""
                }`}
                onClick={() => setActiveComp("settings")}
              >
                Settings
              </button>
            </li>
          </ul>
          <h1>{car.carName || `${car.make} ${car.model}`}</h1>
        </div>
      </div>

      <div>{renderComp()}</div>
    </div>
  );
}
