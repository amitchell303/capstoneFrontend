import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import store from "./app/store";
import "./App.css";

import Registration from "./components/forms/Registration.jsx";
import Home from "./pages/Home.jsx";
import SingleUser from "./components/SingleUser.jsx";
import LogIn from "./components/forms/Login.jsx";
import AboutMe from "./components/AboutMe.jsx";
import Navigations from "./components/Navigations.jsx";
import EmptyGarage from "./components/EmptyGarage.jsx";
import AddVehicle from "./components/forms/AddVehicle.jsx";
import AllVehicles from "./components/allVehicles.jsx";
import Landing from "./pages/Landing.jsx";

function App() {
  function logout() {
    localStorage.removeItem("token");
  }
  return (
    <Provider store={store}>
      <Router>
        <Navigations />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<SingleUser />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/me" element={<AboutMe />} />

          <Route path="/empty" element={<EmptyGarage />} />
          <Route path="/addVehicle" element={<AddVehicle />} />
          <Route path="/allVehicles" element={<AllVehicles />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
