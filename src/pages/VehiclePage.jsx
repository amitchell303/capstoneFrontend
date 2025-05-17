// This page is the display layout for a selected vehicle.
// The layout includes a navbar for vehicle specific expanded view pages,
// and the container for the various component Displays.
import { useParams } from "react-router-dom";
import { useGetMyCarsQuery } from "../app/carSlice";
import { useState } from "react";
import "../styling/garage.css";
import Maintenance from "./Maintenance";

export default function VehiclePage() {
  const [activeComp, setActiveComp] = useState("overview");
  const { data: cars, isLoading, error } = useGetMyCarsQuery();
  const { vin } = useParams();

  const car = cars?.find((car) => car.vin === vin);
  if (!car) return <p>Vehicle not found.</p>;

  // switch statement utilized to switch between imported component displays upon nav btn click
  // TO-DO: make and import components
  const renderComp = () => {
    switch (activeComp) {
      case "overview":
        return (
          <div className="bento-container">
            <div className="bentoItem">General Info</div>
            <div className="bentoItem">Services</div>
            <div className="bentoItem">Reminders</div>
            <div className="bentoItem">Notes</div>
          </div>
        );
      case "details":
        return <div>WIP - Expanded vehicle details</div>;
      case "service":
        return (
          <div>
            <Maintenance />
          </div>
        );
      case "notes":
        return <div>WIP - Notes</div>;
      default:
        return <div>No components rendered.</div>;
    }
  };

  return (
    <>
      <div className="vehNav">
        <div className="glassmorphism-container">
          <ul>
            <li>
              <button
                className="btn-link"
                onClick={() => setActiveComp("overview")}
              >
                Overview
              </button>
            </li>
            <li>
              <button
                className="btn-link"
                onClick={() => setActiveComp("details")}
              >
                Details
              </button>
            </li>
            <li>
              <button
                className="btn-link"
                onClick={() => setActiveComp("service")}
              >
                Service
              </button>
            </li>
            <li>
              <button
                className="btn-link"
                onClick={() => setActiveComp("notes")}
              >
                Notes
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="glassmorphism-container">{renderComp()}</div>
    </>
  );
}
