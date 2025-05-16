import { useState } from "react";
import api from "../app/api";
import { deleteToken, getToken } from "../app/tokenService";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

/* Styling imports */
import "../App.css";
import { FaRegUser } from "react-icons/fa6";
import { BiSolidCarGarage } from "react-icons/bi";
import { LuPanelRightOpen, LuPanelLeftOpen } from "react-icons/lu";

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
    navigate("/login");
  }

  return (
    <nav className={`sidebar ${isOpen ? "open" : ""}`}>
      <NavLink className="logo" to="/home">
        <img src="src\components\assets\MM logo(2).png" alt="Logo/Home" />
      </NavLink>
      <div className="navlink-container">
        <ul>
          {token ? (
            <>
              <ul>
                <li>
                  <div className="tooltip">
                    <NavLink className="navlink" to="/me">
                      <FaRegUser className="icons" />
                      <p className="link">My Account</p>
                    </NavLink>
                    <span className="tooltiptext">Account</span>
                  </div>
                </li>
                <li>
                  <div className="tooltip">
                    <NavLink className="navlink" to="/home">
                      <BiSolidCarGarage className="icons" />
                      <p className="link">My Garage</p>
                    </NavLink>
                    <span className="tooltiptext">Garage</span>
                  </div>
                </li>
                {/* Temporary links for dev purposes */}
                <li>
                  <NavLink className="navlink" to="/addVehicle">
                    <p className="link">Comp-addVehicle</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="navlink" to="/editVehicle">
                    <p className="link">Comp-editVehicle</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="navlink" to="/vehicleDetails">
                    <p className="link">Comp-vehDetails</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink className="navlink" to="/quickViews">
                    <p className="link">Comp-quickViews</p>
                  </NavLink>
                </li>
              </ul>
              <button className="logout-btn" onClick={logout}>
                LogOut
              </button>
            </>
          ) : (
            <>
              <li>
                <NavLink className="navlink" to="/register">
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink className="navlink" to="/login">
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <button className="toggle-btn" onClick={toggleNavbar}>
        {isOpen ? (
          <LuPanelRightOpen className="toggle-icon" />
        ) : (
          <LuPanelLeftOpen className="toggle-icon" />
        )}
      </button>
    </nav>
  );
}
