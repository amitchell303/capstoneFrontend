import { useState } from "react";
import EditVehicleForm from "../forms/EditVehicle";
import DeleteVehicle from "../forms/DeleteVehicle";

export default function VehicleSettings() {
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
              onClick={() => setShowEVFModal(true)}
            >
              Edit Vehicle
            </button>
            <button className="settings-links">Share Vehicle</button>
            <button
              className="settings-links"
              onClick={() => setShowDVFModal(true)}
            >
              Remove Vehicle
            </button>
          </div>
          <div className="floating-divider"></div>
          <div className="settings-sect-2">
            <EditVehicleForm />
            {/* <DeleteVehicle /> */}
          </div>
        </section>
      </div>
    </div>
  );
}
