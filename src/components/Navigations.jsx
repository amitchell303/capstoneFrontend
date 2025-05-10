import React from "react";
import api from "../app/api";
import { deleteToken, getToken } from "../app/tokenService";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

/* Styling imports */
import "../App.css";
import { FaRegUser } from "react-icons/fa6";
import { BiSolidCarGarage } from "react-icons/bi";

export default function Navigations() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getToken();

  function logout() {
    deleteToken();
    dispatch(api.util.resetApiState());
    navigate("/login");
  }
  
  return (
    <nav className="sidebar">
      <NavLink className="nav-title" to="/">
        <h1>MyMoto</h1>
      </NavLink>
      <div className="navlink-container">
        <ul>
          {token ? (
            <>
              <li>
                <NavLink className="navlink" to="/me">
                  <FaRegUser className="icons" />
                  <p className="link">My Account</p>
                </NavLink>
              </li>
              <li>
                <NavLink className="navlink" to="/">
                  <BiSolidCarGarage className="icons" />
                  <p className="link">Dashboard</p>
                </NavLink>
              </li>
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
          <button onClick={logout}>LogOut</button>
        </ul>
      </div>
    </nav>
  );
}
