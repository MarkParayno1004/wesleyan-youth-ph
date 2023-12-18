import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter

//! Pages
import Login from "./login";
import Dashboard from "./admin/admin-dashboard";
import Attendees from "./admin/admin-attendees";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/admin-attendees" element={<Attendees />} />
      </Routes>
    </Router>
  );
}

export default App;
