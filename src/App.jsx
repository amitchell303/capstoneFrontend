import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import store from "./app/store";
import "./App.css";

import Registration from "./components/Registration.jsx";
import Home from "./components/Home.jsx";
import SingleUser from "./components/SingleUser.jsx";
import LogIn from "./components/Login.jsx";
import Navigations from "./components/Navigations.jsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navigations />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:userId" element={<SingleUser />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
