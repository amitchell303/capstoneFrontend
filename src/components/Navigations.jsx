import React from "react";
import { NavLink } from "react-router-dom";
import "../app.css";

export default function Navigations() {
  return (
    <nav className="navbar">
      <NavLink to="/">
        <h1>MyMoto</h1>
      </NavLink>
      <div>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/user/:userId">My Account</NavLink>
      </div>
    </nav>
  );
}
