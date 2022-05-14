import React from "react";
// react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// pages
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Error from "./pages/Error";

// navbar
import Navbar from "./Navbar";
const ReactRouterSetup = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default ReactRouterSetup;
