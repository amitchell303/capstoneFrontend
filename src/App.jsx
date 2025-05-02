import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";

import Registration from "./Registration.jsx";
import Home from "./Home.jsx";
import SingleUser from "./SingleUser.jsx";
import Login from "./Login.jsx";
import LogIn from "./Login.jsx";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">LogIn</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
