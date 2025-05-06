import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css"

export default function Navigations() {
  return (
    <nav className="navbar">
      <NavLink className="nav-title" to="/">
        <h1>Car App Name</h1>
      </NavLink>
      <div className="nav-links">
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/user/:userId">My Account</NavLink>
      </div>
    </nav>
  );
}
