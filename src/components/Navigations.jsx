import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../App.css";
import { deleteToken, getToken } from "../app/tokenService";
import api from "../app/api";

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
    <nav className="navbar">
      <NavLink className="nav-title" to="/">
        <h1>Car App Name</h1>
      </NavLink>
      <div className="nav-links">
        {token ? (
          <NavLink to="/me">My Account</NavLink>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
        {/* {token ? <NavLink to="/me">My Account</NavLink> : navigate("/login")} */}
        <button onClick={logout} id="logoutBtn">
          LogOut
        </button>
      </div>
    </nav>
  );
}
