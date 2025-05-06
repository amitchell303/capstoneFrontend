import React from "react";
import { NavLink } from "react-router-dom";
import "../index.css";

export default function Navigations() {
  return (
    <nav>
      <NavLink to="/">
        <h1>MyMoto</h1>
      </NavLink>
      <div className="nav-links-container">
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/user/:userId">My Account</NavLink>
      </div>
    </nav>
  );
}
