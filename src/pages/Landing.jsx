import { NavLink } from "react-router-dom";
import "../styling/landing.css";

export default function Landing() {
  return (
    <div className="landingPage">
      <div className="text-content">
        <h1>MyMoto</h1>
        <p>
          Please <NavLink to="/login">Sign-in</NavLink> or{" "}
          <NavLink to="/register">Register</NavLink>.
        </p>
      </div>
      <div className="animation">
        <img src="src/components/assets/bmwbkgd.jpg" alt="BMW M3" />
      </div>
    </div>
  );
}
