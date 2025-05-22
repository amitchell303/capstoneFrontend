import { useState } from "react";
import settingsIcon from "../assets/gear-svgrepo-com.svg";
import EditVehicleForm from "../forms/EditVehicle";
import DeleteVehicle from "../forms/DeleteVehicle";

export default function VehicleSettings() {
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
        return <div></div>;
      case "edit":
        return (
          <div>
            <EditVehicleForm />
          </div>
        );
      case "remove":
        return (
          <div>
            <DeleteVehicle />
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
          <div className="settings-sect-2">
            <div>{renderComp()}</div>
          </div>
        </section>
      </div>
    </div>
  );
}
