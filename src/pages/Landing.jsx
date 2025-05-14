import { useState } from "react";
import Login from "../components/forms/Login";
import Registration from "../components/forms/Registration";
import "../styling/landing.css";

export default function Landing() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <div className="landingPage">
      <div className="text-content">
        <h1>MyMoto</h1>
        {/* Changed navlinks into buttons for modal handling */}
        <p>
          Please{" "}
          <button
            className="link-button"
            onClick={() => setShowLoginModal(true)}
          >
            Sign-in
          </button>{" "}
          or{" "}
          <button
            className="link-button"
            onClick={() => setShowRegisterModal(true)}
          >
            Register
          </button>{" "}
        </p>
      </div>
      <div className="animation">
        <img src="src/components/assets/bmwbkgd.jpg" alt="BMW M3" />
      </div>

      {/* Modals */}
      {showLoginModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("modal-overlay")) {
              setShowLoginModal(false);
            }
          }}
        >
          <Login />
          <button
            className="closeModal-btn"
            onClick={() => setShowLoginModal(false)}
          >
            ×
          </button>
        </div>
      )}

      {showRegisterModal && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("modal-overlay")) {
              setShowRegisterModal(false);
            }
          }}
        >
          <Registration />
          <button
            className="closeModal-btn"
            onClick={() => setShowRegisterModal(false)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
