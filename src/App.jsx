import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";

const App = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden antialiased bg-white text-slate-900">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};
  
export default App;
