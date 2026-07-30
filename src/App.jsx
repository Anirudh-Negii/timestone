import React from "react";
import {Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
  );
};

export default App;
