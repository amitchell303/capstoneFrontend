import api from "../app/api";
import { deleteToken, getToken } from "../app/tokenService";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

/* Styling imports */
import "../styling/nav.css";
import { FaRegUser } from "react-icons/fa6";
import { BiSolidCarGarage } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { FaQuestion } from "react-icons/fa6";
import { TbHeartCode } from "react-icons/tb";
import { TbDatabaseHeart } from "react-icons/tb";
import { GoCodescan } from "react-icons/go";

export default function Navigations() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getToken();

  function logout() {
    deleteToken();
    dispatch(api.util.resetApiState());
    navigate("/");
  }

  return (
    <nav className="navbar">
      {/* <div className="glassmorphism-container"> */}
      <div className="nav-sect-1">
        <NavLink to="/home">
          <img src="src\components\assets\MM logo(2).png" alt="Logo/Home" />
        </NavLink>
      </div>
      <div className="nav-sect-2">
        <div className="nav-group">
          <NavLink to="/me">
            <FaRegUser className="icons" />
            <p>Account</p>
          </NavLink>
        </div>
        <div className="nav-group">
          <NavLink to="/home">
            <BiSolidCarGarage className="icons" />
            <p>Garage</p>
          </NavLink>
        </div>
        <div className="nav-group">
          <NavLink to="/faq">
            <FaQuestion className="icons" />
            <p>FAQ</p>
          </NavLink>
        </div>
        <div className="nav-group">
          <NavLink to="/build">
            {/* <TbHeartCode className="icons"/> */}
            <TbDatabaseHeart className="icons" />
            {/* <GoCodescan className="icons" /> */}
            <p>Build</p>
          </NavLink>
        </div>

        {/* Temporary links for dev purposes */}
        {/* <NavLink to="/addVehicle">
          <p>addVehicle</p>
        </NavLink>
        <NavLink to="/editVehicle">
          <p>editVehicle</p>
        </NavLink>
        <NavLink to="/allnotes">
          <p>createNote</p>
        </NavLink>
        <NavLink to="/deleteVehicle">
          <p>deleteVehicle</p>
        </NavLink> */}
      </div>
      <div>
        <button className="logout-btn" onClick={logout}>
          <MdLogout />
        </button>
      </div>
      {/* </div> */}
    </nav>
  );
}
