import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import Brand from "./pages/Brand.jsx";
import Login from "./components/Login.jsx";

const App = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden antialiased bg-white text-slate-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brands/:brandName" element={<Brand />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
