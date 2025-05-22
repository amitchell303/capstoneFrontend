import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./app/store";
import "./App.css";

import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import VehiclePage from "./pages/VehiclePage.jsx";
import Navigations from "./components/Navigations.jsx";
import AboutMe from "./components/AboutMe.jsx";
import EmptyGarage from "./components/garageViews/EmptyGarage.jsx";
import EditVehicleForm from "./components/forms/EditVehicle.jsx";
import AddVehicle from "./components/forms/AddVehicle.jsx";
import AddReminders from "./components/forms/AddNote.jsx";
import AllReminders from "./components/forms/AllReminders.jsx";
import DeleteVehicle from "./components/forms/DeleteVehicle.jsx";
import Faq from "./pages/Faq.jsx";
import Build from "./pages/Build.jsx";

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
          <Route path="/editVehicle" element={<EditVehicleForm />} />
          <Route path="/deleteVehicle" element={<DeleteVehicle />} />
          <Route path="/vehicles/:vin" element={<VehiclePage />} />
          {/* <Route path="/vehicles/:vin" element={<VehicleDetails />} /> */}
          <Route path="/notes" element={<AddReminders />} />
          <Route path="/allNotes" element={<AllReminders />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
