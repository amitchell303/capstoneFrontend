import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./app/store";
import "./App.css";

import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import AllVehicles from "./pages/Garage.jsx";
import VehiclePage from "./pages/VehiclePage.jsx";
import Navigations from "./components/Navigations.jsx";
import AboutMe from "./components/AboutMe.jsx";
import SingleUser from "./components/SingleUser.jsx";
import EmptyGarage from "./components/garageViews/EmptyGarage.jsx";
import AddVehicle from "./components/forms/AddVehicle.jsx";
import QuickViews from "./components/garageViews/quickViews.jsx";

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

          {/* Temporary routes for development */}
          <Route path="/empty" element={<EmptyGarage />} />
          <Route path="/addVehicle" element={<AddVehicle />} />
          <Route path="/allVehicles" element={<AllVehicles />} />
          <Route path="/quickViews" element={<QuickViews />} />
          <Route path="/vehiclePage" element={<VehiclePage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
