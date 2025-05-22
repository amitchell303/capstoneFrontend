import { useState } from "react";
import "../../styling/shareCar.css";
import settingsIcon from "../assets/gear-svgrepo-com.svg";
import EditVehicleForm from "../forms/EditVehicle";
import DeleteVehicle from "../forms/DeleteVehicle";
import AddCarOwner from "../forms/AddCarOwner";

export default function VehicleSettings({ car }) {
  const [activeComp, setActiveComp] = useState("settings");

  const renderComp = () => {
    switch (activeComp) {
      case "settings":
        return (
          <div>
            <img
              className="settings-icon"
              src={settingsIcon}
              alt="Settings Icon"
            />
          </div>
        );
      case "share":
        return <AddCarOwner />;
      case "edit":
        return (
          <div>
            <EditVehicleForm car={car} />
          </div>
        );
      case "remove":
        return (
          <div>
            <DeleteVehicle car={car} />
          </div>
        );
    }
  };

  return (
    <div className="content-container">
      <div className="vehSettings">
        <section className="settings-header">
          <h1>Settings</h1>
        </section>
        <section className="settings-body">
          <div className="settings-sect-1">
            <button
              className="settings-links"
              onClick={() => setActiveComp("share")}
            >
              Share Vehicle
            </button>
            <button
              className="settings-links"
              onClick={() => setActiveComp("edit")}
            >
              Edit Vehicle
            </button>

            <button
              className="settings-links"
              onClick={() => setActiveComp("remove")}
            >
              Remove Vehicle
            </button>
          </div>
          <div className="floating-divider"></div>
          <div className="settings-sect-2">{renderComp()}</div>
        </section>
      </div>
    </div>
  );
}
