import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter

//! Pages
import Login from "./login";
import MainPage from "./admin/admin-mainpage";
import MainPageCoor from "./coordinator/coordinator-mainpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Admin-MainPage" element={<MainPage />} />
        <Route path="/Coordinator-MainPage" element={<MainPageCoor />} />
      </Routes>
    </Router>
  );
}

export default App;
