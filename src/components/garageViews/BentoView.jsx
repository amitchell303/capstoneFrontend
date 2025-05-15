import { NavLink } from "react-router-dom";
import "../../styling/garage.css";

export default function Bento() {
  return (
    <div className="content-container">
      <div className="vehNav"></div>
      <div className="bento-container">
        <div className="bentoItem"></div>
        <div className="bentoItem"></div>
        <div className="bentoItem"></div>
        <div className="bentoItem"></div>
      </div>
    </div>
  );
}
