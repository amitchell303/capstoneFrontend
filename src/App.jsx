import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./app/store";
import "./App.css";

import Navigations from "./components/Navigations.jsx";
import Landing from "./components/pages/Landing.jsx";
import Home from "./components/pages/Home.jsx";
import AboutMe from "./components/pages/AboutMe.jsx";
import Faq from "./components/pages/Faq.jsx";
import Build from "./components/pages/Build.jsx";

import VehiclePage from "./components/pages/VehiclePage.jsx";
import EditVehicleForm from "./components/forms/EditVehicle.jsx";
import AddVehicle from "./components/forms/AddVehicle.jsx";
import AddReminders from "./components/forms/AddNote.jsx";
import DeleteVehicle from "./components/forms/DeleteVehicle.jsx";
import EmptyGarage from "./components/garageViews/EmptyGarage.jsx";
import AllReminders from "./components/garageViews//AllReminders.jsx";
import UpdateMileage from "./components/forms/updateMileage.jsx";

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
          <Route path="/me" element={<AboutMe />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/build" element={<Build />} />

          {/* Temporary routes for development */}
          <Route path="/empty" element={<EmptyGarage />} />
          <Route path="/addVehicle" element={<AddVehicle />} />
          <Route path="/updateMileage" element={<UpdateMileage />} />
          <Route path="/editVehicle" element={<EditVehicleForm />} />
          <Route path="/deleteVehicle" element={<DeleteVehicle />} />
          <Route path="/vehicles/:vin" element={<VehiclePage />} />
          {/* <Route path="/vehicles/:vin" element={<VehicleDetails />} /> */}
          <Route path="/notes" element={<AddReminders />} />
          <Route path="/allnotes" element={<AllReminders />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
