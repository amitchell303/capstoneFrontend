import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import store from "./app/store";
import "./App.css";

import Home from "./pages/Home.jsx";
import SingleUser from "./components/SingleUser.jsx";
import AboutMe from "./components/AboutMe.jsx";
import Navigations from "./components/Navigations.jsx";
import Landing from "./pages/Landing.jsx";
import EmptyGarage from "./components/garageViews/EmptyGarage.jsx";
import AllVehicles from "./components/garageViews/AllVehicles.jsx";
import AddVehicle from "./components/forms/AddVehicle.jsx";

function App() {
  function logout() {
    localStorage.removeItem("token");
  }
  return (
    <Provider store={store}>
      <Router>
        <Navigations />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user/:id" element={<SingleUser />} />
          <Route path="/me" element={<AboutMe />} />

          <Route path="/empty" element={<EmptyGarage />} />
          <Route path="/addVehicle" element={<AddVehicle />} />
          <Route path="/allVehicles" element={<AllVehicles />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
