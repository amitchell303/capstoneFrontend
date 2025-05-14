// If no cars have yet been added to a User's garage, this component
// will import a container displaying an image, a prompt to add a vehcile,
// and the link to do so below.

// import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../App.css";

export default function EmptyGarage() {
  // const [isEmpty, setIsEmpty] = useState("");

  return (
    <div className="emptyGarage-container">
      <img src="src/components/assets/carSticker.gif" alt="car sticker" />
      <h1>Your Garage is empty.</h1>
      <NavLink to="/addVehicle">Add a Vehicle</NavLink>
    </div>
  );
}
