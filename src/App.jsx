import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter

//! Pages
import Login from "./login";
import MainPage from "./admin/admin-mainpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Admin-MainPage" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
