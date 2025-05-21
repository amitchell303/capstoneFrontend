import { useState } from "react";
import EditVehicleForm from "../forms/EditVehicle";
import DeleteVehicle from "../forms/DeleteVehicle";

export default function VehicleSettings() {
  const [showEVFModal, setShowEVFModal] = useState(false);
  const [showDVFModal, setShowDVFModal] = useState(false);

  return (
    <div className="vehSettings">
      <section className="settings-sect-1">
        <button className="link-button">Share Vehicle</button>
        <button className="link-button" onClick={() => setShowEVFModal(true)}>
          Edit Vehicle
        </button>
        <button className="link-button" onClick={() => setShowDVFModal(true)}>
          Delete Vehicle
        </button>
      </section>

      {showEVFModal && (
        <div
          className="garage-modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("garage-modal-overlay")) {
              setShowEVFModal(false);
            }
          }}
        >
          <EditVehicleForm />
          <button
            className="garage-closeModal-btn"
            onClick={() => setShowEVFModal(false)}
          >
            ×
          </button>
        </div>
      )}

      {showDVFModal && (
        <div
          className="garage-modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("garage-modal-overlay")) {
              setShowDVFModal(false);
            }
          }}
        >
          <DeleteVehicle />
          <button
            className="garage-closeModal-btn"
            onClick={() => setShowDVFModal(false)}
          >
            ×
          </button>
        </div>
      )}
      <section className="settings-sect-2">Img here</section>
    </div>
  );
}
