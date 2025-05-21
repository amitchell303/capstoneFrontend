import { useState } from "react";
import api from "../app/api";
import { deleteToken, getToken } from "../app/tokenService";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

/* Styling imports */
import "../styling/nav.css";
import { FaRegUser } from "react-icons/fa6";
import { BiSolidCarGarage } from "react-icons/bi";

export default function Navigations() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getToken();

  function toggleNavbar() {
    setIsOpen(!isOpen);
  }
  function logout() {
    deleteToken();
    dispatch(api.util.resetApiState());
    navigate("/");
  }

  return (
    <nav className="navbar">
      <NavLink className="logo" to="/home">
        <img src="../../assets/MM logo(2).png" alt="Logo/Home" />
      </NavLink>
      <div className="navlink-container">
        <ul>
          <li>
            {/* <div className="tooltip"> */}
            <NavLink className="navlink" to="/me">
              <FaRegUser className="icons" />
              <p className="link">My Account</p>
            </NavLink>
            {/* <span className="tooltiptext">Account</span> */}
            {/* </div> */}
          </li>
          <li>
            {/* <div className="tooltip"> */}
            <NavLink className="navlink" to="/home">
              <BiSolidCarGarage className="icons" />
              <p className="link">My Garage</p>
            </NavLink>
            {/* <span className="tooltiptext">Garage</span> */}
            {/* </div> */}
          </li>

          {/* Temporary links for dev purposes */}
          <li>
            <NavLink className="navlink" to="/addVehicle">
              <p className="link">addVehicle</p>
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to="/editVehicle">
              <p className="link">editVehicle</p>
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to="/allnotes">
              <p className="link">createNote</p>
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to="/deleteVehicle">
              <p className="link">deleteVehicle</p>
            </NavLink>
          </li>
        </ul>
      </div>
      <button className="logout-btn" onClick={logout}>
        LogOut
      </button>
    </nav>
  );
}
